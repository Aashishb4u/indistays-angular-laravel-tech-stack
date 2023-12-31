<?php

use App\Http\Controllers\AccommodationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CampingController;
use App\Http\Controllers\AmenityController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\CustomPricingController;
use App\Http\Controllers\CustomerReviewController;
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
    'prefix' => 'all' // Adding the 'auth' prefix
], function ($router) {
    Route::post('destinations', [DestinationController::class, 'index']);
    Route::post('camping', [CampingController::class, 'index']);
    Route::post('accommodations', [AccommodationController::class, 'index']);
    Route::post('custom-pricing', [CustomPricingController::class, 'index']);
    Route::post('amenities', [AmenityController::class, 'index']);
    Route::post('assets', [AssetController::class, 'index']);
    Route::post('reviews', [CustomerReviewController::class, 'index']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'make' // Adding the 'auth' prefix
], function ($router) {
    Route::post('online-booking', [BookingController::class, 'addWebsiteBooking']);
    Route::post('enquiry', [BookingController::class, 'makeEnquiry']);
    Route::post('review', [CustomerReviewController::class, 'addCustomerReview']);
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
    Route::get('accommodations', [AccommodationController::class, 'paginate']);
    Route::post('accommodations', [AccommodationController::class, 'addAccommodation']);
    Route::post('accommodations/edit/{id}', [AccommodationController::class, 'editAccommodation'])
        ->where('id', '[0-9]+');
    Route::delete('accommodations/{id}', [AccommodationController::class, 'deleteAccommodation']);
    Route::post('accommodations/all', [AccommodationController::class, 'index']);

    // Custom Pricings API
    Route::get('custom-pricing', [CustomPricingController::class, 'paginate']);
    Route::post('custom-pricing', [CustomPricingController::class, 'addCustomPricing']);
    Route::put('custom-pricing/{id}', [CustomPricingController::class, 'editCustomPricing'])
        ->where('id', '[0-9]+');
    Route::delete('custom-pricing/{id}', [CustomPricingController::class, 'deleteCustomPricing']);
    Route::post('custom-pricing/all', [CustomPricingController::class, 'index']);

    // Custom Bookings API
    Route::get('custom-booking', [BookingController::class, 'paginate']);
    Route::post('custom-booking', [BookingController::class, 'addCustomBooking']);
    Route::put('custom-booking/{id}', [BookingController::class, 'editCustomBooking'])
        ->where('id', '[0-9]+');
    Route::delete('custom-booking/{id}', [BookingController::class, 'deleteCustomBooking']);
    Route::post('custom-booking/all', [BookingController::class, 'index']);

    Route::get('enquiries', [BookingController::class, 'paginateEnquiries']);

    // Amenities APIs
    Route::post('amenities/all', [AmenityController::class, 'index']);

    // upload Images
    Route::post('upload-images/{entity}', [ImageController::class, 'uploadImages']);
    Route::post('upload-profile-image/{entity}/{id}', [ImageController::class, 'uploadProfileImage']);

    Route::get('assets', [AssetController::class, 'paginate']);
    Route::post('assets', [AssetController::class, 'addAsset']);
    Route::post('assets/edit/{id}', [AssetController::class, 'editAsset'])
    ->where('id', '[0-9]+');
    Route::delete('assets/{id}', [AssetController::class, 'deleteAsset']);
    // Other v1 authenticated routes go here
});
