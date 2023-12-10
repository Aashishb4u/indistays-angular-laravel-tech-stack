<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $fillable = ['name', 'price', 'description', 'discount_price', 'beds_available', 'profile_image_url', 'camping_id', 'amenity_ids', 'weekend_price', 'weekend_discount_price'];

    public function camping()
    {
        return $this->belongsTo(Camping::class);
    }

    public function amenities()
    {
        return $this->belongsToMany(Amenity::class, 'accommodation_amenity', 'accommodation_id', 'amenity_id');
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function customPricing()
    {
        return $this->hasMany(CustomPricing::class);
    }

    public function customBooking()
    {
        return $this->hasMany(CustomBooking::class);
    }

}
