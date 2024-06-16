import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useBackground from "../../hooks/useBackground";
import medidas from "../../services/unidades.de.medida.services";
import CustomAlert from "../Shared/customAlert";

export default function EditarMedida() {
  useBackground("bg-springfield-2");
  const { id } = useParams();
  const { data, loading, error } = useGetData(id, "medida");
  const [message, setMessage] = useState(null);
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
    setError,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("nombre", data.unidad);
    }
  }, [data, setValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (trimRequired(value)) {
      setValue(name, value);
      clearErrors(name);
    } else {
      setError(name);
    }
  };
  const trimRequired = (data) => {
    return data.trim() !== "";
  };
  const editarMedida = async (data) => {
    try {
      await medidas.update(id, data);
      setMessage({ type: "success", text: "Registro actualizado" });
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el registro" });
      console.error(error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (!data) {
    return <p>No se encontró la información</p>;
  }
  return (
    <div className="container mt-3">
      <div className="col-sm-12 col-md-6 bg-opc p-4">
        <h2 className="mb-3 text-white">Editar Unidad De Medida</h2>
        {message && <CustomAlert message={message} setMessage={setMessage} />}
        <form onSubmit={handleSubmit(editarMedida)}>
          <div className="d-flex mb-3">
            <span className="col-sm-4 col-form-label text-white">ID</span>
            <input
              type="text"
              className="form-control mt-2"
              {...register("id")}
              readOnly
              disabled
            />
            {errors.id && (
              <span className="text-danger">
                Este campo no se puede modificar
              </span>
            )}
          </div>
          <div className="d-flex mb-3">
            <span className="col-sm-4 col-form-label text-white">Nombre</span>
            <div className="w-100">
              <input
                type="text"
                className="form-control mt-2 position-relative"
                {...register("nombre")}
                onChange={handleChange}
              />
              {errors.nombre && (
                <span className="position-absolute text-danger">
                  Este campo es obligatorio
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"../medidas"}>Volver</Link>
            <button type="submit" className="btn btn-secondary">
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
