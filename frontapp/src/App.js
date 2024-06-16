//import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useMessage from "./hooks/useMessage";
import Navbar from "./components/Admin/navbar";
import Admin from "./components/Admin/admin";
import Productos from "./components/productos/productos";
import CrearProducto from "./components/productos/createProduct";
import DetalleProducto from "./components/productos/detalleproducto";
import EditarProducto from "./components/productos/editarproducto";
import Marcas from "./components/marcas/marcas";
import CrearMarca from "./components/marcas/crear.marca";
import DetalleMarca from "./components/marcas/detallemarca";
import EditarMarca from "./components/marcas/editarmarca";
import Categorias from "./components/categorias/categorias";
import CrearCategoria from "./components/categorias/crear.categoria";
import DetalleCategoria from "./components/categorias/detallecategoria";
import EditarCategoria from "./components/categorias/editarcategoria";
import TipoProductos from "./components/tipos/tipos.de.producto";
import CrearTipo from "./components/tipos/creartipo";
import DetalleTipo from "./components/tipos/detalletipo";
import EditarTipo from "./components/tipos/editartipo";
import Medidas from "./components/medidas.js/medidas";
import CrearMedida from "./components/medidas.js/crearmedida";
import DetalleMedida from "./components/medidas.js/detallemedida";
import EditarMedida from "./components/medidas.js/editarmedida";

function App() {
  const info = useMessage();

  return (
    <>
      <div className="container-navbar">
        <Navbar />
      </div>
      <div className="bg-home">
        <Router>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/productos" element={<Productos info={info} />} />
            <Route path="/crearproducto" element={<CrearProducto />} />
            <Route
              path="/detalleproducto/:id"
              element={<DetalleProducto info={info} />}
            />
            <Route path="/editarproducto/:id" element={<EditarProducto />} />
            <Route path="/marcas" element={<Marcas info={info} />} />
            <Route path="/crearmarca" element={<CrearMarca />} />
            <Route
              path="/detallemarca/:id"
              element={<DetalleMarca info={info} />}
            />
            <Route path="/editarmarca/:id" element={<EditarMarca />} />
            <Route path="/categorias" element={<Categorias info={info} />} />
            <Route path="/crearcategoria" element={<CrearCategoria />} />
            <Route
              path="/detallecategoria/:id"
              element={<DetalleCategoria info={info} />}
            />
            <Route path="/editarcategoria/:id" element={<EditarCategoria />} />
            <Route path="/tipos" element={<TipoProductos info={info} />} />
            <Route path="/creartipo" element={<CrearTipo />} />
            <Route
              path="/detalletipo/:id"
              element={<DetalleTipo info={info} />}
            />
            <Route path="/editartipo/:id" element={<EditarTipo />} />
            <Route path="/medidas" element={<Medidas info={info} />} />
            <Route path="/crearmedida" element={<CrearMedida />} />
            <Route
              path="/detallemedida/:id"
              element={<DetalleMedida info={info} />}
            />
            <Route path="/editarmedida/:id" element={<EditarMedida />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
