<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accommodation;

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

    public function addAccommodation(Request $request)
    {
        $accommodationData = $request->validate([
            'name' => 'required|string',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'camping_id' => 'required|exists:campings,id',
            'amenity_ids' => 'nullable|array',
            'amenity_ids.*' => 'exists:amenities,id',
        ]);

        $accommodation = Accommodation::create($accommodationData);

        return response()->json(['message' => 'Accommodation created successfully', 'data' => $accommodation], 201);
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
