<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImageUploadRequest extends FormRequest
{
    public function rules()
    {
        return [
            'image' => 'required|image|max:4096', // até 4mb
        ];
    }

    public function authorize()
    {
        return true;
    }
}
