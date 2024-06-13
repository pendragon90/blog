<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\PostDashboardResource;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page', 10);
        $category = $request->input('category');
        $tags = $request->input('tags');

        $query = Post::query();

        if (Auth::user()->role_id == 2) {
            $query = $query->where('user_id', Auth::user()->id);
        } else {
            $query = $query;
        }

        if ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        } else if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        } else if ($tags) {
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->where('name', $tags);
            });
        }
        $totalPosts = $query->count();

        $posts = PostDashboardResource::collection($query->latest()->paginate($page));

        return response()->json([
            'total_posts' => $totalPosts,
            'data' => $posts,
            'meta' => [
                'current_page' => $posts->currentPage(),
                'total_pages' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
            'links' => [
                'next' => $posts->nextPageUrl(),
                'prev' => $posts->previousPageUrl(),
            ]
        ], 200);
    }

    public function pendingPosts(Request $request)
    {
        $search = $request->input('search');
        $page = $request->input('page', 10);
        $category = $request->input('category');
        $tags = $request->input('tags');

        $query = Post::query()->where('status_id', 1);

        if (Auth::user()->role_id == 2) {
            $query = $query->where('user_id', Auth::user()->id);
        } else {
            $query = $query;
        }

        if ($search) {
            $query->where('title', 'LIKE', '%' . $search . '%');
        } else if ($category) {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('name', $category);
            });
        } else if ($tags) {
            $query->whereHas('tags', function ($q) use ($tags) {
                $q->where('name', $tags);
            });
        }
        $totalPosts = $query->count();

        $posts = PostDashboardResource::collection($query->latest()->paginate($page));

        return response()->json([
            'total_posts' => $totalPosts,
            'data' => $posts,
            'meta' => [
                'current_page' => $posts->currentPage(),
                'total_pages' => $posts->lastPage(),
                'per_page' => $posts->perPage(),
                'total' => $posts->total(),
            ],
            'links' => [
                'next' => $posts->nextPageUrl(),
                'prev' => $posts->previousPageUrl(),
            ]
        ], 200);
    }


    public function changeStatus(Post $post)
    {
        $post->update([
            'status_id' => 2
        ]);

        return response()->json([
            'msg' => 'Status post was change completed'
        ], 200);
    }
}
