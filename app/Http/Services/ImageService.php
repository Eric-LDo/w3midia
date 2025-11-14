<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\Storage;
use Imagick;

class ImageService
{
    public function uploadAndCompress($file)
    {
        
        // Conteúdo original do arquivo

        $originalContents = file_get_contents($file->getRealPath());

        // Tentar usar Imagick para converter/comprimir quando disponível
        if (class_exists('\\Imagick')) {
            try {
                $imagick = new \Imagick();
                $imagick->readImageBlob($originalContents);

                // Tentar converter para WebP (se suportado) para reduzir tamanho
                try {
                    $imagick->setImageFormat('webp');
                    // qualidade 70 (ajuste se quiser)
                    $imagick->setImageCompressionQuality(70);
                    $contentsToSave = $imagick->getImageBlob();
                    $filename = uniqid() . '.webp';
                } catch (\Exception $e) {
                    // Se conversão para webp falhar, salva o blob no formato original
                    $contentsToSave = $imagick->getImageBlob();
                    // tentar obter extensão original do mime/type
                    $format = strtolower($imagick->getImageFormat() ?? 'bin');
                    $filename = uniqid() . '.' . $format;
                }

                // Limpa recurso
                $imagick->clear();
                $imagick->destroy();

                Storage::disk('public')->put("uploads/{$filename}", $contentsToSave);
                return "uploads/{$filename}";
            } catch (\Exception $e) {
                // Se Imagick falhar por qualquer motivo, caímos para salvar o original abaixo
            }
        }

        // Fallback: salvar o arquivo original (sem conversão)
        $originalExt = $file->getClientOriginalExtension() ?: 'bin';
        $filename = uniqid() . '.' . $originalExt;
        Storage::disk('public')->put("uploads/{$filename}", $originalContents);
        return "uploads/{$filename}";
    }
}
