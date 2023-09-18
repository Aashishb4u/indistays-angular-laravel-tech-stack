<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CampingController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\CustomPricingController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\UserController;
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
    Route::get('refresh-tokens', [AuthController::class, 'refresh']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('reset-password', [AuthController::class, 'changePassword']);
});

Route::prefix('v1')->middleware('auth.check')->group(function () {

    // User APIs

    Route::get('users', [UserController::class, 'paginate']);
    Route::post('users', [UserController::class, 'store']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::post('users/all', [UserController::class, 'index']);

    Route::get('profile', [AuthController::class, 'profile']);
    Route::get('roles', [UserController::class, 'getUserRoles']);


    // Destinations APIs
    Route::get('destinations', [DestinationController::class, 'paginate']);
    Route::post('destinations', [DestinationController::class, 'addDestination']);

    // laravel is having bug that formData does not work with put or patch method.
    // In laravel, put method is not by default working with formData
    // so we need to use post method here
    Route::post('destinations/edit/{id}', [DestinationController::class, 'editDestination']);
    Route::delete('destinations/{id}', [DestinationController::class, 'deleteDestination']);
    Route::post('destinations/all', [DestinationController::class, 'index']);

    // Campings API
    Route::get('campings', [CampingController::class, 'paginate']);
    Route::post('campings', [CampingController::class, 'addCamping']);
    Route::post('campings/edit/{id}', [CampingController::class, 'editCamping'])
        ->where('id', '[0-9]+');
    Route::delete('campings/{id}', [CampingController::class, 'deleteCamping']);
    Route::post('campings/all', [CampingController::class, 'index']);

    // Accommodations API
    Route::get('accommodations', [AccommodationController::class, 'getAccommodationsData']);
    Route::post('accommodations', [AccommodationController::class, 'addAccommodation']);
    Route::put('accommodations/{id}', [AccommodationController::class, 'editAccommodation'])
        ->where('id', '[0-9]+');
    Route::delete('accommodations/{id}', [AccommodationController::class, 'deleteAccommodation']);
    Route::get('accommodations/all', [AccommodationController::class, 'getAllAccommodationsData']);

    // Custom Pricings API
    Route::get('custom-pricing', [CustomPricingController::class, 'getCustomPricings']);
    Route::post('custom-pricing', [CustomPricingController::class, 'addCustomPricing']);
    Route::put('custom-pricing/{id}', [CustomPricingController::class, 'editCustomPricing'])
        ->where('id', '[0-9]+');
    Route::delete('custom-pricing/{id}', [CustomPricingController::class, 'deleteCustomPricing']);
    Route::get('custom-pricing/all', [CustomPricingController::class, 'getAllCustomPricings']);

    // Custom Bookings API
    Route::get('bookings', [BookingController::class, 'getAllBookings']);
    Route::get('bookings-paginate', [BookingController::class, 'getBookings']);
    Route::post('bookings', [BookingController::class, 'addBooking']);
    Route::put('bookings/{id}', [BookingController::class, 'editBooking']);
    Route::delete('bookings/{id}', [BookingController::class, 'deleteBooking']);


    // Amenities APIs
    Route::post('amenities/all', [AmenityController::class, 'index']);

    // upload Images
    Route::post('upload-images/{entity}', [ImageController::class, 'uploadImages']);
    Route::post('upload-profile-image/{entity}/{id}', [ImageController::class, 'uploadProfileImage']);


    // Other v1 authenticated routes go here
});
