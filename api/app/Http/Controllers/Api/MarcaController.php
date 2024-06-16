<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Marca;
use Illuminate\Support\Facades\Log; 

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $marcas = Marca::all();
        return response()->json($marcas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'=>'required|string|max:255',
        ]);

        $marca = new Marca();
        $marca->nombre = $request->nombre;

        $marca->save();

        return response()->json($marca,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $marca = Marca::find($id);
        if (!$marca) {
            return response()->noContent(404);
        }
        return response()->json($marca);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {   
        $request->validate([
            'nombre'=>'required|string|max:255'
        ]); 

        $marca = Marca::findOrFail($id);
        if (!$marca) {
            return response()->noContent(404);
        }
        try {
            $marca->nombre = $request->nombre;
            $marca->save();

            return response()->json($marca);

        } catch (\Throwable $th) {
            return response()->json($th,500);
        }                
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $marca = Marca::find($id);

        if(!$marca){
            return response()->noContent(404);
        }        
        try {
            $marca->delete();
            return response()->noContent(200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }
}