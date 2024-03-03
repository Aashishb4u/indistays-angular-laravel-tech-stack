<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCampingRequest;
use App\Models\Destination;
use Illuminate\Http\Request;
use App\Models\Camping;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CampingController extends Controller
{
    public function paginate(Request $request)
    {

        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = Camping::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('campingId')) {
            $userIdFilter = $request->input('campingId');
            $query->where('id', $userIdFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }


        $query->with([
            'images' => function ($que) {
                $que->where('is_profile_image', false);
            },
            'destination'
        ]);

        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $campings = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name

        return response()->json(['data' => $campings]);
    }

    public function addCamping(AddCampingRequest $request)
    {

        $queryData = $request->except(['images', 'profile_image']); // Exclude images from destination data

        // Start a database transaction
        DB::beginTransaction();

        try {

            $camping = Camping::create($queryData);
            $id = $camping->id;
            $profileImageUrl = null;

            // Handle and store profile image in the public/profile-images directory
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image'); // Change 'images' to 'profile_image'
                $customName = 'camping-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                // After wrting this code you need to link this storage to public by creating symbolic link -
                // php artisan storage:link
                // http://somedomain.com/<<storage/image.jpg -> ENTIRE STORAGE PATH>>
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);

                // Update the profile image URL for the camping
                $camping->profile_image_url = $profileImageUrl;
                $camping->save();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $customName = 'camping-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('public/images', $customName);
                    $url = Storage::url($path);

                    // Create image records for camping
                    $camping->images()->create  ([
                        'url' => $url,
                    ]);
                }
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Camping created successfully', 'data' => $camping], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating camping images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function editCamping(Request $request, $id)
    {
        $camping = Camping::findOrFail($id);
        $name = $request->input('name');
        $description = $request->input('description');
        $imageArray = $request->file('images');
        $mapLink = $request->input('location_map_link');
        $address = $request->input('address');
        $destinationId = $request->input('destination_id');
        $imageIdsToUpdate = $request->input('image_ids_to_update');
        $profileImage = $request->input('profile_image_url');
        $imageIdsToUpdateArray = json_decode($imageIdsToUpdate, true);
        $dirtyArray = array_filter($imageIdsToUpdateArray, function ($val) {
            return trim($val) === 'dirty';
        });


        // Start a database transaction
        DB::beginTransaction();

        try {
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image'); // Change 'images' to 'profile_image'
                $customName = 'camping-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);
                $camping->profile_image_url = $profileImageUrl;
            }

            if (in_array('dirty', $imageIdsToUpdateArray)
                && count($imageArray) !== count($dirtyArray)) {
                DB::rollBack();
                return response()->json(['message' => 'Invalid input. The number of edited images and identifiers must match.'], 500);
            }


            // Update destination information
            $camping->update([
                'name' => $name,
                'description' => $description,
                'location_map_link' => $mapLink,
                'address' => $address,
                'destination_id' => (int)$destinationId,
                'profile_image_url' => $profileImage
            ]);


            $imageIndex = 0;
            if (in_array('dirty', $imageIdsToUpdateArray) && $request->hasFile('images')) {
                foreach ($imageIdsToUpdateArray as $index => $updateLocation) {
                    if (trim($updateLocation) == 'dirty') {
                        $image = $request->file('images')[$imageIndex];
                        $customName = 'camping-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs('public/images', $customName);
                        $url = Storage::url($path);
                        // Check if an image with the same URL already exists
                        $existingImage = $camping->images()->where('url', $url)->first();
                        $imageIndex++;

                        if ($existingImage) {
                            // If the image with the same URL exists, update its properties
                            $existingImage->update([
                                'url' => $url,
                                // Add other fields that you want to update
                            ]);
                        } else {
                            // If the image doesn't exist, create a new record
                            $camping->images()->create([
                                'url' => $url,
                                // Add other fields that you want to create
                            ]);
                        }
                    }
                }
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Destination images updated successfully', 'data' => $camping]);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating destination images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteCamping($id)
    {
        try {
            // Find the camping
            $camping = Camping::findOrFail($id);

            // Delete related accommodations
            $camping->accommodations()->delete();

            // Delete Custom Pricing and Booking
            $camping->accommodations()->customPricing()->delete();
            $camping->accommodations()->customBooking()->delete();

            // Delete customer reviews associated with the camping
            $camping->customerReviews()->delete();

            // Delete images associated with the camping
            $camping->images()->delete();

            // Now, delete the camping record
            $camping->delete();

            return response()->json(['message' => 'Camping deleted successfully']);
        } catch (\Exception $e) {
            // Handle exceptions, log errors, or return an error response
            return response()->json(['error' => 'Error deleting camping'], 500);
        }
    }


    public function index(Request $request)
    {

        $query = Camping::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('campingId')) {
            $idFilter = $request->input('campingId');
            $query->where('id', $idFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'userRole' relationship
        $query->with(['images', 'customerReviews', 'destination', 'accommodations', 'accommodations.customPricing', 'accommodations.amenities']);
        $campings = $query->get();

        // Manipulate the result to include or exclude customPricing based on the current date
        $campings->transform(function ($camping) {
            $camping->accommodations->transform(function ($accommodation) {
                $accommodation->filter_custom_pricing = $accommodation->customPricing
                    ->filter(function ($customPricing) {
                        $currentDate = now()->toDateString();
                        return now()->between($customPricing->start_date, $customPricing->end_date) ||
                            ($customPricing->start_date <= $currentDate && $currentDate <= $customPricing->end_date) ||
                            (is_null($customPricing->start_date) && $currentDate <= $customPricing->end_date) ||
                            ($customPricing->start_date <= $currentDate && is_null($customPricing->end_date));
                    })
                    ->sortByDesc('created_at') // Sort in descending order based on created_at
                    ->values()->toArray();

                return $accommodation;
            });

            return $camping;
        });

        return response()->json(['data' => $campings]);
    }

}
