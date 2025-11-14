<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid('id')->primary(); // chave primária UUID

            $table->string('code', 10)->nullable(); // código ex: ABC
            $table->string('name'); // nome da categoria

            $table->foreignId('user_id')
                  ->constrained()
                  ->cascadeOnDelete(); // quando deletar o user, apaga as categorias

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
