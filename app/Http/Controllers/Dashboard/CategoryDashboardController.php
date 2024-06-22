<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryDashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $query = Category::query();
    
       
        if ($search !== '' || $search) {
            $query->where('name', 'like', '%' . $search . '%');
        }
    
      
        // Ambil artikel dengan pagination
        $categories = $query->latest()->paginate($request->query('perpage') ?? 20);
    
        return inertia('Dashboard/CategoriesDashboardPage', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function store(CategoryRequest $request)
    {
        Category::create([
            'slug' => $request->name . '_' . uniqid(),
            'name' => $request->name
        ]);

        return redirect()->back();
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update([
            'slug' => $request->name . '_' . uniqid(),
            'name' => $request->name
        ]);

        return redirect()->back();
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return redirect()->back();
    }
}
