<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'id_categoria',
        'id_tipoProducto',
        'id_marca',
        'id_unidadMedida',
        'precio',
        'estado',
        'stock',
        'vendidos'
    ];

    public function categoria(){
        return $this->belongsTo(Categoria::class,'id_categoria');
    }

    public function tipo(){
        return $this->belongsTo(TipoProducto::class,'id_tipoProducto');
    }

    public function marca(){
        return $this->belongsTo(Marca::class,'id_marca');
    }

    public function medida(){
        return $this->belongsTo(UnidadMedida::class,'id_unidadMedida');
    }
}
