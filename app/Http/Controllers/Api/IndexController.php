<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Newsletter;
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

    public function search(Request $request)
    {
        try {
            $postsQuery = Post::with('category', 'user', 'tags')
                ->where('published', 1)
                ->orderBy('id', 'DESC')
                ->where('title','LIKE',"%".$request->input('q')."%")
                ->orWhere('content','LIKE',"%".$request->input('q')."%")
                ->orWhere('excerpt','LIKE',"%".$request->input('q')."%");

            return response()->json([
                "posts" => $postsQuery->get(),
                "message" => "اطلاعات با موفقیت دریافت شد"
            ]);
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }

    public function create_newsletter(Request $request)
    {
        try {
            if($request->has('email') && filter_var($request->input('email'),FILTER_VALIDATE_EMAIL)){
                $checkEmail = Newsletter::query()
                    ->where('email', $request->input('email'))->first();

                if(!$checkEmail){
                    $newsletter = new Newsletter();
                    $newsletter->email = $request->input('email');
                    $newsletter->save();
                }
                return response()->json([
                    "message" => "با موفقیت به خبرنامه ما وصل شدی. لذتشو ببر!"
                ]);
            }else{
                return response()->json([
                    "message" => "فرمت ایمیل قابل قبول نیست!"
                ],410);
            }
        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }


    public function create_contact_message(Request $request)
    {
        try {
            $this->validate($request,[
                'name'=> 'required|min:2',
                'email'=> 'required|email',
                'content'=> 'required|min:5'
            ]);
            Contact::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'content' => $request->input('content'),
            ]);
            return response()->json([
                "message" => "پیام شما به ادمین ارسال شد"
            ]);

        } catch (\Exception $exception) {
            return response()->json([
                "message" => $exception->getMessage()
            ], 401);
        }
    }
}
