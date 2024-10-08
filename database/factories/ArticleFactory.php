<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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
        // Define the start and end date range for the factory
        $startDate = Carbon::create(2024, 1, 1); // January 1, 2024
        $endDate = Carbon::create(2024, 6, 30); // June 30, 2024
        
        return [
            'user_id' => random_int(1, 3),
            'category_id' => random_int(1, 4),
            'slug' => fake()->name(5) . '_' . uniqid(),
            'title' => fake()->name(100),
            'img' => "https://i.pinimg.com/736x/f1/20/1c/f1201cd50f13487379e0329ad85b3694.jpg",
            'body' => fake()->paragraphs(5, true),
            // Generate a created_at date within the specified range
            'created_at' => fake()->dateTimeBetween($startDate, $endDate),
            'updated_at' => now(),
        ];
    }
}
