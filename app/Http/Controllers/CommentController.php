<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentsResource;
use App\Models\Comment;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(CommentRequest $request, Article $article)
    {
      Comment::create([
            'user_id' => Auth::user()->id,
            'Article_id' => $article->id,
            'comment' => $request->comment
        ]);

        return redirect()->back();
    }

    public function update(CommentRequest $request, Article $article, Comment $comment)
    {
        if (Auth::user()->id !== $comment->user_id && Auth::user()->role_id !== 1) {
            return redirect()->back();
        }


        $comment->update([
            'comment' => $request->comment
        ]);
        return redirect()->back();
    }

    public function destroy(Article $article, Comment $comment)
    {
        if (Auth::user()->id !== $comment->user_id && Auth::user()->role_id !== 1) {
            return redirect()->back();
        }
        
        $comment->delete();
        return redirect()->back();
    }
}
