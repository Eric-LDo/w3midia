<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ImageController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', function () {
        return Inertia::render('home');
    })->name('homepage');
});
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('news', function () {
        return Inertia::render('news');
    })->name('news');
});

Route::post('/upload-image', [ImageController::class, 'store']);

require __DIR__.'/settings.php';
