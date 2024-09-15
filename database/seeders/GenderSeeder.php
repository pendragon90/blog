<?php

namespace Database\Seeders;

use App\Models\Gender;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $genders = [
            ['name' => 'Male', 'slug' => 'male'],
            ['name' => 'Female', 'slug' => 'female'],
        ];

        foreach ($genders as $gender) {
            Gender::create($gender);
        }
    }
}
