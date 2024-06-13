<?php

namespace App\Http\Resources\Dashboard;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostDashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'status' => $this->status->name,
            'user_name' => $this->user->name,
            'category' => $this->category->name,
            'tags' => $this->tags->pluck('name'),
            'slug' => $this->slug,
            'title' => $this->title,
        ];
    }
}
