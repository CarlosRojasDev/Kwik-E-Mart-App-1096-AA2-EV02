export default function Searcher({ dataType, dataList, filter }) {
  const handleChange = (e) => {
    const { value } = e.target;
    const filteredData = dataList.filter((data) => {
      if (dataType === "productos") {
        console.log(value.toLowerCase().split(" ").lenght)
        return data.nombre.toLowerCase().includes(value.toLowerCase()) ||
        data.categoria.nombre.toLowerCase().includes(value.toLowerCase()) ||
        data.medida.unidad.toLowerCase().includes(value.toLowerCase()) ||
        data.tipo.tipo.toLowerCase().includes(value.toLowerCase()) ||
        data.marca.nombre.toLowerCase().includes(value.toLowerCase());        
      }
      if (dataType === "marcas" || dataType === "categorias") {
        return data.nombre.toLowerCase().includes(value.toLowerCase());
      }
      if (dataType === "medidas") {
        return data.unidad.toLowerCase().includes(value.toLowerCase());
      }
      if (dataType === "tipos") {
        return data.tipo.toLowerCase().includes(value.toLowerCase());
      }
      return "";
    });
    filter(filteredData);
  };
  return (
    <div className="d-flex">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar"
        onChange={handleChange}
      ></input>
    </div>
  );
}
