<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Category::latest()->select('id', 'name')->get(),
        ], 200);
    }

    public function store(CategoryRequest $request)
    {
        Category::create([
            'name' => $request->name
        ]);

        return response()->json([
            'msg' => 'Category was created',
        ], 200);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update([
            'name' => $request->name
        ]);

        return response()->json([
            'msg' => 'Category was updated',
        ], 200);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'msg' => 'Category was deleted',
        ], 200);
    }
}
