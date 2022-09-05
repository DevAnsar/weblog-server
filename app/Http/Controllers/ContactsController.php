<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ContactsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $contacts = Contact::query()->where("parent_id",0)
            ->withCount('answers')->paginate(10);
        return response()->json(['data' => $contacts]);
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
     *
     * @param Contact $contact
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function answer_to_contact(Contact $contact,Request $request)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $this->validate($request, [
            'content' => 'required',
        ]);

        $contact->answers()->create([
            'content' =>$request->input('content'),
            'name'=> 'ادمین',
            'email'=> "support@gmail.com"
        ]);

        $contact->answers = $contact->answers()->get();
        return response()->json(['data' => $contact, 'message' => 'Created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $contact = Contact::query()->with('answers')->findOrFail($id);
        if(!$contact->seen){
            $contact->update(['seen'=>true]);
        }
        return response()->json(['data' => $contact]);
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
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if(!$request->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $contact = Contact::findOrFail($id);
        $this->validate($request, [
            'title' => 'required'
        ]);
        $contact->title = $request->input('title');
        $contact->save();
        return response()->json(['data' => $contact, 'message' => 'Updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        if(!\request()->user()->is_admin) {
            return response()->json(['message' => 'Unauthorize'], 500);
        }
        $contact = Contact::findOrFail($id);
        $contact->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
