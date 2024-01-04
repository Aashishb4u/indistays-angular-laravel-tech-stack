<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerReview extends Model
{
    protected $fillable = ['review', 'ratings', 'camping_id'];

    public function camping()
    {
        return $this->belongsTo(Camping::class);
    }
}
