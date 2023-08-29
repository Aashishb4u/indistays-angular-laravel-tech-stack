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

    public function profileImage()
    {
        return $this->images()->profileImage()->first();
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
