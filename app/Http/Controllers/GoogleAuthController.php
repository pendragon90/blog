<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            $newUser = User::updateOrCreate([
                'google_id' => $googleUser->getId(),
                'name' => $googleUser->getName(),
                'password' => $googleUser->getName() . '-' . uniqid(),
                'email' => $googleUser->getEmail(),
                'slug' => $googleUser->getNickname(). '-' .$googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
            ]);

            Auth::login($newUser);
            session()->regenerate();

            return redirect()->intended('/');
        } else {
            Auth::login($user);
            session()->regenerate();
            return redirect()->intended('/');
        }
    }
}
