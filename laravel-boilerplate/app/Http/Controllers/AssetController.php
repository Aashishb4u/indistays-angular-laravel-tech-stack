<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AssetController extends Controller
{
    public function paginate(Request $request) {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1);
        $query = Asset::query();

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        if ($request->has('asset_type')) {
            $assetFilter = $request->input('asset_type');
            $query->where('asset_type', 'LIKE', "%{$assetFilter}%");
        }

        // Eager load the 'userRole' relationship
        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $data = $query->paginate($pageSize, ['*'], 'page', $page);
        return response()->json(['data' => $data]);
    }

    public function index(Request $request)
    {
        $query = Asset::query();

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        if ($request->has('asset_type')) {
            $assetFilter = $request->input('asset_type');
            $query->where('asset_type', 'LIKE', "%{$assetFilter}%");
        }

        // Eager load the 'userRole' relationship
        $assetsData = $query->get();
        return response()->json(['data' => $assetsData]);
    }

    public function editAsset(Request $request, $id) {
        $asset = Asset::findOrFail($id);
        DB::beginTransaction();

        try {
            if ($request->hasFile('image')) {
                $assetImage = $request->file('image'); // Change 'images' to 'profile_image'
                $customName = 'asset-' . $id . '.' . $assetImage->getClientOriginalExtension();
                $path = $assetImage->storeAs('public/images', $customName);
                $assetImageUrl = Storage::url($path);

                // Update the profile image URL for the camping
                $asset->image_url = $assetImageUrl;
            }

            $asset->update([
                'name' => $request->input('name'),
                'asset_type' => $request->input('asset_type'),
            ]);
            DB::commit();
            return response()->json(['message' => 'Asset created successfully', 'data' => $asset], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating camping images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function addAsset(Request $request)
    {
        $queryData = $request->except(['image']); // Exclude images from destination data

        // Start a database transaction
        DB::beginTransaction();

        try {
            $asset = Asset::create($queryData);
            $id = $asset->id;
            $assetUrl = null;
            if ($request->hasFile('image')) {
                $profileImage = $request->file('image'); // Change 'images' to 'profile_image'
                $customName = 'asset-' . $id . '.' . $profileImage->getClientOriginalExtension();
                $path = $profileImage->storeAs('public/images', $customName);
                $assetUrl = Storage::url($path);

                // Update the profile image URL for the camping
                $asset->image_url = $assetUrl;
                $asset->save();
                DB::commit();
            }
            return response()->json(['message' => 'Asset created successfully', 'data' => $asset], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating camping images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteAsset($id)
    {
        $asset = Asset::findOrFail($id);
        $asset->delete();

        return response()->json(['message' => 'Asset deleted successfully']);
    }
}
