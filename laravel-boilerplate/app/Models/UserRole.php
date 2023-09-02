<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;
    protected $fillable = [
        'role_name',
    ];

    // Define the reverse relationship with users
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
