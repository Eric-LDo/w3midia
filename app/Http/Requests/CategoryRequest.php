<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{


    public function rules(): array
    {
        $categoryId = $this->route('category')?->id ?? null;

        return [
            'code' => ['required', 'string', 'max:20', 'unique:categories,code' . ($categoryId ? ",$categoryId" : '')],
            'name' => ['required', 'string', 'max:255'],

        ];
    }
}
