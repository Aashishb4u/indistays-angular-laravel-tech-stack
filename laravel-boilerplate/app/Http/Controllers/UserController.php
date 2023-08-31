<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserRoles()
    {
        $userRoles = UserRole::all(); // Only use `all()` method
        return response()->json($userRoles, 200);
    }

}
