<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['url', 'is_profile_image'];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function scopeProfileImage($query)
    {
        return $query->where('is_profile_image', true);
    }
}
