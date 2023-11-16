<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomBooking extends Model
{
    protected $fillable = ['name', 'contact_number', 'email', 'accommodation_id', 'booking_price', 'beds', 'start_date', 'end_date'];

    // You can add additional methods or relationships here as needed44
    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class);
    }
}
