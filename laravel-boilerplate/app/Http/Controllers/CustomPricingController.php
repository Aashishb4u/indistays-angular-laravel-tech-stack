<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddCustomPricing;
use App\Models\Camping;
use Illuminate\Http\Request;
use App\Models\CustomPricing;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CustomPricingController extends Controller
{
    public function paginate(Request $request)
    {

        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = CustomPricing::query();

        $query->with([
            'accommodation' => function ($que) {
                $que->with(['camping' => function ($queNext) {
                    $queNext->with('destination');
                }]);
            }
        ]);

        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $data = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name
        return response()->json(['data' => $data]);
    }

    public function index(Request $request)
    {
        $query = CustomPricing::query();
        $query->with([
            'accommodation' => function ($que) {
                $que->with(['camping' => function ($queNext) {
                    $queNext->with('destination');
                }]);
            }
        ]);
        $data = $query->get();
        return response()->json(['data' => $data]);
    }


    public function addCustomPricing(AddCustomPricing $request)
    {
        DB::beginTransaction();

        try {
            $customPriceData = $request->all();

            // Parse and format the date values
            $customPriceData['start_date'] = Carbon::parse($customPriceData['start_date'])->toDateTimeString();
            $customPriceData['end_date'] = Carbon::parse($customPriceData['end_date'])->toDateTimeString();

            $customPricing = CustomPricing::create($customPriceData);
            DB::commit();

            return response()->json(['message' => 'Custom pricing created successfully', 'data' => $customPricing], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }


    public function editCustomPricing(Request $request, $id)
    {
        $customPricing = CustomPricing::findOrFail($id);

        $customPricingData = $request->validate([
            'price' => 'required|numeric',
            'discount_price' => 'required|numeric',
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
