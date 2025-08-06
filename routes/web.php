<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main attendance management on home page
Route::controller(AttendanceController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/attendance', 'index')->name('attendance.index');
    Route::post('/attendance', 'store')->name('attendance.store');
});

// Student management routes
Route::resource('students', StudentController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
