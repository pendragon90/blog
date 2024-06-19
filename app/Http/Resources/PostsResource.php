<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PostsResource extends JsonResource
{
    public function toArray($request)
    {
        $user = $request->user();

        return [
            'author' => $this->authorDetails(),
            'category' => $this->category->name,
            'slug' => $this->slug,
            'title' => $this->title,
            'body' => Str::limit($this->body, 50),
            'img' => $this->img ? $this->img : asset("/storage/{$this->img}"),
            'total_likes' => $this->likes->count(),
            'views' => $this->views,
            'user_has_liked' => $user ? $this->likes()->where('user_id', $user->id)->exists() : false,
            'user_has_saved' => $user ? $this->savedPosts()->where('user_id', $user->id)->exists() : false,
            'date' => $this->created_at->format('j M Y'),
        ];
    }

    protected function authorDetails()
    {
        return [
            'name' => $this->user->name,
            'avatar' => $this->user->avatar
        ];
    }
}
