<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Lib\Helper;

class CategoryController extends Controller
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
        if($request->input('all')) {
            $categories = Category::orderBy('id', 'DESC')->get();
        } else {
            $categories = Category::paginate(10);
        }
        return response()->json(['data' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $this->validate($request, [
            'title' => 'required'
        ]);
        $category = new Category();
        $category->title = $request->input('title');
        $category->slug = $this->slugify($category->title);
        $category->save();
        return response()->json(['data' => $category, 'message' => 'Created successfully'], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $category = Category::findOrFail($id);
        return response()->json(['data' => $category]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $category = Category::findOrFail($id);
        $this->validate($request, [
            'title' => 'required'
        ]);
        $category->title = $request->input('title');
        $category->slug = $this->slugify($category->title);
        $category->save();
        return response()->json(['data' => $category, 'message' => 'Updated successfully'], 200);
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
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
