<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => random_int(1, 3),
            'category_id' => random_int(1, 4),
            'slug' => fake()->name(5) . '_' . uniqid(),
            'title' => fake()->name(100),
            'img' => "https://i.pinimg.com/736x/f1/20/1c/f1201cd50f13487379e0329ad85b3694.jpg",
            'body' => fake()->paragraphs(5, true)
        ];
    }
}
