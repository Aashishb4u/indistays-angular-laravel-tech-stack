<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddAccommodationRequest;
use App\Models\Accommodation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AccommodationController extends Controller
{
    public function paginate(Request $request)
    {

        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = Accommodation::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('accommodationId')) {
            $idFilter = $request->input('accommodationId');
            $query->where('id', $idFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'userRole' relationship
        //   $query->with('images');

        // Eager load the required relationships
        $query->with([
            'images' => function ($que) {
                $que->where('is_profile_image', false);
            },
            'camping' => function ($que) {
                $que->with('destination'); // Eager load the 'destination' relationship of 'camping'
            },
            'amenities' // Eager load the amenities relationship
        ]);

        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $destinations = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name

        return response()->json(['data' => $destinations]);
    }

    public function addAccommodation(AddAccommodationRequest $request)
    {

        $queryData = $request->except(['images', 'profile_image', 'amenity_ids', 'profile_image_url']); // Exclude images from destination data

        // Start a database transaction
        DB::beginTransaction();

        try {

            $accommodation = Accommodation::create($queryData);
            $id = $accommodation->id;
            $profileImageUrl = null;

            $amenityIds = $request->input('amenity_ids', []);

            // Check if amenityIds is a string and convert it to an array
            if (is_string($amenityIds)) {
                $amenityIds = explode(',', $amenityIds);
            }

            // Attach amenities to the accommodation one by one
            foreach ($amenityIds as $amenityId) {
                $accommodation->amenities()->attach((int)$amenityId);
            }

            // Handle and store profile image in the public/profile-images directory
            if ($request->hasFile('profile_image')) {
                $profileImage = $request->file('profile_image'); // Change 'images' to 'profile_image'
                $customName = 'accommodation-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);
                $accommodation->profile_image_url = $profileImageUrl;
                $accommodation->save();
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $customName = 'accommodation-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                    $path = $image->storeAs('public/images', $customName);
                    $url = Storage::url($path);
                    $accommodation->images()->create  ([
                        'url' => $url,
                    ]);
                }
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Accommodation created successfully', 'data' => $accommodation], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function editAccommodation(Request $request, $id)
    {
        $accommodation = Accommodation::findOrFail($id);
        $name = $request->input('name');
        $discountPrice = $request->input('discount_price');
        $price = $request->input('price');
        $weekendPrice = $request->input('weekend_price');
        $weekendDiscountPrice = $request->input('weekend_discount_price');
        $beds_available = $request->input('beds_available');
        $imageArray = $request->file('images');
        $campingId = $request->input('camping_id');
        $imageIdsToUpdate = $request->input('image_ids_to_update');
        $profileImage = $request->file('profile_image');
        $imageIdsToUpdateArray = json_decode($imageIdsToUpdate, true);
        $dirtyArray = array_filter($imageIdsToUpdateArray, function ($val) {
            return trim($val) === 'dirty';
        });

        $amenityIds = $request->input('amenity_ids', []);

        // Check if amenityIds is a string and convert it to an array
        if (is_string($amenityIds)) {
            $amenityIds = explode(',', $amenityIds);
        }

        // Start a database transaction
        DB::beginTransaction();

        try {
            if ($profileImage) {
                $customName = 'accommodation-profile-' . $id . '.' . $profileImage->getClientOriginalExtension();
                $path = $profileImage->storeAs('public/profile-images', $customName);
                $profileImageUrl = Storage::url($path);
                $accommodation->profile_image_url = $profileImageUrl;
            }

            if (in_array('dirty', $imageIdsToUpdateArray)
                && count($imageArray) !== count($dirtyArray)) {
                DB::rollBack();
                return response()->json(['message' => 'Invalid input. The number of edited images and identifiers must match.'], 500);
            }

            // Update destination information including the 'camping_id'
            $accommodation->update([
                'name' => $name,
                'price' => $price,
                'weekend_price' => $weekendPrice,
                'discount_price' => $discountPrice,
                'weekend_discount_price' => $weekendDiscountPrice,
                'beds_available' => $beds_available,
                'camping_id' => (int)$campingId,
            ]);

            $imageIndex = 0;

            if (in_array('dirty', $imageIdsToUpdateArray) && $imageArray) {
                foreach ($imageIdsToUpdateArray as $index => $updateLocation) {
                    if (trim($updateLocation) == 'dirty') {
                        $image = $imageArray[$imageIndex];
                        $customName = 'accommodation-' . $id . '-' . $index . '.' . $image->getClientOriginalExtension();
                        $path = $image->storeAs('public/images', $customName);
                        $url = Storage::url($path);
                        // Check if an image with the same URL already exists
                        $existingImage = $accommodation->images()->where('url', $url)->first();
                        $imageIndex++;

                        if ($existingImage) {
                            // If the image with the same URL exists, update its properties
                            $existingImage->update([
                                'url' => $url,
                                // Add other fields that you want to update
                            ]);
                        } else {
                            // If the image doesn't exist, create a new record
                            $accommodation->images()->create([
                                'url' => $url,
                                // Add other fields that you want to create
                            ]);
                        }
                    }
                }
            }

            // Synchronize the amenities associated with the accommodation
            $accommodation->amenities()->sync($amenityIds);

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Accommodation information updated successfully', 'data' => $accommodation]);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating Accommodation information.', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteAccommodation($id)
    {
        $accommodation = Accommodation::findOrFail($id);
        $accommodation->delete();

        return response()->json(['message' => 'Accommodation deleted successfully']);
    }

    public function index(Request $request)
    {
        $query = Accommodation::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('accommodationId')) {
            $idFilter = $request->input('accommodationId');
            $query->where('id', $idFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'userRole' relationship
        $query->with([
            'images',
            'camping' => function ($que) {
                $que->with('destination'); // Eager load the 'destination' relationship of 'camping'
            },
            'camping.destination',
            'amenities' // Eager load the amenities relationship
        ]);
        $destinations = $query->get();
        return response()->json(['data' => $destinations]);
    }
}
