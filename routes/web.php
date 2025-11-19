<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NewsController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');



Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/home', function () {
        return Inertia::render('home');
    })->name('homepage');

    // Página Category (Inertia)
    Route::get('/category', [CategoryController::class, 'page'])
        ->name('category');

    // Página News (Inertia)
    Route::get('/news', [NewsController::class, 'page'])
        ->name('news');

    // Upload de imagem
    Route::post('/upload-image', [ImageController::class, 'store']);

});


Route::middleware(['auth', 'verified'])->prefix('api')->group(function () {
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::get('/categories', [CategoryController::class, 'show']);
    Route::put('/categories/{category}', [CategoryController::class, 'update']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);
    Route::get('/categories/my', [CategoryController::class, 'myCategories']);




    Route::get('/news', [NewsController::class, 'index']);
    Route::post('/news', [NewsController::class, 'store']);
    Route::get('/news/{news}', [NewsController::class, 'show']);
    Route::put('/news/{news}', [NewsController::class, 'update']);
    Route::delete('/news/{news}', [NewsController::class, 'destroy']);
});

require __DIR__.'/settings.php';
