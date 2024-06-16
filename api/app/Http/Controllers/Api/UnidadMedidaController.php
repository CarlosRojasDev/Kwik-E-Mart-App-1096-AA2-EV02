<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnidadMedida;
use Illuminate\Http\Request;

class UnidadMedidaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medidas = UnidadMedida::all();
        return response()->json($medidas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'=>'required|string|max:255',
        ]);

        $medida = new UnidadMedida();
        $medida->unidad = $request->nombre;

        $medida->save();

        return response()->json($medida,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $medida = UnidadMedida::find($id);
        if (!$medida) {
            return response()->noContent(404);
        }
        return response()->json($medida);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        $request->validate([
            'nombre'=>'required|string|max:255'
        ]); 

        $medida = UnidadMedida::findOrFail($id);
        if (!$medida) {
            return response()->noContent(404);
        }
        try {
            $medida->unidad = $request->nombre;
            $medida->save();

            return response()->json($medida);

        } catch (\Throwable $th) {
            return response()->json($th,500);
        }                
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $medida = UnidadMedida::find($id);

        if(!$medida){
            return response()->noContent(404);
        }        
        try {
            $medida->delete();
            return response()->noContent(200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }
}