import productos from "../../assets/productos.jpg";
import marcas from "../../assets/marcas.jpg";
import categorias from "../../assets/categorias.png";
import tipos from "../../assets/tipos.jpg";
import medidas from "../../assets/medidas.png";
import useBackground from "../../hooks/useBackground";

export default function Admin() {
  useBackground("bg-kem");
  return (
    <div className="container bg-opc mb-3">
      <h2 className="text-center text-white">Administrar inventario</h2>
      <div className="cards">
        <a href="/productos">
          <div className="card" style={{ width: "18rem" }}>
            <img src={productos} className="card-img-top" alt={"productos"} />
            <div className="card-body">
              <h5 className="card-title text-center">Productos</h5>
              <p className="card-text">
                Aquí podrás ver y administrar la información de productos: crear
                productos, editar, eliminar, stock, gestionar disponibilidad y
                más.
              </p>
            </div>
          </div>
        </a>

        <a href="/Marcas">
          <div className="card" style={{ width: "18rem" }}>
            <img src={marcas} className="card-img-top" alt={"marcas"} />
            <div className="card-body">
              <h5 className="card-title text-center">Marcas</h5>
              <p className="card-text">
                Administra y consulta las diferentes marcas de productos
                disponibles, añadiendo nuevas marcas o editando las existentes.
              </p>
            </div>
          </div>
        </a>

        <a href="/categorias">
          <div className="card" style={{ width: "18rem" }}>
            <img src={categorias} className="card-img-top" alt={"categorias"} />
            <div className="card-body">
              <h5 className="card-title text-center">Categorías</h5>
              <p className="card-text">
                Organiza tus productos en categorías específicas para facilitar
                la búsqueda y gestión. Crea, edita y elimina categorías según
                tus necesidades.
              </p>
            </div>
          </div>
        </a>

        <a href="/tipos">
          <div className="card" style={{ width: "18rem" }}>
            <img src={tipos} className="card-img-top" alt={"tipos"} />
            <div className="card-body">
              <h5 className="card-title text-center">Tipos de producto</h5>
              <p className="card-text">
                Define y gestiona los tipos de productos que ofreces. Añade
                nuevos tipos, modifica los existentes y mantén tu inventario
                bien estructurado.
              </p>
            </div>
          </div>
        </a>

        <a href="/medidas">
          <div className="card" style={{ width: "18rem" }}>
            <img src={medidas} className="card-img-top" alt={"medidas"} />
            <div className="card-body">
              <h5 className="card-title text-center">Unidad de medida</h5>
              <p className="card-text">
                Gestiona las unidades de medida para tus productos. Crea nuevas
                unidades, edita las existentes y asegúrate de que todo esté
                correctamente etiquetado.
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
