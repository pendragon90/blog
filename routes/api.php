<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ArticleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/articles/popular', [ArticleController::class, 'popularSide']);
Route::get('/articles/search', [ArticleController::class, 'search']);
