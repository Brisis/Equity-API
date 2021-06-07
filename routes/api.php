<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Api\CurrencyController;
use App\Http\Controllers\Api\PriceController;
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

//Public Routes
Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
Route::get('/currencies', [CurrencyController::class, 'index']);
Route::get('/curuser', [LoginController::class, 'getuser']);
Route::get('/currencies/{id}', [CurrencyController::class, 'show']);
Route::get('/pair/{name}', [CurrencyController::class, 'getpairs']);

//Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::post('/me', [LoginController::class, 'me']);
    Route::post('/currencies', [CurrencyController::class, 'store']);
    Route::put('/currencies/{id}', [CurrencyController::class, 'update']);
    Route::delete('/currencies/{id}', [CurrencyController::class, 'destroy']);

    Route::post('/prices', [PriceController::class, 'store']);
    Route::post('/logout', [LoginController::class, 'logout']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
