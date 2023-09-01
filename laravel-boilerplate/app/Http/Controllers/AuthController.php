<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Models\UserRole;
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

            // Generate access and refresh tokens
            // This sequence is important, refresh should generate first
            $refresh_token = auth()->refresh();
            $access_token = auth()->attempt($request->validated());

            // Fetch user_roles data based on the user's role ID
            $userRole = UserRole::find($user->user_role_id);

            // Include role information under the user object
            $user->role = $userRole;

            return response()->json([
                'message' => 'Login successful',
                'user' => $user,
                'tokens' => ['access' => ['token' => $access_token], 'refresh' => ['token' => $refresh_token]]
//                'access_token' => $access_token,
//                'refresh_token' => $refresh_token
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

    public function changePassword(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Validate the request data
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8',
        ]);

        // Check if the current password is correct
        if (!Hash::check($request->input('current_password'), $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }


        // Update the user's password
        $user->update([
            'password' => bcrypt($request->input('password')),
        ]);

        return response()->json(['message' => 'Password changed successfully']);
    }
}
