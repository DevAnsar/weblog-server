<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function get_post($slug, Request $request)
    {
        try {
            $post = Post::with('category', 'user', 'tags')->where("slug", $slug)->firstOrFail();
            return response()->json([
                "post" => $post,
                "message" => "اطلاعات با موفقیت دریافت شد"
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }

    public function get_post_with_id($post_id)
    {
        $post = Post::with('category', 'user', 'tags')->where("id", $post_id)->firstOrFail();
        return response()->json([
            "post" => $post,
            "message" => "اطلاعات با موفقیت دریافت شد"
        ]);
    }
}
