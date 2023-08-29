<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\CampingController;
use App\Http\Controllers\CustomPricingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use \App\Http\Controllers\DestinationController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth' // Adding the 'auth' prefix
], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('refresh', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::prefix('v1')->middleware('auth.check')->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);

    // Destinations APIs
    Route::get('destinations', [DestinationController::class, 'getDestinationsData']);
    Route::post('destinations', [DestinationController::class, 'addDestination']);
    Route::put('destinations/{id}', [DestinationController::class, 'editDestination'])
        ->where('id', '[0-9]+');
    Route::delete('destinations/{id}', [DestinationController::class, 'deleteDestination']);
    Route::get('destinations/all', [DestinationController::class, 'getAllDestinationsData']);

    // Campings API

    Route::get('campings', [CampingController::class, 'getCampingsData']);
    Route::post('campings', [CampingController::class, 'addCamping']);
    Route::put('campings/{id}', [CampingController::class, 'editCamping'])
        ->where('id', '[0-9]+');
    Route::delete('campings/{id}', [CampingController::class, 'deleteCamping']);
    Route::get('campings/all', [CampingController::class, 'getAllCampingsData']);


    // Campings API

    Route::get('accommodations', [AccommodationController::class, 'getAccommodationsData']);
    Route::post('accommodations', [AccommodationController::class, 'addAccommodation']);
    Route::put('accommodations/{id}', [AccommodationController::class, 'editAccommodation'])
        ->where('id', '[0-9]+');
    Route::delete('accommodations/{id}', [AccommodationController::class, 'deleteAccommodation']);
    Route::get('accommodations/all', [AccommodationController::class, 'getAllAccommodationsData']);

    // Custome Pricings API

    Route::get('custom-pricing', [CustomPricingController::class, 'getCustomPricings']);
    Route::post('custom-pricing', [CustomPricingController::class, 'addCustomPricing']);
    Route::put('custom-pricing/{id}', [CustomPricingController::class, 'editCustomPricing'])
        ->where('id', '[0-9]+');
    Route::delete('custom-pricing/{id}', [CustomPricingController::class, 'deleteCustomPricing']);
    Route::get('custom-pricing/all', [CustomPricingController::class, 'getAllCustomPricings']);



    // Other v1 authenticated routes go here
});
