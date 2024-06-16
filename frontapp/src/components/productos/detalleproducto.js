import { useParams, useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import productos from "../../services/productos.services";
import CustomAlert from "../Shared/customAlert";
import useBackground from "../../hooks/useBackground";
import { useState, useEffect } from "react";

export default function DetalleProducto({ info }) {
  const { id } = useParams();
  const { data, loading, error } = useGetData(id, "producto");
  const navigate = useNavigate();
  const { message, setMessage } = info;
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  useBackground("bg-springfield-2");

  useEffect(() => {
    if (deleteConfirm) {
      const deleteItem = async () => {
        try {
          await productos.delete(id);
          setMessage({ type: "success", text: "Registro eliminado" });
          navigate("../productos");
        } catch (error) {
          if (error.response.status === 404) {
            setMessage({
              type: "error",
              text: `Producto no encontrado.`,
            });
          } else {
            setMessage({
              type: "error",
              text: `Error al eliminar el registro.`,
            });
          }
        }
      };
      deleteItem();
    }
  }, [deleteConfirm, id, navigate, setMessage]);
  const handleClick = () => {
    const deleteMessage = `Esta acción no se puede revertir. ¿Desea continuar?`;
    setMessage({ type: "info", text: deleteMessage });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return <p>No se encontraron detalles del producto.</p>;
  }
  return (
    <div className="container mt-3">
      <div className="col-sm-12 col-md-8 col-lg-6 bg-opc p-4">
        <h2 className="mb-3 text-white">Detalle de producto</h2>
        {message && (
          <CustomAlert
            message={message}
            setMessage={setMessage}
            deleteConfirm={setDeleteConfirm}
          />
        )}
        <div key={data.id}>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">ID</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.id}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="text-white">Nombre</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.nombre}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Marca</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.marca.nombre}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Tipo</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.tipo.tipo}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Categoría</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.categoria.nombre}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Un. Medida</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.medida.unidad}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Precio</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.precio}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Stock</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.stock}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-form-label text-white">Estado</span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.estado}</span>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12 col-md-4 col-form-label">
              <span className="col-sm-4 col-form-label text-white">
                Vendidos
              </span>
            </div>
            <div className="col-sm-12 col-md-8 ">
              <span className="form-control">{data.vendidos}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <a href="../productos" className="link">
              Volver
            </a>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                handleClick();
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
