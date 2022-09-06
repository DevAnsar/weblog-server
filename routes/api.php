<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentsController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\TagsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\NewslettersController;
use App\Http\Controllers\ContactsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\IndexController as ApiIndexController;
use App\Http\Controllers\Api\PostController as ApiPostController;
use App\Http\Controllers\Api\CategoryController as ApiCategoryController;
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

Route::prefix('v1')->group(function () {
    Route::get('index', [ApiIndexController::class,'index']);
    Route::get('posts/data/{id}', [ApiPostController::class,'get_post_with_id']);
    Route::get('posts/{slug}', [ApiPostController::class,'get_post']);
    Route::get('categories', [ApiCategoryController::class,'get_categories']);
    Route::get('categories/{slug}/posts', [ApiCategoryController::class,'get_category_posts']);
    Route::get('search', [ApiIndexController::class,'search']);
    Route::post('newsletter/addEmail', [ApiIndexController::class,'create_newsletter']);
    Route::post('contact-us/sendMessage', [ApiIndexController::class,'create_contact_message']);
});

Route::post('login', [LoginController::class,'login'])->name('login');
Route::post('register', [RegisterController::class,'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('logout', [LoginController::class,'logout'])->name('logout');
    Route::get('check-auth', [LoginController::class,'checkAuth']);
});

Route::resource('categories', CategoryController::class);
Route::resource('posts', PostsController::class);
Route::resource('tags', TagsController::class);
Route::resource('comments', CommentsController::class);
Route::get('profile', [UsersController::class,'profile']);
Route::post('profile/update', [UsersController::class,'updateProfile']);
Route::resource('users', UsersController::class);
Route::get('dashboard', [Controller::class,'dashboard']);
Route::resource('newsletters', NewslettersController::class);
Route::resource('contacts', ContactsController::class);
Route::post('contacts/{contact}/answer', [ContactsController::class,'answer_to_contact']);
