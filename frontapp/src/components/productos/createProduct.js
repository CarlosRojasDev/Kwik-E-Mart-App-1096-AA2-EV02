import { useForm } from "react-hook-form";
import products from "../../services/productos.services";
import { useState } from "react";
import CustomAlert from "../Shared/customAlert";
import { Link } from "react-router-dom";
import useBackground from "../../hooks/useBackground";
import SelectField from "./selectField";
import { useProductOptions } from "../../hooks/useProductOptions";

const isValid = (value) => {
  return value >= 0 && value !== "";
};

const trimRequired = (data) => {
  return data.trim() !== "";
};
export default function CrearProducto() {
  useBackground("bg-springfield-2");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [message, setMessage] = useState(null);

  const { selectOptions, loadingOptions, errorOptions } = useProductOptions();

  const crearProducto = async (data) => {
    try {
      await products.create(data);
      setMessage({ type: "success", text: "Registro guardado" });
      reset();
    } catch (error) {
      setMessage({ type: "error", text: `Ocurrio un error. Error: ${error}` });
    }
  };
  if (loadingOptions) {
    return (
      <div className="alert-container">
        <h1 className="text-center text-white">Cargando...</h1>
      </div>
    );
  }
  if (errorOptions) {
    return (
      <div className="alert-container">
        <h1 className="text-center text-white">Error al cargar los datos</h1>
        <p className="text-white">{errorOptions}</p>
      </div>
    );
  }
  return (
    <div className="container mt-3">
      <div className="col-12 bg-opc p-4">
        <h2 className="mb-3 text-white">Crear producto</h2>

        {message && <CustomAlert message={message} setMessage={setMessage} />}

        <form onSubmit={handleSubmit(crearProducto)}>
          <div className="row justify-content-between mb-3 gap-3">
            <div className="col-sm-12 col-md-5">
              <strong className="form-label text-white">Nombre</strong>
              <input
                type="text"
                className="form-control"
                {...register("nombre", { validate: trimRequired })}
              ></input>
              {errors.nombre && (
                <span className="text-danger">Este campo es obligatorio</span>
              )}
            </div>
            <SelectField
              label="Marca"
              name="marca"
              options={selectOptions[0]}
              register={register}
              errors={errors}
            />
          </div>
          <div className="row justify-content-between mb-3 gap-3">
            <SelectField
              label="Tipo de producto"
              name="tipo"
              options={selectOptions[1]}
              register={register}
              errors={errors}
            />
            <SelectField
              label="Categoría"
              name="categoria"
              options={selectOptions[2]}
              register={register}
              errors={errors}
            />
          </div>
          <div className="row justify-content-between mb-3 gap-3">
            <SelectField
              label="Unidad de medida"
              name="medida"
              options={selectOptions[3]}
              register={register}
              errors={errors}
            />
            <div className="col-sm-12 col-md-5">
              <strong className="form-label text-white">Precio</strong>
              <input
                type="number"
                className="form-control"
                {...register("precio", { validate: isValid })}
              ></input>
              {errors.precio && (
                <span className="text-danger">Este campo es obligatorio</span>
              )}
            </div>
          </div>
          <div className="row justify-content-between mb-3 gap-3">
            <div className="col-sm-12 col-md-5">
              <strong className="form-label text-white">Estado</strong>
              <select
                {...register("estado", { required: true })}
                className="form-control"
              >
                <option value={""}>.::Select::.</option>
                <option value={"Agotado"}>Agotado</option>
                <option value={"Disponible"}>Disponible</option>
              </select>
              {errors.estado && (
                <span className="text-danger">Este campo es obligatorio</span>
              )}
            </div>
            <div className="col-sm-12 col-md-5 d-flex flex-wrap justify-content-between gap-3">
              <div className="col-sm-12 col-md-5">
                <strong className="form-label text-white">Stock</strong>
                <input
                  type="number"
                  className="form-control"
                  {...register("stock", { validate: isValid })}
                ></input>
                {errors.stock && (
                  <span className="text-danger">Este campo es obligatorio</span>
                )}
              </div>
              <div className="col-sm-12 col-md-5">
                <strong className="form-label text-white">Vendidos</strong>
                <input
                  type="number"
                  className="form-control"
                  {...register("vendidos", { validate: isValid })}
                ></input>
                {errors.vendidos && (
                  <span className="text-danger">Este campo es obligatorio</span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <Link to={"../productos"}>Return</Link>
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
