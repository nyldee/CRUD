<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BukuController;
use App\Http\Controllers\RegisterController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

// Route test API
Route::get('/test', function (Request $request) {
    return response()->json("Test OK", 200);
});

// Route user API dengan middleware sanctum
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Rute dengan middleware sanctum
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/logout', [RegisterController::class, 'logout']);

    Route::controller(BukuController::class)->group(function(){
        Route::get('/book/buku', 'index');
        Route::post('/book/store', 'store');
        Route::get('/book/show/{id}', 'show');
        Route::post('/book/update', 'update');
        Route::get('/book/delete/{id}', 'destroy');
    });
});

// Route register API
Route::post('/register', [RegisterController::class, 'register']);

// Route login API
Route::post('/login', [RegisterController::class, 'login']);

// Route logout API dengan middleware sanctum
Route::post('/logout', [RegisterController::class, 'logout'])->middleware([
    'auth:sanctum',
    EnsureFrontendRequestsAreStateful::class,
]);
