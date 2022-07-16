<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('login', [LoginController::class,'login'])->name('login');
Route::post('register', [RegisterController::class,'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [LoginController::class,'logout'])->name('logout');
    Route::get('check-auth', [LoginController::class,'checkAuth'])->name('logout');
});

Route::resource('categories', CategoryController::class);
Route::resource('posts', PostsController::class);
Route::resource('tags', TagsController::class);
Route::resource('comments', CommentsController::class);
Route::get('profile', [UsersController::class,'profile']);
Route::resource('users', UsersController::class);
