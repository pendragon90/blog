<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            ["name" => "Pizza"],
            ["name" => "Burger"],
            ["name" => "Salad"],
            ["name" => "Pasta"],
            ["name" => "Sushi"],
            ["name" => "Ice Cream"],
            ["name" => "Cake"],
            ["name" => "Cookies"],
            ["name" => "Chips"],
            ["name" => "Popcorn"],
            ["name" => "Fruit"],
            ["name" => "Vegetables"],
            ["name" => "Smoothie"],
            ["name" => "Sandwich"],
            ["name" => "Soup"]
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}
