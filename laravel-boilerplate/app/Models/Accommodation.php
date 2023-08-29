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
        return $this->hasMany(Amenity::class);
    }

    public function profileImage()
    {
        return $this->images()->profileImage()->first();
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
