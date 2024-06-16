<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Catch_;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoria = Categoria::all();
        return response()->json($categoria);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'=>'required|string|max:255'
        ]);

        $categoria = new Categoria();
        $categoria->nombre = $request->nombre;

        $categoria->save();

        return response()->json($categoria,201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $categoria = Categoria::findOrFail($id);

        if (!$categoria) {
            return response()->noContent(404);
        }

        return response()->json($categoria);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre'=>'required|string|max:255'
        ]);

        $categoria = Categoria::find($id);

        if (!$categoria) {
            return response()->noContent(404);
        }

        try {
            $categoria->nombre = $request->nombre;
            $categoria->save();

            return response()->json($categoria);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $categoria = Categoria::find($id);
        if(!$categoria){
            return response()->noContent(404);
        }
        try {
            $categoria->delete();
            return response()->noContent(200);
        } catch (\Throwable $th) {
            return response()->json($th,500);
        }
    }
}