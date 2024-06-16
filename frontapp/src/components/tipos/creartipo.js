import { useState } from "react";
import { Link } from "react-router-dom";
import tipos from "../../services/tipos.de.productos.services";
import { useForm } from "react-hook-form";
import useBackground from "../../hooks/useBackground";
import CustomAlert from "../Shared/customAlert"

export default function CrearTipo() {
  useBackground("bg-springfield-2")

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [message, setMessage] = useState(null);

  const crearTipo = async (data) => {
    try {
      await tipos.create(data);      
      setMessage({ type: "success", text: "Registro guardado" });
      reset();
    } catch (error) {
      setMessage({ type: "error", text: `Ocurrio un error. Error: ${error}` });
    }
  };

  const trimRequired = (data) => {
    return data.trim() !== "";
  };
  
  return (
    <div className="container mt-3">
      <div className="col-6 bg-opc p-4">
        <h2 className="mb-3 text-white">Crear Tipo De Producto</h2>

        {message && (
          <CustomAlert message={message} setMessage={setMessage}/>
        )}

        <form onSubmit={handleSubmit(crearTipo)}>
          <div className="mb-3">
            <strong className="form-label text-white">Nombre</strong>
            <input
              type="text"
              className="form-control mt-2"
              {...register("nombre", { validate: { trimRequired } })}
            />
            {errors.nombre && (
              <span className="text-danger">Este campo es obligatorio</span>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"../tipos"}>Return</Link>            
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}