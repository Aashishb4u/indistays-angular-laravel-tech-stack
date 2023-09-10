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
    // Read Like this - Users has many relationship with user roles
    // one User can be any role (User has many roles)
    //
    public function users()
    {
        return $this->hasMany(User::class); // user column in user_roles table
    }
}
