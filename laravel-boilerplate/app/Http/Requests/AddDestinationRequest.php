<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddDestinationRequest extends FormRequest
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
            'images' => 'array', // Make sure 'images' is set to an array
            'profile_image' => 'image|mimes:jpeg,png,jpg,gif|required', // Make sure 'images' is set to an array
        ];
    }
}
