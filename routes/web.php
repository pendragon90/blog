<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyCommentController;
use App\Http\Controllers\TagController;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
// Route::get('/google/redirect', [GoogleAuthController::class, 'redirectGoogle']);
// Route::get('/google/callback', [GoogleAuthController::class, 'callbackGoogle']);


    Route::get('/', [PostController::class, 'latest']);
    Route::get('/posts-popular', [PostController::class, 'popular']);
    Route::get('/top-like-posts', [PostController::class, 'topLike']);
    Route::get('/posts-top-like', [PostController::class, 'topLike']);
    Route::get('/posts/categories/{category}', [PostController::class, 'postsByCategory']);
  
    Route::get('/posts/{post}', [PostController::class, 'show']);



    Route::get('/posts/{post}/comments', [CommentController::class, 'index']);

  

    Route::get('/posts/{post}/comments/{comment}/replies', [ReplyCommentController::class, 'index']);

Route::middleware(['auth'])->group(function () {
    Route::get('/posts-saved', [PostController::class, 'postsSaved']);
    Route::post('/posts', [PostController::class, 'store']);
    Route::patch('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
    
    Route::post('/posts/{post}/like', [PostController::class, 'like']);
    Route::post('/posts/{post}/save', [PostController::class, 'save']);

    Route::post('/posts/{post}/comments', [CommentController::class, 'store']);
    Route::patch('/posts/{post}/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/posts/{post}/comments/{comment}', [CommentController::class, 'destroy']);

    Route::post('/posts/{post}/comments/{comment}', [ReplyCommentController::class, 'store']);
    Route::patch('/posts/{post}/comments/{comment}/replies/{reply}', [ReplyCommentController::class, 'update']);
    Route::delete('/posts/{post}/comments/{comment}/replies/{reply}', [ReplyCommentController::class, 'destroy']);

    Route::get('/dashboard/posts', [DashboardController::class, 'index']);
    Route::get('/dashboard/posts/pending', [DashboardController::class, 'pendingPosts']);
});

Route::middleware(['isAdmin'])->prefix('/v1')->group(function () {
    Route::patch('/posts/dashboard/status/{post}', [DashboardController::class, 'changeStatus']);

    Route::post('/categories', [CategoryController::class, 'store']);
    Route::patch('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
});


require __DIR__.'/auth.php';
