<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomBooking extends Model
{
    protected $fillable = ['camping_id', 'start_date', 'end_date'];

    // Relationship with Camping
    public function camping()
    {
        return $this->belongsTo(Camping::class);
    }
}
