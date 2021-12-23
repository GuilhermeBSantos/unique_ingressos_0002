<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/user/list', [UserController::class, 'index']);

Route::post('/user/store', [UserController::class, 'store']);
Route::post('/user/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/ticket/list', [TicketController::class, 'index']);
Route::middleware('auth:sanctum')->post('/ticket/purchase', [TicketController::class, 'purchase']);

Route::middleware('auth:sanctum')->get('/ticket/my_sales', [TicketController::class, 'my_sales']);