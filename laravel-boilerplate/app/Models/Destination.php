<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $fillable = ['name', 'description'];

    public function campings()
    {
        return $this->hasMany(Camping::class);
    }

    public function images()
    {
        // Destination has many morph values in images table rows
        return $this->morphMany(Image::class, 'imageable');
    }
}
