<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Resources\CommentsResource;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PostsResource;
use App\Http\Resources\UserResource;
use App\Models\Bookmark;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function search(Request $request)
    {
        $search = $request->input('search');
        $query = Post::query();

        if ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        }

        $posts = $query->latest()->take(10)->get();

        return response()->json([
            'posts' => PostsResource::collection($posts),
        ]);
    }


    public function latest(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1); 
        $offset = ($page - 1) * $take;
    
        // Query posts with necessary relationships
        $query = Post::with(['likes', 'savedPosts']);
    
        $user = Auth::user();

        $offset = ($page - 1) * $take;
        $posts = $query->latest()->skip($offset)->take($take)->get();
        $totalPosts = $query->count();

        return inertia('Home', [
            'user' => $user ? new UserResource($user) : null,
           'posts' => PostsResource::collection($posts),
            'total_posts' => $totalPosts,
        ]);
    }
    

    public function popular(Request $request)
{
    $take = $request->input('take', 10);
    $page = $request->input('page', 1);
    $query = Post::orderBy('views', 'desc');

    $user = Auth::user();

    $offset = ($page - 1) * $take;
    $posts = $query->latest()->skip($offset)->take($take)->get();
    $totalPosts = $query->count();

    return inertia('PopularArticlesPage', [
        'user' => $user ? new UserResource($user) : null,
        'posts' => PostsResource::collection($posts),
        'total_posts' => $totalPosts,
    ]);
}

    public function popularSide(Request $request)
{

    $posts = Post::orderBy('views', 'desc')->latest()->take(10)->get();

    $totalPosts = $posts->count();

    return response()->json([
        'posts' => PostsResource::collection($posts),
        'total_posts' => $totalPosts,
    ]);
}


    public function topLike(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1); // Current page
        $query = Post::withCount('likes')
        ->orderBy('likes_count', 'desc');
        $user = Auth::user();

        $offset = ($page - 1) * $take;
        $posts = $query->latest()->skip($offset)->take($take)->get();
        $totalPosts = $query->count();

        return inertia('TopLikeArticlesPage', [
            'user' => $user ? new UserResource($user) : null,
           'posts' => PostsResource::collection($posts),
            'total_posts' => $totalPosts,
        ]);
    }

    public function postsByCategory(Request $request, Category $category)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $take;
        $user = Auth::user();
        
        $postsQuery = Post::where('category_id', $category->id)->latest();
        $posts = $postsQuery->skip($offset)->take($take)->get();
        $totalPosts = $postsQuery->count();
        
        return inertia('CategoryArticlePage', [
            'user' => $user ? new UserResource($user) : null,
            'category' => $category,
            'posts' => PostsResource::collection($posts),
            'total_posts' => $totalPosts,
        ]);
    }
    public function postsSaved(Request $request)
    {
        $take = $request->input('take', 10);
        $page = $request->input('page', 1);
        $offset = ($page - 1) * $take;
    
        $user = Auth::user();
        $savedPosts = $user->savedPosts()->latest()
        ->skip($offset)
        ->take($take)
        ->get();
    
        return inertia('SavedPage', [
            'user' => $user ? new UserResource($user) : null,
            'posts' => PostsResource::collection($savedPosts),
        ]);
    }


    public function show(Request $request, Post $post)
    {
        $post->increment('views');
        $search = $request->input('search');
        $take = $request->input('take', 10); // Number of posts to take
        $category = $request->input('category');
        $tags = $request->input('tags');
        $commentPage = $request->input('comment_page', 1);
        $relatePostPage = $request->input('relate_post_page', 1);

        $user = Auth::user();

        // Fetch the post by slug
        $post = Post::where('slug', $post->slug)->firstOrFail();

        $query = Post::query();

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

        $postsQuery = PostsResource::collection($query->latest()->take($take)->get());
        $postResource = new PostResource($post);

        // Handle related posts pagination
        $relatePostPerPage = 5;
        $offsetRelatePost = ($relatePostPage - 1) * $relatePostPerPage;
        $relatePost = PostsResource::collection(Post::where('category_id', $post->category_id)->latest()
            ->skip($offsetRelatePost)
            ->take($relatePostPerPage)
            ->get());

        // Handle comments pagination
        $commentsPerPage = 10;
        $offsetComment = ($commentPage - 1) * $commentsPerPage;
        $comments = Comment::where('post_id', $post->id)
            ->with('replies.user') // Eager load replies and their users
            ->latest()
            ->skip($offsetComment)
            ->take($commentsPerPage)
            ->get();

        return inertia('PostShow', [
            'user' => $user ? new UserResource($user) : null,
            'search' => $postsQuery,
            'post' => $postResource,
            'relate_post' => $relatePost,
            'comments' => CommentsResource::collection($comments),
            'total_comments' => Comment::where('post_id', $post->id)->count(),
            'total_relate_posts' => Post::where('category_id', $post->category_id)->count(), // Add this for front-end total related posts count
        ]);
    }


    public function store(PostRequest $postRequest)
    {
        $img = '';
        $slug =  Str::slug($postRequest->title . '-' . uniqid());
        $requestImg = $postRequest->file('img');

        if ($requestImg) {
            $imgName = $slug . '.' . $requestImg->getClientOriginalExtension();
            $img = $requestImg->storeAs('img/posts', $imgName);
        }

        $post = Post::create([
            'user_id' => Auth::user()->id,
            'category_id' => $postRequest->category_id,
            'slug' => $postRequest->title . '_' . uniqid(),
            'title' => $postRequest->title,
            'body' => $postRequest->body,
            'img' => $img,
        ]);

        $post->tags()->sync($postRequest->tags);

        return back();
    }

    public function update(PostRequest $postRequest, Post $post)
    {
        $img = '';
        $slug =  Str::slug($postRequest->title . '-' . uniqid());
        $requestImg = $postRequest->file('img');

        if ($requestImg) {
            $imgName = $slug . '.' . $requestImg->getClientOriginalExtension();
            $img = $requestImg->storeAs('img/posts', $imgName);
        }

        $post->update([
            'category_id' => $postRequest->category_id,
            'slug' => $postRequest->title . '_' . uniqid(),
            'title' => $postRequest->title,
            'body' => $postRequest->body,
            'img' => $img,
        ]);

        $post->tags()->sync($postRequest->tags);

        return back();
    }

    public function destroy(Post $post)
    {
        if ($post->img) {
            Storage::disk('public')->delete($post->img);
        }

        $post->delete();

        return back();
    }

    public function like(Post $post)
    {
        $user = Auth::user();

        $existingLike = Like::where('post_id', $post->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();
        } else {
            Like::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);
        }

        return redirect()->back();
    }

    public function save(Post $post)
    {
        $user = Auth::user();

        $existingSave = Bookmark::where('post_id', $post->id)
            ->where('user_id', $user->id)
            ->first();

        if ($existingSave) {
            $existingSave->delete();
        } else {
            Bookmark::create([
                'user_id' => $user->id,
                'post_id' => $post->id,
            ]);
        }

        return redirect()->back();
    }

    
}
