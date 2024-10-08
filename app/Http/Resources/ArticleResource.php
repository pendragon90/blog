<?php

namespace App\Http\Resources;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'author' => $this->authorDetails(),
            'category' => $this->category->name,
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'img' => $this->img ? $this->img : asset("/storage/{$this->img}"),
            'body' => $this->body,
            'date' => $this->created_at->format('j M Y')
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
