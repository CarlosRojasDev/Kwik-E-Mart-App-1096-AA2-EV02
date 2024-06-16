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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_categoria');            
            $table->unsignedBigInteger('id_tipoProducto');            
            $table->unsignedBigInteger('id_marca');            
            $table->unsignedBigInteger('id_unidadMedida');            
            $table->double('precio',8,2);
            $table->string('estado');
            $table->integer('stock');
            $table->integer('vendidos');
            $table->timestamps();

            $table->foreign('id_categoria')->references('id')->on('categorias');
            $table->foreign('id_tipoProducto')->references('id')->on('tipo_productos');
            $table->foreign('id_marca')->references('id')->on('marcas');
            $table->foreign('id_unidadMedida')->references('id')->on('unidad_medidas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
