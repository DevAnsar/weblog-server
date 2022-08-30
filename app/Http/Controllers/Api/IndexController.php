<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        try {
            $postsQuery = Post::with('category', 'user', 'tags')
                ->where('published', 1)
                ->orderBy('id', 'DESC');

            if ($request->input('recent')) {   // in case of recent posts in website homepage
                $posts = $postsQuery->limit(9)->get();
            } else if ($request->input('category')) {   // in case of posts per category page
                $posts = $postsQuery->whereHas('category', function ($query) use ($request) {
                    $query->where('id', $request->input('category'));
                })->get();
            } else if ($request->input('tag')) {    // in case of posts per tag page
                $posts = $postsQuery->whereHas('tags', function ($query) use ($request) {
                    $query->where('id', $request->input('tag'));
                })->paginate(10);
            } else {   // the default case for the admin posts
                $posts = $postsQuery->paginate(10);
            }

            return response()->json([
                "posts" => $posts,
                "message" => "اطلاعات با موفقیت دریافت شد"
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }
}
