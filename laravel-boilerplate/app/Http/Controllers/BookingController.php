<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomBooking;

class BookingController extends Controller
{
    public function getAllBookings(Request $request)
    {
        $query = CustomBooking::query();

        // Apply filters if provided
        if ($request->has('start_date')) {
            $query->where('start_date', '>=', $request->input('start_date'));
        }
        if ($request->has('end_date')) {
            $query->where('end_date', '<=', $request->input('end_date'));
        }

        $bookings = $query->get();

        return response()->json($bookings);
    }

    public function getBookings(Request $request)
    {
        $query = CustomBooking::query();

        // Apply filters if provided
        if ($request->has('start_date')) {
            $query->where('start_date', '>=', $request->input('start_date'));
        }

        if ($request->has('end_date')) {
            $query->where('end_date', '<=', $request->input('end_date'));
        }

        $perPage = $request->input('per_page', 10);

        $bookings = $query->paginate($perPage);

        return response()->json($bookings);
    }

    public function addBooking(Request $request)
    {
        $bookingData = $request->validate([
            'camping_id' => 'required|exists:campings,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $booking = CustomBooking::create($bookingData);

        return response()->json(['message' => 'Booking added successfully', 'data' => $booking], 201);
    }

    public function editBooking(Request $request, $id)
    {
        $booking = CustomBooking::findOrFail($id);

        $bookingData = $request->validate([
            'camping_id' => 'required|exists:campings,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        $booking->update($bookingData);

        return response()->json(['message' => 'Booking updated successfully', 'data' => $booking]);
    }

    public function deleteBooking($id)
    {
        $booking = CustomBooking::findOrFail($id);
        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully']);
    }
}
