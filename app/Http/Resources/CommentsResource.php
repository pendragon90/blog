<?php

namespace App\Http\Resources;

use App\Models\ReplyComment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'author' => $this->authorDetails(), // Panggil metode authorDetails() dengan menggunakan $this
            'comment' => $this->comment,
           'total_replies' => ReplyComment::where('comment_id', $this->id)->count(),
            'replies' => ReplyCommentsResource::collection($this->replies()->latest()->get()),
        ];
    }

    // Pindahkan metode authorDetails() ke dalam kelas CommentsResource
    protected function authorDetails()
    {
        return [
            'name' => $this->user->name,
            'slug' => $this->user->slug,
            'avatar' => $this->user->avatar
        ];
    }
}
