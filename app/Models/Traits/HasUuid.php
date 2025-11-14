<?php

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait HasUuid
{
    protected static function bootHasUuid()
    {
        static::creating(function ($model) {
            if (! $model->getKey()) {
                $model->{$model->getKeyName()} = Str::uuid()->toString();
            }
        });
    }

    public function initializeHasUuid()
    {
        $this->keyType = 'string';
        $this->incrementing = false;
    }
}
