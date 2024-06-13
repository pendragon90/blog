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
use App\Models\Comment;
use App\Models\Like;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index(Request $request)
{
    $search = $request->input('search');
    $take = $request->input('take', 10);
    $page = $request->input('page', 1); // Current page

    $user = Auth::user();

    $query = Post::query();

    if ($search) {
        $query->where('title', 'LIKE', '%' . $search . '%');
    }
    if ($category = $request->input('category')) {
        $query->whereHas('category', function ($q) use ($category) {
            $q->where('name', $category);
        });
    }
    if ($tags = $request->input('tags')) {
        $query->whereHas('tags', function ($q) use ($tags) {
            $q->where('name', $tags);
        });
    }

    $offset = ($page - 1) * $take;
    $postsQuery = PostsResource::collection($query->latest()->skip($offset)->take($take)->get());
    $totalPosts = $query->count();

    return inertia('Home', [
        'user' => $user ? new UserResource($user) : null,
        'search' => $postsQuery,
        'post' => $postsQuery,
        'total_posts' => $totalPosts,
    ]);
}


    public function show(Request $request, $slug)
    {
        $search = $request->input('search');
        $take = $request->input('take', 10); // Number of posts to take
        $category = $request->input('category');
        $tags = $request->input('tags');
        $commentPage = $request->input('comment_page', 1); 
        $relatePostPage = $request->input('relate_post_page', 1); 
    
        $user = Auth::user();
    
        // Fetch the post by slug
        $post = Post::where('slug', $slug)->firstOrFail();
    
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
        $relatePostPerPage =5;
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

    public function popular()
    {
        // Implement logic for popular posts if needed
    }
}
