<?php

namespace App\Http\Controllers;

use App\Models\Camping;
use App\Models\CustomerReview;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerReviewController extends Controller
{

    public function index(Request $request)
    {
        try {
            $query = CustomerReview::query();

            // Add a filter by 'id' if 'user_id' is provided in the request
            if ($request->has('campingId')) {
                $idFilter = $request->input('campingId');
                $query->where('camping_id', $idFilter);
            }

            $query->with(['camping']);
            $reviews = $query->get();
            return response()->json(['message' => '', 'data' => $reviews], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function addCustomerReview(Request $request) {
        DB::beginTransaction();

        try {
            $queryData = $request->validate([
                'review' => 'required',
                'ratings' => 'required',
                'camping_id' => 'required',
            ]);
            $review = CustomerReview::create($queryData);
            DB::commit();
            return response()->json(['message' => 'Customer Review Added', 'data' => $review], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }
}
