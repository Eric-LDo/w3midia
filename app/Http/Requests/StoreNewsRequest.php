<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewsRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'summary' => 'nullable|string',
            'description' => 'nullable|string',
            'image' => 'nullable|string', // path/url returned by upload
            'status' => 'nullable|boolean',
            'category_id' => 'nullable|exists:categories,id',
        ];
    }
}
