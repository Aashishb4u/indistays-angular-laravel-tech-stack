<?php

namespace App\Http\Controllers;
use App\Http\Requests\AddCustomBookingRequest;
use App\Http\Requests\MakeBookingRequest;
use App\Http\Requests\MakeEnquiryRequest;
use App\Models\CustomBooking;
use App\Models\Enquiry;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function paginate(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1);
        $query = CustomBooking::query();

        $query->with([
            'accommodation' => function ($que) {
                $que->with(['camping' => function ($queNext) {
                    $queNext->with('destination');
                }]);
            }
        ]);

        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order

        $data = $query->paginate($pageSize, ['*'], 'page', $page);
        return response()->json(['data' => $data]);
    }


    public function paginateEnquiries(Request $request)
    {

        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = Enquiry::query();
        $query->orderBy('created_at', 'desc'); // Order by the 'created_at' column in descending order
        $data = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name
        return response()->json(['data' => $data]);
    }

    public function index(Request $request)
    {
        $query = CustomBooking::query();
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


    public function addCustomBooking(AddCustomBookingRequest $request)
    {
        DB::beginTransaction();

        try {
            $queryData = $request->except(['beds_available']); // Exclude images from destination data
//            $customPriceData = $request->all();

            // Parse and format the date values
            $queryData['start_date'] = Carbon::parse($queryData['start_date'])->toDateTimeString();
            $queryData['end_date'] = Carbon::parse($queryData['end_date'])->toDateTimeString();

            $customPricing = CustomBooking::create($queryData);
            DB::commit();

            return response()->json(['message' => 'Custom booking created successfully', 'data' => $customPricing], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function addWebsiteBooking(MakeBookingRequest $request) {
        DB::beginTransaction();

        try {
            $bookingsData = $request->all(); // Include all data
            $bookings = [];

            foreach ($bookingsData as $bookingData) {
                // Parse and format the date values for each booking
                $bookingData['start_date'] = Carbon::parse($bookingData['start_date'])->toDateTimeString();
                $bookingData['end_date'] = Carbon::parse($bookingData['end_date'])->toDateTimeString();

                $booking = CustomBooking::create($bookingData);
                $bookings[] = $booking;
            }

            DB::commit();

            return response()->json(['message' => 'Custom bookings created successfully', 'data' => $bookings], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function makeEnquiry(MakeEnquiryRequest $request) {
        DB::beginTransaction();
        try {
            $enquiry = $request->all(); // Include all data
            $enquiryRes = Enquiry::create($enquiry);
            DB::commit();
            return response()->json(['message' => 'Enquiry created successfully', $enquiryRes], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and rollback the transaction
            DB::rollBack();
            return response()->json(['message' => 'An error occurred while updating accommodation images.', 'error' => $e->getMessage()], 500);
        }
    }

    public function editCustomBooking(Request $request, $id)
    {
        $customPricing = CustomBooking::findOrFail($id);

        $customPricingData = $request->validate([
            'name' => 'required',
            'email' => 'required',
            'contact_number' => 'required',
            'booking_price' => 'required|numeric',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $customPricing->update($customPricingData);

        return response()->json(['message' => 'Custom booking updated successfully', 'data' => $customPricing]);
    }

    public function deleteCustomBooking($id)
    {
        $customPricing = CustomBooking::findOrFail($id);
        $customPricing->delete();

        return response()->json(['message' => 'Custom booking deleted successfully']);
    }
}
