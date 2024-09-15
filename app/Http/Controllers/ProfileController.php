<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Gender;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{
    private function uploadImage($image, $folderPath)
    {
        if ($image) {
            // Generate a filename
            $imageName = time() . '_' . $image->getClientOriginalName();
            $fullPath = $folderPath . '/' . $imageName;

            // Check if the image size is greater than 500KB (512000 bytes)
            if ($image->getSize() > 512000) {
                // Resize the image
                $img = Image::make($image);
                $img->resize(800, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });

                // Save the resized image to the specified folder
                Storage::disk('public')->makeDirectory($folderPath);
                $img->save(storage_path('app/public/' . $fullPath));
            } else {
                // Save the original image if it's not greater than 500KB
                Storage::disk('public')->makeDirectory($folderPath);
                $image->storeAs($folderPath, $imageName, 'public');
            }

            return $fullPath;
        }

        return null;
    }

    public function edit()
    {
        return inertia('Settings/ProfilePage', [
            'user' => new UserResource(Auth::user()),
            'genders' => Gender::get(),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'avatar' => 'nullable|image|max:2048',
            'birthday' => 'required|date',
            'gender' => 'required|string|exists:genders,slug',
        ]);

        // Handle avatar upload
        $monthYear = date('Y_m');
        $folderPath = 'images/avatar/' . $monthYear;
        $avatarPath = $this->uploadImage($request->file('avatar'), $folderPath);

        // Find the gender record
        $gender = Gender::where('slug', $request->gender)->first();

        // Update the user with validated data
        $user->update([
            'name' => $request->name,
            'avatar' => $avatarPath ?: $user->avatar, // Use existing avatar if no new image uploaded
            'birthday' => Carbon::parse($request->birthday),
            'gender_id' => $gender->id,
        ]);

        return redirect()->back()->with('success', 'Profile updated successfully');
    }
}
