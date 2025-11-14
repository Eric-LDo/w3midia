<?php

namespace App\Http\Controllers;

use App\Http\Requests\ImageUploadRequest;
use App\Http\Services\ImageService;
use App\Models\UserImage;

class ImageController extends Controller
{
    protected $service;

    public function __construct(ImageService $service)
    {
        $this->service = $service;
    }

    public function store(ImageUploadRequest $request)
    {
        $file = $request->file('image');

        // Processa e obtém o path comprimido
        $path = $this->service->uploadAndCompress($file);

        // Salva no banco (opcional)
        // UserImage::create(['path' => $path]);

        return response()->json([
            'path' => $path,
            'url' => asset("storage/{$path}")
        ]);
    }
}
