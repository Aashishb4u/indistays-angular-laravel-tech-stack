<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Validator;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
   public function register(Request $request)
   {
       $validator = Validator::make($request->all(), [
           'name' => 'required|string',
           'email' => 'required|string|email|unique:users',
           'password' => 'required|string|min:6|confirmed'
       ]);

       if($validator->fails()) {
           return response()->json($validator->errors(), 400);
       }

       $user = User::create([
           'name' => $request->name,
           'email' => $request->email,
           'password' => Hash::make($request->password),
       ]);

       return response()->json([
           'message'=> 'Success',
           'user' => $user
       ]);
   }


   public function login(LoginRequest $request) {
       $credentials = $request->only('email', 'password');
       if (Auth::attempt($credentials)) {
           $user = Auth::user();
           $token = auth()->attempt($request->validated());

           return response()->json([
               'message' => 'Login successful',
               'user' => $user,
               'access_token' => $token
           ], 200);
       } else {
           return response()->json(['message' => 'Invalid credentials'], 401);
       }
   }

   public function profile() {
       return response()->json(auth()->user());
   }

   public function refresh() {
       return $this->respondWithToken(auth()->refresh());
   }

    public function logout(Request $request) {
        if(auth()->check()) { // Check if the user is authenticated
            auth()->logout();
            return response()->json([
                'message'=> 'User Logged Out Successfully'
            ], 201);
        } else {
            return response()->json([
                'message'=> 'User Not Authenticated'
            ], 401); // Return a 401 Unauthorized response
        }
    }
}
