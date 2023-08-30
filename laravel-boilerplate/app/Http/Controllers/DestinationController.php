<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddDestinationRequest;
use App\Http\Requests\EditDestinationRequest;
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

    public function addDestination(AddDestinationRequest $request)
    {
        $destinationData = $request->all();
        $destination = Destination::create($destinationData);
        return response()->json(['message' => 'Destination created successfully', 'data' => $destination], 201);
    }

    public function editDestination(EditDestinationRequest $request, $id)
    {
        $destination = Destination::findOrFail($id);
        $destinationData = $request->all();
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
