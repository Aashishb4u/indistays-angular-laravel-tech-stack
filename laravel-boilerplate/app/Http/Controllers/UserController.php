<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserRoles()
    {
        $userRoles = UserRole::all(); // Only use `all()` method
        return response()->json($userRoles, 200);
    }

    // Create a new user
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'user_role_id' => 'required|exists:user_roles,id', // Ensure the role exists
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'user_role_id' => $data['user_role_id'], // Save the user_role_id in the users table
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user], 201);
    }


    // Update user by ID, including changing the user role
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $data = $request->validate([
            'name' => 'string',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'string',
            'user_role_id' => 'exists:user_roles,id', // Ensure the role exists
        ]);

        // Update the user's role if 'user_role_id' is provided in the request
        if (isset($data['user_role_id'])) {
            $user->user_role_id = $data['user_role_id'];
        }

        // Update other user details
        $user->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json(['message' => 'User updated successfully', 'data' => $user]);
    }

    // Get all users
    public function index(Request $request)
    {
        $query = User::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('userId')) {
            $userIdFilter = $request->input('userId');
            $query->where('id', $userIdFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Add a filter by 'email' if 'email' is provided in the request
        if ($request->has('email')) {
            $emailFilter = $request->input('email');
            $query->where('email', 'LIKE', "%{$emailFilter}%");
        }

        $users = $query->get();
        return response()->json(['data' => $users]);
    }

    // Get users with pagination and optional filters
    public function paginate(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('currentPage', 1); // Get the 'page' query parameter
        $query = User::query();

        // Add a filter by 'id' if 'user_id' is provided in the request
        if ($request->has('user_id')) {
            $userIdFilter = $request->input('user_id');
            $query->where('id', $userIdFilter);
        }

        // Add a filter by 'name' if 'name' is provided in the request
        if ($request->has('name')) {
            $nameFilter = $request->input('name');
            $query->where('name', 'LIKE', "%{$nameFilter}%");
        }

        // Add a filter by 'email' if 'email' is provided in the request
        if ($request->has('email')) {
            $emailFilter = $request->input('email');
            $query->where('email', 'LIKE', "%{$emailFilter}%");
        }

        // Eager load the 'userRole' relationship
        $query->with('userRole');

        $users = $query->paginate($pageSize, ['*'], 'page', $page); // Use 'page' as the query parameter name

        return response()->json(['data' => $users]);
    }

    // Delete user by ID
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

}
