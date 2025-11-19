<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'code',
        'name',
        'user_id',
    ];

    protected $casts = [
        'id' => 'string',
        'user_id' => 'integer',
    ];

    /**
     * Gera UUID e CODE automaticamente
     */
    protected static function booted()
    {
        static::creating(function (Category $category) {

            // UUID
            if (empty($category->id)) {
                $category->id = (string) Str::uuid();
            }

            // CODE baseado no nome
            if (empty($category->code) && !empty($category->name)) {
                $category->code = self::generateCode($category->name);
            }

            // Garantir user_id
            // if (empty($category->user_id) && auth()->check()) {
            //     $category->user_id = auth()->id();
            // }
        });

        static::updating(function (Category $category) {

            
            if ($category->isDirty('name')) {
                $category->code = self::generateCode($category->name);
            }
        });
    }

    /**
     * Função segura para gerar o CODE
     */
    public static function generateCode(string $name): string
    {
        $normalized = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        $normalized = preg_replace('/[^a-zA-Z]/', '', $normalized);
        $code = strtoupper(substr($normalized, 0, 3));
        return str_pad($code, 3, 'X');
    }

    /**
     * Relations
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function news()
    {
        return $this->hasMany(News::class);
    }
}
