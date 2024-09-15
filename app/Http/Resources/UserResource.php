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
            'birthday' => $this->birthday ? $this->birthday->format('j M Y') : null,
            'name' => $this->name,
            'gender' => $this->gender ? [
                'name' => $this->gender->name,
                'slug' => $this->gender->slug,
            ] : null,
            'role' => $this->role->name,
            'avatar' => $this->avatar ? $this->avatar : null,
            'slug' => $this->slug,
            'email' => $this->email,
        ];
    }
}
