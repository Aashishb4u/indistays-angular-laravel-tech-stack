<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddAccommodationRequest;
use App\Models\Camping;
use Illuminate\Http\Request;
use App\Models\Accommodation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AccommodationController extends Controller
{
    public function getAccommodationsData(Request $request)
    {
        $query = Accommodation::with('camping.destination', 'amenities');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $accommodations = $query->paginate(10);

        return response()->json($accommodations);
    }

    public function getAllAccommodationsData(Request $request)
    {
        $query = Accommodation::with('camping.destination', 'amenities');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $accommodations = $query->get();

        return response()->json($accommodations);
    }

    public function addAccommodation(AddAccommodationRequest $request) {

        $queryData = $request->except(['images', 'profile_image']); // Exclude images from destination data

        // Start a database transaction
        DB::beginTransaction();

        try {
            $accommodation = Accommodation::create($queryData);
            $id = $accommodation->id;
            $profileImageUrl = null;

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

                    // Create image records for accommodation
                    $accommodation->images()->create([
                        'url' => $url,
                    ]);
                }
            }

            // Attach amenities (if provided)
            if ($request->has('amenity_ids')) {
                $amenities = $request->input('amenity_ids');
                $accommodation->amenities()->attach($amenities);
            }

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Camping created successfully', 'data' => $accommodation], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating camping images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function editAccommodation(Request $request, $id)
    {
        $accommodation = Accommodation::findOrFail($id);

        $accommodationData = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'camping_id' => 'required|exists:campings,id',
            'amenity_ids' => 'nullable|array',
            'amenity_ids.*' => 'exists:amenities,id',
        ]);

        $accommodation->update($accommodationData);

        return response()->json(['message' => 'Accommodation updated successfully', 'data' => $accommodation]);
    }

    public function deleteAccommodation($id)
    {
        $accommodation = Accommodation::findOrFail($id);
        $accommodation->delete();

        return response()->json(['message' => 'Accommodation deleted successfully']);
    }
}
