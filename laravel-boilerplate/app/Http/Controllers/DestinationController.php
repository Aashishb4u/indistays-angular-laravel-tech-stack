<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Destination;

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

    public function getDestinationsData(Request $request)
    {
        $query = Destination::with('campings.accommodations');

        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        $destinations = $query->get();

        return response()->json($destinations);
    }

    public function addDestination(Request $request)
    {
        $destinationData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $destination = Destination::create($destinationData);

        return response()->json(['message' => 'Destination created successfully', 'data' => $destination], 201);
    }

    public function editDestination(Request $request, $id)
    {
        $destination = Destination::findOrFail($id);

        $destinationData = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        $destination->update($destinationData);

        return response()->json(['message' => 'Destination updated successfully', 'data' => $destination]);
    }

    public function deleteDestination($id)
    {
        $destination = Destination::findOrFail($id);
        $destination->delete();

        return response()->json(['message' => 'Destination deleted successfully']);
    }
}
