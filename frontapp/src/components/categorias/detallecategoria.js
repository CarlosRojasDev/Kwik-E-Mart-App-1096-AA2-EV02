import { useParams, useNavigate } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import categorias from "../../services/categorias.service";
import CustomAlert from "../Shared/customAlert";
import { useEffect, useState } from "react";
import useBackground from "../../hooks/useBackground";

export default function DetalleCategoria({ info }) {
  const { id } = useParams();
  const { data, loading, error } = useGetData(id, "categoria");
  const navigate = useNavigate();
  const { message, setMessage } = info;
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  useBackground("bg-springfield-2");

  useEffect(() => {
    if (deleteConfirm) {
      const deleteItem = async () => {
        try {
          await categorias.delete(id);
          setMessage({ type: "success", text: "Registro eliminado" });
          navigate("../categorias");
        } catch (error) {
          if (error.response.status === 404) {
            setMessage({
              type: "error",
              text: `Marca no encontrada.`,
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
    return <p>No se encontraron detalles de la marca.</p>;
  }
  return (
    <div className="container mt-3">
      <div className="col-sm-12 col-md-6 bg-opc p-4">
        <h2 className="mb-3 text-white">Detalle de categoría</h2>
        {message && (
          <CustomAlert
            message={message}
            setMessage={setMessage}
            deleteConfirm={setDeleteConfirm}
          />
        )}
        <div key={data.id}>
          <div className="d-flex mb-3">
            <span className="col-sm-4 col-form-label text-white">ID</span>
            <span className="form-control">{data.id}</span>
          </div>
          <div className="d-flex mb-3">
            <span className="col-sm-4 col-form-label text-white">Nombre</span>
            <span className="form-control">{data.nombre}</span>
          </div>
          <div className="d-flex justify-content-between">
            <a href="../categorias">Return</a>
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
