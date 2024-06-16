<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with(['categoria','tipo','marca','medida'])->get();
        return $products;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'categoria' => 'required|integer|exists:categorias,id',            
            'tipo' => 'required|integer|exists:tipo_productos,id',
            'marca' => 'required|integer|exists:marcas,id',
            'medida' => 'required|integer|exists:unidad_medidas,id',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|string|max:50',
            'stock' => 'required|integer|min:0',
            'vendidos' => 'required|integer|min:0'
        ]);
        $producto = new Product();
        $producto->nombre = $request->nombre;
        $producto->id_categoria = $request->categoria;
        $producto->id_tipoProducto = $request->tipo;
        $producto->id_marca = $request->marca;
        $producto->id_unidadMedida = $request->medida;
        $producto->precio = $request->precio;
        $producto->estado = $request->estado;
        $producto->stock = $request->stock;
        $producto->vendidos = $request->vendidos;

        $producto->save();

        return response()->json(['message'=>'Registro almacenado'],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $producto = Product::with(['categoria','tipo','marca','medida'])->find($id);
        if (!$producto) {
            return response()->json(['message'=>'Registro no encontrado'],404);
        }
        return response()->json($producto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:100',
            'categoria' => 'required|integer|exists:categorias,id',
            'tipo' => 'required|integer|exists:tipo_productos,id',
            'marca' => 'required|integer|exists:marcas,id',
            'medida' => 'required|integer|exists:unidad_medidas,id',
            'precio' => 'required|numeric|min:0',
            'estado' => 'required|string|max:50',
            'stock' => 'required|integer|min:0',
            'vendidos' => 'required|integer|min:0'
        ]);
        $producto = Product::find($id);
        if (!$producto) {
            return response()->json(['message'=>'Registro no encontrado'], 404);
        }
        try {
            $producto->nombre = $request->nombre;
            $producto->id_categoria = $request->categoria;
            $producto->id_tipoProducto = $request->tipo;
            $producto->id_marca = $request->marca;
            $producto->id_unidadMedida = $request->medida;
            $producto->precio = $request->precio;
            $producto->estado = $request->estado;
            $producto->stock = $request->stock;
            $producto->vendidos = $request->vendidos;

            $producto->save();

            return response()->json(['message'=>'Registro actualizado'],200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $producto = Product::find($id);
        if (!$producto) {
            return response()->json(['message'=>'Registro no encontrado'], 404);
        }
        try {
            $producto->delete();
            return response()->json(['message'=>'Registro eliminado'],200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }
}
