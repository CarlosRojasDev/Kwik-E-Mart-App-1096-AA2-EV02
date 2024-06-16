import { Link } from "react-router-dom";
import useBackground from "../../hooks/useBackground";
import CustomAlert from "../Shared/customAlert";
import useGetDataList from "../../hooks/useGetDataList";
import DataTable from "react-data-table-component";
import Searcher from "../Shared/searcher";
import { useEffect, useState } from "react";
import usePaginationComponentOptions from "../../hooks/useDatatableOptions";

const columns = [
  {
    name: "ID",
    selector: (data) => data.id,
    sortable: true,
  },
  {
    name: "Nombre",
    selector: (data) => data.nombre,
    sortable: true,
  },
  {
    name: "Opciones",
    cell: (data) => (
      <div>
        <Link to={`/detallecategoria/${data.id}`} className="me-2">
          Detalle
        </Link>
        <Link to={`/editarcategoria/${data.id}`} className="me-2">
          Editar
        </Link>
      </div>
    ),
    ignoreRowClick: true,
    type: "button",
  },
];
export default function Categorias({ info }) {
  useBackground("bg-springfield");
  const { message, setMessage } = info;
  const { dataList, loading, error } = useGetDataList({ type: "categorias" });
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const { paginationComponentOptions, noData } = usePaginationComponentOptions();

  useEffect(()=>{
    if (dataList) {
      setFilteredCategorias(dataList)
    }
  },[dataList])
  if (loading) {
    return (
      <div className="alert-container">
        <h1 className="text-center text-white">Cargando...</h1>
      </div>
    );
  }
  if (error) {
    return <CustomAlert message={error} setMessage={setMessage} />;
  }
  return (
    <div className="container bg-opc">
      <Link to={"/admin"}>
        <i className="fas fa-arrow-circle-left text-light fs-3"></i>
      </Link>
      <div>
        <h2 className="text-center text-white">Categorias</h2>
        <Link className="btn btn-primary mb-2" to={"/crearcategoria"}>
          Crear
        </Link>
        {message && <CustomAlert message={message} setMessage={setMessage} />}
        <DataTable
          columns={columns}
          data={filteredCategorias}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <Searcher dataType={"categorias"} dataList={dataList} filter={setFilteredCategorias} />
          }
          fixedHeader
          fixedHeaderScrollHeight="60vh"
          noDataComponent={noData}
        />
      </div>
    </div>
  );
}
