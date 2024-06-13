<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostsResource extends JsonResource
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
            'tags' => $this->tags->pluck('name'),
            'slug' => $this->slug,
            'title' => $this->title,
            'img' => $this->img ? $this->img : asset("/storage/{$this->img}"),
            'total_likes' => $this->likes->count(),
            'user_has_liked' => $request->user() ? $this->likes()->where('user_id', $request->user()->id)->exists() : false,
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
