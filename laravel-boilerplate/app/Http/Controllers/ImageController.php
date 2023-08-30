<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Accommodation;
use App\Models\Destination;
use App\Models\Camping;
use App\Models\Image;

class ImageController extends Controller
{
    public function uploadImages(Request $request, $entity)
    {
        $model = null;
        $prefix = '';

        // Determine the model and prefix based on the entity
        switch ($entity) {
            case 'accommodations':
                $model = Accommodation::class;
                $prefix = 'accommodation';
                break;
            case 'destinations':
                $model = Destination::class;
                $prefix = 'destination';
                break;
            case 'campings':
                $model = Camping::class;
                $prefix = 'camping';
                break;
            default:
                return response()->json(['message' => 'Invalid entity'], 400);
        }

        // Upload and associate images with custom file names
        $images = [];
        foreach ($request->file('images') as $imageFile) {
            $fileName = $prefix . '-' . Str::random(10) . '.' . $imageFile->getClientOriginalExtension();
            $path = $imageFile->storeAs('entity_images/' . $entity, $fileName, 'public'); // Store image in public/storage
            $images[] = ['url' => $path];
        }

        $imagesCollection = Image::insert($images);

        // Morph and associate images with the specific entity
        $morphedImages = $imagesCollection->map(function ($image) use ($model) {
            return new $model(['image_id' => $image->id]);
        });

        $model::insert($morphedImages->toArray());

        return response()->json(['message' => 'Images uploaded and associated successfully']);
    }

    public function uploadProfileImage(Request $request, $entity, $id)
    {
        $model = null;
        $prefix = '';

        // Determine the model and prefix based on the entity
        switch ($entity) {
            case 'accommodations':
                $model = Accommodation::class;
                $prefix = 'accommodation';
                break;
            case 'destinations':
                $model = Destination::class;
                $prefix = 'destination';
                break;
            case 'campings':
                $model = Camping::class;
                $prefix = 'camping';
                break;
            default:
                return response()->json(['message' => 'Invalid entity'], 400);
        }

        $entityInstance = $model::findOrFail($id);

        // Upload the profile image with custom file name
        $imageFile = $request->file('image');
        $fileName = $prefix . '-' . $id . '.' . $imageFile->getClientOriginalExtension();
        $path = $imageFile->storeAs('profile_images/' . $entity, $fileName, 'public'); // Store image in public/storage

        // Create and associate the image with the entity
        $image = Image::create(['url' => $path, 'is_profile_image' => true]);
        $entityInstance->images()->save($image);

        return response()->json(['message' => 'Profile image uploaded and associated successfully']);
    }
}
