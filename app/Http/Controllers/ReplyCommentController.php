<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Comment;
use App\Models\ReplyComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentsResource;
use App\Http\Resources\ReplyCommentsResource;

class ReplyCommentController extends Controller
{

    public function store(CommentRequest $request, Post $post, Comment $comment)
    {
        ReplyComment::create([
            'user_id' => Auth::user()->id,
            'comment_id' => $comment->id,
            'comment' => $request->comment
        ]);
        return redirect()->back();
    }

    public function update(CommentRequest $request, Post $post, Comment $comment, $id)
    {
        $replyComment = ReplyComment::findOrFail($id);

        if (Auth::user()->id !== $replyComment->user_id && Auth::user()->role_id !== 1) {
             return redirect()->back();
        }

        $replyComment->update([
            'comment' => $request->comment
        ]);
        return redirect()->back();
      
    }

    public function destroy(Post $post, Comment $comment, $id)
    {
        $replyComment = ReplyComment::findOrFail($id);

        if (Auth::user()->id !== $replyComment->user_id && Auth::user()->role_id !== 1) {
             return redirect()->back();
        }

        $replyComment->delete();

     
    }
}
