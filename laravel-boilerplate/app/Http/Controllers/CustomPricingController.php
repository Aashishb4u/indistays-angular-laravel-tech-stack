<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomPricing;

class CustomPricingController extends Controller
{
    public function getCustomPricings(Request $request)
    {
        $perPage = $request->input('per_page', 10);

        $customPricings = CustomPricing::paginate($perPage);

        return response()->json($customPricings);
    }

    public function getAllCustomPricings(Request $request)
    {
        $customPricings = CustomPricing::all();

        return response()->json($customPricings);
    }

    public function addCustomPricing(Request $request)
    {
        $customPricingData = $request->validate([
            'price' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $customPricing = CustomPricing::create($customPricingData);

        return response()->json(['message' => 'Custom pricing created successfully', 'data' => $customPricing], 201);
    }

    public function editCustomPricing(Request $request, $id)
    {
        $customPricing = CustomPricing::findOrFail($id);

        $customPricingData = $request->validate([
            'price' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $customPricing->update($customPricingData);

        return response()->json(['message' => 'Custom pricing updated successfully', 'data' => $customPricing]);
    }

    public function deleteCustomPricing($id)
    {
        $customPricing = CustomPricing::findOrFail($id);
        $customPricing->delete();

        return response()->json(['message' => 'Custom pricing deleted successfully']);
    }
}
