<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Http\Requests\TagRequest;

class TagController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Tag::latest()->select('id', 'name')->get(),
        ], 200);
    }

    public function store(TagRequest $request)
    {
        Tag::create([
            'name' => $request->name
        ]);

        return response()->json([
            'msg' => 'Category was created',
        ], 200);
    }

    public function update(TagRequest $request, Tag $tag)
    {
        $tag->update([
            'name' => $request->name
        ]);

        return response()->json([
            'msg' => 'Tag was updated',
        ], 200);
    }

    public function destroy(Tag $tag)
    {
        $tag->delete();

        return response()->json([
            'msg' => 'Tag was deleted',
        ], 200);
    }
}
