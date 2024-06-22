<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Makanan Ringan', 'slug' => 'makanan-ringan'],
            ['name' => 'Makanan Utama','slug' => 'makanan-utama'],
            ['name' => 'Makanan Penutup','slug' => 'makanan-penutup'],
            ['name' => 'Minuman','slug' => 'minuman'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
