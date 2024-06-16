import { useEffect, useState } from "react";

export default function SelectField({
  label,
  name,
  options,
  register,
  errors,
}) {
  const [sortedOptions, setSortedOptions] = useState([]);
  useEffect(() => {
    if (options && options.length > 0) {
      const sort = options.sort((a, b) =>
        (a.nombre || a.tipo || a.unidad).localeCompare(
          b.nombre || b.tipo || b.unidad
        )
      );
      setSortedOptions(sort);
    }
  }, [options]);
  return (
    <div className="col-sm-12 col-md-5">
      <strong className="form-label text-white">{label}</strong>
      <select {...register(name, { required: true })} className="form-control">
        <option value="">.::Select::.</option>
        {sortedOptions.map((item) => (
          <option key={`${name}_${item.id}`} value={item.id}>
            {item.nombre || item.tipo || item.unidad}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-danger">Este campo es obligatorio</span>
      )}
    </div>
  );
}
