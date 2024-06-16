import { useState } from "react";
import { Link } from "react-router-dom";
import medidas from "../../services/unidades.de.medida.services";
import { useForm } from "react-hook-form";
import useBackground from "../../hooks/useBackground";
import CustomAlert from "../Shared/customAlert"

export default function CrearMedida() {
  useBackground("bg-springfield-2")

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [message, setMessage] = useState(null);

  const crearMedida = async (data) => {
    try {
      await medidas.create(data);      
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
      <div className="col-sm-12 col-md-6 bg-opc p-4">
        <h2 className="mb-3 text-white">Crear Unidad De Medida</h2>

        {message && (
          <CustomAlert message={message} setMessage={setMessage}/>
        )}

        <form onSubmit={handleSubmit(crearMedida)}>
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
            <Link to={"../medidas"}>Return</Link>            
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
