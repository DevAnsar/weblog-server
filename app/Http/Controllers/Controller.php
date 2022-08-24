<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use App\Models\Tag;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['dashboard']);
    }

    /**
     * Calculate site data for show in the dashboard page.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function dashboard(Request $request)
    {

        if (!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }

        $users = User::query()->where("is_admin", 0)->get();
        $published_posts = Post::query()->where("published", 1)->get();
        $draft_posts = Post::query()->where("published", 2)->get();
        $categories = Category::query()->get();
        $tags = Tag::query()->get();

        return response()->json([
            'data' => [
                'users_count' => $users->count(),
                'published_posts_count' => $published_posts->count(),
                'draft_posts_count' => $draft_posts->count(),
                'categories_count' => $categories->count(),
                'tags_count' => $tags->count(),
            ],
            'message' => 'Created successfully'
        ], 201);
    }
}
