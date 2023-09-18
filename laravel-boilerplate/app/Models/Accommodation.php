<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accommodation extends Model
{
    protected $fillable = ['name', 'price', 'description', 'camping_id', 'amenity_ids'];

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
}
