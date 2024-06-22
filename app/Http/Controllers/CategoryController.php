<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Category::latest()->select('id', 'name')->get(),
        ], 200);
    }

    
}
