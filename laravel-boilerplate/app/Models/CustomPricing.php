<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomPricing extends Model
{
    protected $fillable = ['price', 'start_date', 'end_date', 'discount_price', 'accommodation_id'];

    // You can add additional methods or relationships here as needed44
    public function accommodation()
    {
        return $this->belongsTo(Accommodation::class);
    }
}
