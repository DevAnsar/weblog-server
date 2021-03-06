<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:sanctum");
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $users = User::paginate(10);
        return response()->json(['data' => $users], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $this->validate($request, [
            'name' => 'required|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        if($request->has('is_admin') && $request->is_admin == 1) {
            $user->is_admin = 1;
        }
        $user->save();
        return response()->json(['data' => $user, 'message' => 'Created successfully'], 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        if(!request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $user = User::findOrFail($id);
        return response()->json(['data' => $user], 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $user = User::findOrFail($id);
        $this->validate($request, [
            'name' => 'required|unique:users,name,'.$user->id,
            'email' => 'required|email|unique:users,email,'.$user->id,
            'password' => ($request->password!=''?'min:6':''),
        ]);
        $user->name = $request->name;
        $user->email = $request->email;
        if($request->has('password') && !empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        if($request->has('is_admin') && $request->is_admin == 1) {
            $user->is_admin = 1;
        } else {
            $user->is_admin = 0;
        }
        $user->save();
        return response()->json(['data' => $user, 'message' => 'Updated successfully'], 200);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if(!request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        User::find($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
    /**
     * view user profile
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function profile()
    {
        return response()->json(['data' => auth()->user()]);
    }
}
