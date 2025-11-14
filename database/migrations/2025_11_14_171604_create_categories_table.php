<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            // SQLite não suporta alterar tipo diretamente
            // mas se estiver usando MySQL, vai funcionar
            $table->string('id')->change();
        });
    }

    public function down(): void
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->uuid('id')->change(); // volta ao original
        });
    }
};

