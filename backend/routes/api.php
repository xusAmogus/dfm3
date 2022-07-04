<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BacklogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WriteupController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', [AuthController::class, 'register']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/me', function(Request $request) {
        return auth()->user()->profile;
    });

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    //order is important...resource controllers overwrite expansions on resource controllers
    Route::get('backlogs/completed/{interval}', [BacklogController::class, 'completed']);
    Route::apiResource('backlogs', BacklogController::class);
    Route::get('profiles/profileExists/{id}',[ProfileController::class, 'profileExists']);
    Route::apiResource('profiles', ProfileController::class);
    Route::apiResource('writeups', WriteupController::class);
});