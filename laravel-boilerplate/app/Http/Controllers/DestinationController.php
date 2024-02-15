<?php

namespace App\Http\Controllers;
use App\Http\Requests\AddDestinationRequest;
use Illuminate\Http\Request;
use App\Models\Destination;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DestinationController extends Controller
{
    public function getAllDestinations(Request $request)
    {
        $query = Destination::with('campings.accommodations');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $destinations = $query->paginate(10); // Adjust the pagination limit as needed

        return response()->json($destinations);
    }

    public function paginate(Request $request)
    {

        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = Destination::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('destinationId')) {
            $userIdFilter = $request->input('destinationId');
            $query->where('id', $userIdFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'userRole' relationship
        //   $query->with('images');

        $query->with(['images' => function($que) {
            $que->where('is_profile_image', false);
        }]);

        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $destinations = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name

        return response()->json(['data' => $destinations]);
    }




    public function addDestination(AddDestinationRequest $request)
    {
        $destinationData = $request->except(['images', 'profile_image']); // Exclude images from destination data

        // Start a database transaction
        DB::beginTransaction();

        try {

            $destination = Destination::create($destinationData);
            $id = $destination->id;
            $profileImageUrl = null;

            // Handle and store profile image in the public/profile-images directory
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image'); // Change 'images' to 'profile_image'
                $customName = 'destination-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                // After wrting this code you need to link this storage to public by creating symbolic link -
                // php artisan storage:link
                // http://somedomain.com/<<storage/image.jpg -> ENTIRE STORAGE PATH>>
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);

                // Update the profile image URL for the destination
                $destination->profile_image_url = $profileImageUrl;
                $destination->save();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $customName = 'destination-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('public/images', $customName);
                    $url = Storage::url($path);

                    // Create image records for destination
                    $destination->images()->create  ([
                        'url' => $url,
                    ]);
                }
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Destination created successfully', 'data' => $destination], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating destination images.', 'error' => $e->getMessage()], 500);
        }
    }


    public function editDestination(Request $request, $id)
    {
        $destination = Destination::findOrFail($id);
        $name = $request->input('name');
        $description = $request->input('description');
        $imageArray = $request->file('images');
        $imageIdsToUpdate = $request->input('image_ids_to_update');
        $imageIdsToUpdateArray = json_decode($imageIdsToUpdate, true);
        $dirtyArray = array_filter($imageIdsToUpdateArray, function ($val) {
            return trim($val) === 'dirty';
        });


        // Start a database transaction
        DB::beginTransaction();

        try {
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image'); // Change 'images' to 'profile_image'
                $customName = 'destination-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);
                $destination->profile_image_url = $profileImageUrl;
            }

            if (in_array('dirty', $imageIdsToUpdateArray)
                && count($imageArray) !== count($dirtyArray)) {
                DB::rollBack();
                return response()->json(['message' => 'Invalid input. The number of edited images and identifiers must match.'], 500);
            }

            // Update destination information
            $destination->update([
                'name' => $name,
                'description' => $description
            ]);


            $imageIndex = 0;
            if (in_array('dirty', $imageIdsToUpdateArray) && $request->hasFile('images')) {
                foreach ($imageIdsToUpdateArray as $index => $updateLocation) {
                    if (trim($updateLocation) == 'dirty') {
                        $image = $request->file('images')[$imageIndex];
                        $customName = 'destination-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs('public/images', $customName);
                        $url = Storage::url($path);
                        // Check if an image with the same URL already exists
                        $existingImage = $destination->images()->where('url', $url)->first();
                        $imageIndex++;

                        if ($existingImage) {
                            // If the image with the same URL exists, update its properties
                            $existingImage->update([
                                'url' => $url,
                                // Add other fields that you want to update
                            ]);
                        } else {
                            // If the image doesn't exist, create a new record
                            $destination->images()->create([
                                'url' => $url,
                                // Add other fields that you want to create
                            ]);
                        }
                    }
                }
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Destination images updated successfully', 'data' => $destination]);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating destination images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteDestination($id)
    {
        try {
            // Find the destination
            $destination = Destination::findOrFail($id);

            // Delete related campings
            $destination->campings()->delete();

            // Delete images associated with the destination
            $destination->images()->delete();

            // Now, delete the destination record
            $destination->delete();

            return response()->json(['message' => 'Destination deleted successfully']);
        } catch (\Exception $e) {
            // Handle exceptions, log errors, or return an error response
            return response()->json(['error' => 'Error deleting destination'], 500);
        }
    }


    // Get all users
    public function index(Request $request) {
        $query = Destination::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('destinationId')) {
            $idFilter = $request->input('destinationId');
            $query->where('id', $idFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'images' and 'campings' relationships
        $query->with(['images', 'campings', 'campings.accommodations', 'campings.accommodations.amenities']);

        $destinations = $query->get();
        return response()->json(['data' => $destinations]);
    }
}
