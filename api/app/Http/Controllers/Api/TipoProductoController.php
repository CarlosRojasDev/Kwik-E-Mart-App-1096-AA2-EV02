<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TipoProducto;
use Illuminate\Http\Request;

class TipoProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tipos = TipoProducto::all();
        return response()->json($tipos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'=>'required|string|max:255',
        ]);

        $tipo = new TipoProducto();
        $tipo->tipo = $request->nombre;

        $tipo->save();

        return response()->json($tipo,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tipo = TipoProducto::find($id);
        if (!$tipo) {
            return response()->noContent(404);
        }
        return response()->json($tipo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre'=>'required|string|max:255'
        ]); 

        $tipo = TipoProducto::findOrFail($id);
        if (!$tipo) {
            return response()->noContent(404);
        }
        try {
            $tipo->tipo = $request->nombre;
            $tipo->save();

            return response()->json($tipo);

        } catch (\Throwable $th) {
            return response()->json($th,500);
        }      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tipo = TipoProducto::find($id);

        if(!$tipo){
            return response()->noContent(404);
        }        
        try {
            $tipo->delete();
            return response()->noContent(200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }
}
