<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout', 'checkAuth');
    }

    public function login(Request $request)
    {

        $this->validateLogin($request);
        if ($this->attemptLogin($request)) {
            $user = $this->guard()->user();
            $token = $request->user()->createToken("auth");
            return response()->json([
                'user' => array_merge($user->toArray(),["api_token"=>$token->plainTextToken])
            ]);
        }
        return $this->sendFailedLoginResponse($request);
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        if ($user) {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['data' => 'User logged out.'], 200);
        }
        return response()->json(['state' => 0, 'message' => 'Unauthenticated'], 401);
    }
    public function checkAuth(Request $request)
    {
        $user = $request->user();
        if ($user && $user->is_admin) {
            return response()->json(['state' => 1]);
        }
        return response()->json(['state' => 0], 401);
    }

}
