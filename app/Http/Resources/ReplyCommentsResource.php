<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReplyCommentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'author' => $this->authorDetails(), // Panggil metode authorDetails() dengan menggunakan $this
            'comment' => $this->comment,
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
