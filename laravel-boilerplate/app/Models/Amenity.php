<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amenity extends Model
{
    protected $fillable = ['name'];

    public function accommodations()
    {
        return $this->belongsToMany(Accommodation::class, 'accommodation_amenity', 'amenity_id', 'accommodation_id');
    }
}
