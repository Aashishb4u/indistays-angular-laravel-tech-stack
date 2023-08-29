<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Camping;

class CampingController extends Controller
{
    public function getCampingsData(Request $request) {
        $query = Camping::with('destination', 'accommodations');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $campings = $query->paginate(10);

        return response()->json($campings);
    }

    public function getAllCampingsData(Request $request) {
        $query = Camping::with('destination', 'accommodations');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $campings = $query->get();

        return response()->json($campings);
    }

    public function addCamping(Request $request)
    {
        $campingData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'location_map_link' => 'required|string',
            'destination_id' => 'required|exists:destinations,id',
        ]);

        $camping = Camping::create($campingData);

        return response()->json(['message' => 'Camping created successfully', 'data' => $camping], 201);
    }

    public function editCamping(Request $request, $id)
    {
        $camping = Camping::findOrFail($id);

        $campingData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'address' => 'required|string',
            'location_map_link' => 'required|string',
            'destination_id' => 'required|exists:destinations,id',
        ]);

        $camping->update($campingData);

        return response()->json(['message' => 'Camping updated successfully', 'data' => $camping]);
    }

    public function deleteCamping($id)
    {
        $camping = Camping::findOrFail($id);
        $camping->delete();

        return response()->json(['message' => 'Camping deleted successfully']);
    }
}
