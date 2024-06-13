<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function redirectGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackGoogle()
    {
        $googleUser = Socialite::driver('google')->user();
        $user = User::where('email', $googleUser->email)->first();

        if (!$user) {
            User::create([
                'name' => $googleUser->name,
                'email' => $googleUser->email,
                'password' => Hash::make(rand(100000, 999999))
            ]);

            return response()->json([
                'msg' => 'Successfully login',
            ], 200);
        } else {
            return response()->json([
                'token' => $user->createToken('session-token')->plainTextToken,
            ], 200);
        }
    }
}
