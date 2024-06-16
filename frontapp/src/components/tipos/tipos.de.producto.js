import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useBackground from "../../hooks/useBackground";
import CustomAlert from "../Shared/customAlert";
import DataTable from "react-data-table-component";
import Searcher from "../Shared/searcher";
import useGetDataList from "../../hooks/useGetDataList";
import useDatatableOptions from "../../hooks/useDatatableOptions";

const columns = [
  {
    name: "ID",
    selector: (data) => data.id,
    sortable: true,
  },
  {
    name: "Nombre",
    selector: (data) => data.tipo,
    sortable: true,
  },
  {
    name: "Opciones",
    cell: (data) => (
      <div>
        <Link to={`/detalletipo/${data.id}`} className="me-2">
          Detalle
        </Link>
        <Link to={`/editartipo/${data.id}`} className="me-2">
          Editar
        </Link>
      </div>
    ),
    ignoreRowClick: true,
    type: "button",
  },
];
export default function TipoProductos({ info }) {
  const { message, setMessage } = info;
  const { dataList, loading, error } = useGetDataList({ type: "tipos" });
  const [filteredTipos, setFilteredTipos] = useState();
  const { paginationComponentOptions, noData } = useDatatableOptions();
  useBackground("bg-springfield");

  useEffect(() => {
    if (dataList) {
      setFilteredTipos(dataList);
    }
  }, [dataList]);
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
        <h2 className="text-center text-light">Tipo de productos</h2>
        <a className="btn btn-primary mb-2" href="/creartipo">
          Crear
        </a>
        {message && <CustomAlert message={message} setMessage={setMessage} />}
        <DataTable
          columns={columns}
          data={filteredTipos}
          pagination
          paginationComponentOptions={paginationComponentOptions}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <Searcher
              dataType={"tipos"}
              dataList={dataList}
              filter={setFilteredTipos}
            />
          }
          fixedHeader
          fixedHeaderScrollHeight="60vh"
          noDataComponent={noData}
        />
      </div>
    </div>
  );
}
