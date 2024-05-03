<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * This method retrieves all users from the database and returns a JSON response containing the user data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        Gate::authorize('viewAny', User::class);

        $users = User::all();
        return response()->json($users);
    }

    /**
     * Store a newly created user in the database.
     *
     * This method validates the incoming request data for creating a new user, creates the user in the database if the validation passes,
     * and returns a JSON response containing the newly created user data.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        Gate::authorize('create', User::class);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'username' => 'required|string|max:255|unique:users',
            'role' => ['required', Rule::in([User::ROLE_ADMIN, User::ROLE_USER])],
            'mobile' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'username' => $request->username,
            'role' => $request->role,
            'mobile' => $request->mobile,
            'date_of_birth' => $request->date_of_birth,
            'password' => Hash::make($request->password),
        ]);

        return response()->json($user, 201);
    }

    /**
     * Display the specified user.
     *
     * This method retrieves the specified user from the database and returns a JSON response containing the user's data.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        Gate::authorize('view', $user);

        return response()->json($user);
    }

    /**
     * Update the specified user in storage.
     *
     * This method updates the details of the specified user in the database based on the provided request data.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, User $user): JsonResponse
    {
        Gate::authorize('update', $user);

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($user->id),
            ],
            'role' => ['required', Rule::in([User::ROLE_ADMIN, User::ROLE_USER])],
            'mobile' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
        ]);
        $user->update($request->only([
            'first_name', 'last_name', 'email', 'username', 'role', 'mobile', 'date_of_birth'
        ]));

        return response()->json($user, 200);
    }

    /**
     * Remove the specified user from storage.
     *
     * This method deletes the specified user from the database.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        Gate::authorize('delete', $user);

        $user->delete();
        return response()->json("Record deleted successfully!", 204);
    }
}
