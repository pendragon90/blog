<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ArticleRequest;
use App\Http\Resources\CommentsResource;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ArticlesResource;     
use App\Http\Resources\UserResource;
use App\Models\Bookmark;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->input('search');
        $query = Article::query();

        if ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        }

        $articles = $query->latest()->take(10)->get();

        return response()->json([
            'articles' => ArticlesResource::collection($articles),
        ]);
    }


    public function latest(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1); 
        $offset = ($page - 1) * $take;
    
        // Query Articles with necessary relationships
        $query = Article::with(['likes', 'savedArticles']);
    
        $user = Auth::user();

        $offset = ($page - 1) * $take;
        $articles = $query->latest()->skip($offset)->take($take)->get();
        $totalArticles = $query->count();

        return inertia('Home', [
            'user' => $user ? new UserResource($user) : null,
           'articles' => ArticlesResource::collection($articles),
            'total_articles' => $totalArticles,
        ]);
    }
    

    public function popular(Request $request)
{
    $take = $request->input('take', 10);
    $page = $request->input('page', 1);
    $query = Article::orderBy('views', 'desc');

    $user = Auth::user();

    $offset = ($page - 1) * $take;
    $articles = $query->latest()->skip($offset)->take($take)->get();
    $totalArticles = $query->count();

    return inertia('PopularArticlesPage', [
        'user' => $user ? new UserResource($user) : null,
        'articles' => ArticlesResource::collection($articles),
        'total_articles' => $totalArticles,
    ]);
}

    public function popularSide(Request $request)
{

    $articles = Article::orderBy('views', 'desc')->latest()->take(10)->get();

    $totalArticles = $articles->count();

    return response()->json([
        'articles' => ArticlesResource::collection($articles),
        'total_articles' => $totalArticles,
    ]);
}


    public function topLike(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1); // Current page
        $query = Article::withCount('likes')
        ->orderBy('likes_count', 'desc');
        $user = Auth::user();

        $offset = ($page - 1) * $take;
        $articles = $query->latest()->skip($offset)->take($take)->get();
        $totalArticles = $query->count();

        return inertia('TopLikeArticlesPage', [
            'user' => $user ? new UserResource($user) : null,
           'articles' => ArticlesResource::collection($articles),
            'total_articles' => $totalArticles,
        ]);
    }

    public function ArticlesByCategory(Request $request, Category $category)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $take;
        $user = Auth::user();
        
        $articlesQuery = Article::where('category_id', $category->id)->latest();
        $articles = $articlesQuery->skip($offset)->take($take)->get();
        $totalArticles = $articlesQuery->count();
        
        return inertia('CategoryArticlePage', [
            'user' => $user ? new UserResource($user) : null,
            'category' => $category,
            'articles' => ArticlesResource::collection($articles),
            'total_articles' => $totalArticles,
        ]);
    }
    public function ArticlesSaved(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $take;
    
        $user = Auth::user();
        $savedArticles = $user->savedArticles()->latest()
        ->skip($offset)
        ->take($take)
        ->get();
    
        return inertia('ArticlesSavedPage', [
            'user' => $user ? new UserResource($user) : null,
            'articles' => ArticlesResource::collection($savedArticles),
        ]);
    }


    public function show(Request $request, Article $article)
    {
        $article->increment('views');
        $search = $request->input('search');
        $take = $request->input('take', 10); // Number of Articles to take
        $category = $request->input('category');
        $tags = $request->input('tags');
        $commentPage = $request->input('comment_page', 1);
        $relateArticlePage = $request->input('relate_article_page', 1);

        $user = Auth::user();

        // Fetch the Article by slug
        $article = Article::where('slug', $article->slug)->firstOrFail();

        $query = Article::query();

        if ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        }
        if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        }
        if ($tags) {
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->where('name', $tags);
            });
        }

        $articlesQuery = ArticlesResource::collection($query->latest()->take($take)->get());
        $articleResource = new ArticleResource($article);

        // Handle related Articles pagination
        $relateArticlePerPage = 5;
        $offsetRelateArticle = ($relateArticlePage - 1) * $relateArticlePerPage;
        $relateArticle = ArticlesResource::collection(Article::where('category_id', $article->category_id)->latest()
            ->skip($offsetRelateArticle)
            ->take($relateArticlePerPage)
            ->get());

        // Handle comments pagination
        $commentsPerPage = 10;
        $offsetComment = ($commentPage - 1) * $commentsPerPage;
        $comments = Comment::where('article_id', $article->id)
            ->with('replies.user') // Eager load replies and their users
            ->latest()
            ->skip($offsetComment)
            ->take($commentsPerPage)
            ->get();

        return inertia('ArticleDetailPage', [
            'user' => $user ? new UserResource($user) : null,
            'search' => $articlesQuery,
            'article' => $articleResource,
            'relate_article' => $relateArticle,
            'comments' => CommentsResource::collection($comments),
            'total_comments' => Comment::where('article_id', $article->id)->count(),
            'total_relate_articles' => Article::where('category_id', $article->category_id)->count(), // Add this for front-end total related Articles count
        ]);
    }


    public function store(ArticleRequest $articleRequest)
    {
        $img = '';
        $slug =  Str::slug($articleRequest->title . '-' . uniqid());
        $requestImg = $articleRequest->file('img');

        if ($requestImg) {
            $imgName = $slug . '.' . $requestImg->getClientOriginalExtension();
            $img = $requestImg->storeAs('img/Articles', $imgName);
        }

        $article = Article::create([
            'user_id' => Auth::user()->id,
            'category_id' => $articleRequest->category_id,
            'slug' => $articleRequest->title . '_' . uniqid(),
            'title' => $articleRequest->title,
            'body' => $articleRequest->body,
            'img' => $img,
        ]);

        $article->tags()->sync($articleRequest->tags);

        return back();
    }

    public function update(ArticleRequest $articleRequest, Article $article)
    {
        $img = '';
        $slug =  Str::slug($articleRequest->title . '-' . uniqid());
        $requestImg = $articleRequest->file('img');

        if ($requestImg) {
            $imgName = $slug . '.' . $requestImg->getClientOriginalExtension();
            $img = $requestImg->storeAs('img/Articles', $imgName);
        }

        $article->update([
            'category_id' => $articleRequest->category_id,
            'slug' => $articleRequest->title . '_' . uniqid(),
            'title' => $articleRequest->title,
            'body' => $articleRequest->body,
            'img' => $img,
        ]);

        $article->tags()->sync($articleRequest->tags);

        return back();
    }

    public function destroy(Article $article)
    {
        if ($article->img) {
            Storage::disk('public')->delete($article->img);
        }

        $article->delete();

        return back();
    }

    public function like(Article $article)
    {
        $user = Auth::user();

        $existingLike = Like::where('article_id', $article->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                'user_id' => $user->id,
                'article_id' => $article->id,
            ]);
        }

        return redirect()->back();
    }

    public function save(Article $article)
    {
        $user = Auth::user();

        $existingSave = Bookmark::where('article_id', $article->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingSave) {
            $existingSave->delete();
        } else {
            Bookmark::create([
                'user_id' => $user->id,
                'article_id' => $article->id,
            ]);
        }

        return redirect()->back();
    }

    
}
