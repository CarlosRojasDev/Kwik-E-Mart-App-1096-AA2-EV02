<?php

use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\MarcaController;
use App\Http\Controllers\Api\TipoProductoController;
use App\Http\Controllers\Api\UnidadMedidaController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('/productos',ProductController::class)->only(
    ['index','store','show','update','destroy']
);

Route::get('/csrf_token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});

Route::resource('/marcas',MarcaController::class)->only(
    ['index','store','show','update','destroy']
);

Route::resource('/categorias',CategoriaController::class)->only(
    ['index','store','show','update','destroy']
);

Route::resource('/tipos',TipoProductoController::class)->only(
    ['index','store','show','update','destroy']
);

Route::resource('/medidas',UnidadMedidaController::class)->only(
    ['index','store','show','update','destroy']
);

// Route::options('/{any}', function (Request $request) {
//     return response()->json([], 200);
// })->where('any', '.*');