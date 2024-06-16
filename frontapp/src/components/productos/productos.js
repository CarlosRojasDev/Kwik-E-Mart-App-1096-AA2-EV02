import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import Searcher from "../Shared/searcher";
import useDatatableOptions from "../../hooks/useDatatableOptions";
import useGetDataList from "../../hooks/useGetDataList";
import CustomAlert from "../Shared/customAlert";

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
    grow: 2,
  },
  {
    name: "Categoría",
    selector: (data) => data.categoria.nombre,
    sortable: true,
  },
  {
    name: "Tipo Producto",
    selector: (data) => data.tipo.tipo,
    sortable: true,
  },
  {
    name: "Marca",
    selector: (data) => data.marca.nombre,
    sortable: true,
  },
  {
    name: "Unidad De Medida",
    selector: (data) => data.medida.unidad,
    sortable: true,
  },
  {
    name: "Precio",
    selector: (data) => parseFloat(data.precio),
    sortable: true,
  },
  {
    name: "Stock",
    selector: (data) => parseInt(data.stock),
    sortable: true,
  },
  {
    name: "Estado",
    selector: (data) => data.estado,
    sortable: true,
  },
  {
    name: "Opciones",
    cell: (data) => (
      <div className="d-flex flex-wrap">
        <Link to={`/detalleproducto/${data.id}`} className="me-2">
          Detalle
        </Link>
        <Link to={`/editarproducto/${data.id}`} className="me-2">
          Editar
        </Link>
      </div>
    ),
    ignoreRowClick: true,
    type: "button",
    grow: 2,
  },
];

export default function Productos({ info }) {
  const { message, setMessage } = info;
  const { dataList, loading, error } = useGetDataList({ type: "productos" });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { paginationComponentOptions, noData } = useDatatableOptions();

  useEffect(() => {
    if (dataList) {
      setFilteredProducts(dataList);
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
        <h2 className="text-center text-light">Productos</h2>
        <Link to={"/crearproducto"} className="btn btn-primary mb-2">
          Crear
        </Link>
        {message && <CustomAlert message={message} setMessage={setMessage} />}
        <DataTable
          columns={columns}
          data={filteredProducts}
          subHeader
          subHeaderComponent={
            <Searcher
              dataType={"productos"}
              dataList={dataList}
              filter={setFilteredProducts}
            />
          }
          pagination
          paginationComponentOptions={paginationComponentOptions}
          noDataComponent={noData}
          fixedHeader
          fixedHeaderScrollHeight="60vh"
          highlightOnHover
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        />
      </div>
    </div>
  );
}
