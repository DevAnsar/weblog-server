<?php

namespace App\Http\Controllers;

use App\Lib\Helper;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    use Helper;
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        if($request->input('post_id')) {
            $comments = Comment::with('user', 'post')
                ->where('approved', 1)
                ->where('post_id', $request->input('post_id'))
                ->paginate(10);
        } else {
            $comments = Comment::with('user', 'post')->orderBy('id', 'DESC')->paginate(10);
        }
        return response()->json(['data' => $comments], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'post_id' => 'required',
            'comment' => 'required'
        ]);
        $comment = new Comment();
        $comment->user_id = $request->user()->id;
        $comment->post_id = $request->post_id;
        $comment->comment = $request->comment;
        $comment->save();
        return response()->json(['data' => $comment, 'message' => 'Comment created successfully! we will review and publish it soon'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $comment = Comment::with('user', 'post')->findOrFail($id);
        return response()->json(['data' => $comment], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request, $id)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $comment = Comment::with('user', 'post')->findOrFail($id);
        if($request->has('comment')) {
            $this->validate($request, [
                'comment' => 'required'
            ]);
        }
        if($request->has('comment')) {
            $comment->comment = $request->comment;
        }
        if(isset($request->approved)) {
            $comment->approved = $request->approved;
        }
        $comment->save();
        return response()->json(['data' => $comment, 'message' => 'Updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        if(!\request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        Comment::findOrFail($id)->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
