<?php

namespace App\Http\Controllers;

use App\Models\Amenity;
use Illuminate\Http\Request;

class AmenityController extends Controller
{
    public function index(Request $request)
    {
        $query = Amenity::query();

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Eager load the 'userRole' relationship
        $query->with('accommodations');
        $destinations = $query->get();
        return response()->json(['data' => $destinations]);
    }

}
