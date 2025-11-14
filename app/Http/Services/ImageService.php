<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Storage;

class ImageService
{
    public function uploadAndCompress($file)
    {
        $imageData = file_get_contents($file->getRealPath());
        $image = imagecreatefromstring($imageData);

        if (! $image) {
            throw new \Exception('Erro ao processar a imagem.');
        }

        // Converte para WebP comprimido
        ob_start();
        imagewebp($image, null, 70);
        $compressedImage = ob_get_clean();

        // Nome único
        $filename = uniqid() . '.webp';

        // Salva em storage/app/public/uploads
        Storage::disk('public')->put("uploads/{$filename}", $compressedImage);

        // Retorna apenas o path relativo
        return "uploads/{$filename}";
    }
}
