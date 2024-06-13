<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            ['name' => 'daffa','avatar' => 'https://i.pinimg.com/564x/ab/72/d6/ab72d6ccf809204bb00d95f26e239bdc.jpg', 'role_id' => 1, 'slug' => 'daffa123', 'password' => Hash::make('daffa123'), 'email' => 'daffa@gmail.com'],
            ['name' => 'budi', 'slug' => 'budi123', 'password' => Hash::make('budi123'), 'email' => 'budi@gmail.com'],
            ['name' => 'john', 'slug' => 'john123', 'password' => Hash::make('john123'), 'email' => 'john@gmail.com'],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
