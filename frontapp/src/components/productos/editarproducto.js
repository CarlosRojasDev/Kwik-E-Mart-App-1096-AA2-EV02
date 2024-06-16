import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useBackground from "../../hooks/useBackground";
import productos from "../../services/productos.services";
import CustomAlert from "../Shared/customAlert";
import { useProductOptions } from "../../hooks/useProductOptions";
import SelectField from "./selectField";

const isValid = (value) => {
  return value >= 0 && value !== "";
};

export default function EditarProducto() {
  useBackground("bg-springfield-2");
  const { id } = useParams();
  const { data, loading, error } = useGetData(id, "producto");
  const [message, setMessage] = useState(null);
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    defaultValues: {
      id: "",
      nombre: "",
      categoria: "",
      tipo: "",
      marca: "",
      medida: "",
      precio: "",
      estado: "",
      stock: "",
      vendidos: "",
    },
  });

  const { selectOptions, loadingOptions, errorOptions } = useProductOptions();

  useEffect(() => {
    const formFields = {
      id: "id",
      nombre: "nombre",
      categoria: "id_categoria",
      tipo: "id_tipoProducto",
      marca: "id_marca",
      medida: "id_unidadMedida",
      precio: "precio",
      estado: "estado",
      stock: "stock",
      vendidos: "vendidos",
    };
    if (data) {
      const fields = Object.keys(formFields);
      fields.forEach((field) => {
        setValue(field, data[formFields[field]]);
      });
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

  const editarProducto = async (data) => {
    try {
      await productos.update(id, data);
      setMessage({ type: "success", text: "Registro actualizado" });
    } catch (error) {
      setMessage({ type: "error", text: "Error al actualizar el registro" });
      console.error(error);
    }
  };

  if (loading || loadingOptions) {
    return (
      <div className="alert-container">
        <h1 className="text-center text-white">Cargando...</h1>
      </div>
    );
  }
  if (error || errorOptions) {
    return (
      <div className="alert-container">
        <h1 className="text-center text-white">Error al cargar los datos</h1>
        <p className="text-white">{error || errorOptions}</p>
      </div>
    );
  }
  if (!data) {
    return <p>No se encontró la información</p>;
  }

  return (
    <div className="container mt-3">
      <div className="col-12 bg-opc p-4">
        <h2 className="mb-3 text-white">Editar producto ID {data.id}</h2>
        {message && <CustomAlert message={message} setMessage={setMessage} />}
        <form onSubmit={handleSubmit(editarProducto)}>
          <div className="row justify-content-between mb-3 gap-3">
            <div className="col-sm-12 col-md-5">
              <strong className="form-label text-white">Nombre</strong>
              <input
                type="text"
                className="form-control"
                {...register("nombre", { validate: trimRequired })}
                onChange={handleChange}
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
              label="Categoria"
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
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
