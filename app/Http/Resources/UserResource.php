<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'date' => $this->created_at->format('j M Y'),
            'name' => $this->name,
            'role' => $this->role->name,
            'avatar' => 'https://i.pinimg.com/564x/ab/72/d6/ab72d6ccf809204bb00d95f26e239bdc.jpg',
            'slug' => $this->slug,
            'email' => $this->email,
        ];
    }
}
