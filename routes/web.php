<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Dashboard\ArticleDashboardController;
use App\Http\Controllers\Dashboard\CategoryDashboardController;
use App\Http\Controllers\Dashboard\UserDashboardController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReplyCommentController;
use App\Http\Controllers\TagController;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile-edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{user}', [ProfileController::class, 'update'])->name('profile.update');

    // Other authenticated user routes
    Route::get('/articles-saved', [ArticleController::class, 'ArticlesSaved']);
    Route::post('/articles/{article}/like', [ArticleController::class, 'like']);
    Route::post('/articles/{article}/save', [ArticleController::class, 'save']);

    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
    Route::patch('/articles/{article}/comments/{comment}', [CommentController::class, 'update']);
    Route::delete('/articles/{article}/comments/{comment}', [CommentController::class, 'destroy']);

    Route::post('/articles/{article}/comments/{comment}', [ReplyCommentController::class, 'store']);
    Route::patch('/articles/{article}/comments/{comment}/replies/{reply}', [ReplyCommentController::class, 'update']);
    Route::delete('/articles/{article}/comments/{comment}/replies/{reply}', [ReplyCommentController::class, 'destroy']);
});

Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/articles', [ArticleDashboardController::class, 'index']);
    Route::post('/articles', [ArticleDashboardController::class, 'store']);
    Route::patch('/articles/{article}', [ArticleDashboardController::class, 'update']);
    Route::delete('/articles/{article}', [ArticleDashboardController::class, 'destroy']);

    Route::get('/categories', [CategoryDashboardController::class, 'index']);
    Route::post('/categories', [CategoryDashboardController::class, 'store']);
    Route::patch('/categories/{category}', [CategoryDashboardController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryDashboardController::class, 'destroy']);

    Route::get('/users', [UserDashboardController::class, 'index']);
    Route::post('/users', [UserDashboardController::class, 'store']);
    Route::patch('/users/{user}', [UserDashboardController::class, 'update']);
    Route::delete('/users/{user}', [UserDashboardController::class, 'destroy']);
});

// Public routes
Route::get('/', [ArticleController::class, 'latest']);
Route::get('/articles/popular', [ArticleController::class, 'popular']);
Route::get('/articles/top-like', [ArticleController::class, 'topLike']);
Route::get('/articles/categories/{category}', [ArticleController::class, 'ArticlesByCategory']);
Route::get('/articles/{article}', [ArticleController::class, 'show']);

// Comment routes
Route::get('/articles/{article}/comments', [CommentController::class, 'index']);
Route::get('/articles/{article}/comments/{comment}/replies', [ReplyCommentController::class, 'index']);

// Authentication routes
require __DIR__ . '/auth.php';
