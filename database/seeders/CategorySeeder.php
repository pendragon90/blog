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
            ['name' => 'Makanan Ringan'],
            ['name' => 'Makanan Utama'],
            ['name' => 'Makanan Penutup'],
            ['name' => 'Minuman'],
            ['name' => 'Makanan Sehat']
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
