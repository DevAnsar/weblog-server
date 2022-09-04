<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NewslettersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $newsletters = Newsletter::query()->paginate(15);

        return response()->json(['data' => $newsletters], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        $newsletter = new Newsletter();
        $newsletter->email = $request->input('email');
        $newsletter->save();
        return response()->json(['data' => $newsletter, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Newsletter  $newsletter
     * @return \Illuminate\Http\Response
     */
    public function show(Newsletter $newsletter)
    {

        return response()->json(['data' => $newsletter], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Newsletter  $newsletter
     * @return \Illuminate\Http\Response
     */
    public function edit(Newsletter $newsletter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Newsletter  $newsletter
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Newsletter $newsletter)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $this->validate($request, [
            'email' => 'required|email'
        ]);
        $newsletter->email = $request->input('email');
        $newsletter->save();
        return response()->json(['data' => $newsletter, 'message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Newsletter  $newsletter
     * @return \Illuminate\Http\Response
     */
    public function destroy(Newsletter $newsletter)
    {
        if(!\request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $newsletter->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
