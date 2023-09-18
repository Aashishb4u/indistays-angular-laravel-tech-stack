<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Camping extends Model
{
    protected $fillable = ['name', 'description', 'address', 'location_map_link', 'destination_id'];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

    public function accommodations()
    {
        return $this->hasMany(Accommodation::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
