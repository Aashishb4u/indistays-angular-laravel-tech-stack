<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    protected $fillable = ['name', 'asset_type', 'image_url'];
}
