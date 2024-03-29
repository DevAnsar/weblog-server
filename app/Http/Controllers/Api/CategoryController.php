<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function get_categories(Request $request)
    {
        try {
            $categories = Category::query()
                ->withCount('posts')
                ->oldest()->get();


            return response()->json([
                "categories" => $categories,
                "message" => "اطلاعات با موفقیت دریافت شد"
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }

    public function get_category_posts($slug)
    {
        try {
            $category = Category::query()->where('slug',$slug)->first();
            $posts = $category->posts()->with("user")->get();


            return response()->json([
                "posts" => $posts,
                "category"=> $category,
                "message" => "اطلاعات با موفقیت دریافت شد"
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }
}
