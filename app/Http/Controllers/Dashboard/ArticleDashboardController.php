<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticlesResource;
use App\Http\Resources\UserResource;
use App\Models\Article;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $search = $request->input('search');
        $query = Article::query();
        $categories = Category::latest()->get();
        $requestMinDate = $request->input('filterMonth.0');
        $requestMaxDate = $request->input('filterMonth.1');
    
        $minDate = Article::min('created_at');
        $maxDate = Article::max('created_at');
    
        // Filter by date
        if ($requestMinDate && $requestMaxDate) {
            $startDate = Carbon::parse($requestMinDate)->startOfMonth();
            $endDate = Carbon::parse($requestMaxDate)->endOfMonth();
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }
    
        // Filter by category
        if ($request->query('category')) {
            $category = Category::where('slug', $request->query('category'))->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }
    
        // Filter by search term
        if ($search !== '' || $search) {
            $query->where('title', 'like', '%' . $search . '%');
        }
    
        // Filter by number of likes
        if ($request->query('sort_likes')) {
            $sortLikes = $request->query('sort_likes');
            $query->withCount('likes')
                  ->orderBy('likes_count', $sortLikes);
        } else {
            $query->latest();
        }
    
        $articles = $query->paginate($request->query('perpage') ?? 20);
    
        return inertia('Dashboard/ArticlesDashboardPage', [
            'minDate' => $minDate,
            'maxDate' => $maxDate,
            'categories' => $categories,
            'articles' => ArticlesResource::collection($articles),
            'user' => new UserResource($user),
        ]);
    }
    
    

    public function store(Request $request)
    {
        Article::create([
            'title' => $request->title,
            'slug' => $request->title . '-' . uniqid(),
        ]);

        return redirect()->back();
    }
    public function update(Request $request, Article $article)
    {
        $article->update([
            'title' => $request->title,
            'slug' => $request->title . '-' . uniqid(),
        ]);

        return redirect()->back();
    }
    public function destroy(Article $article)
    {
        $article->delete();

        return redirect()->back();
    }
}
