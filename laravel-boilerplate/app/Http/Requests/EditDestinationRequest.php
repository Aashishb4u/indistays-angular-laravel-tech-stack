<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditDestinationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string',
            'profile_image' => 'image|mimes:jpeg,png,jpg,gif',
            'image_ids_to_update' => 'array',
            'edited_images.*' => 'image|mimes:jpeg,png,gif',
        ];
    }
}
