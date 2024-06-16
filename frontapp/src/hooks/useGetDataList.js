import { useEffect, useState } from "react";
import marcas from "../services/marcas.services";
import categorias from "../services/categorias.service";
import tipos from "../services/tipos.de.productos.services";
import medidas from "../services/unidades.de.medida.services";
import productos from "../services/productos.services";

export default function useGetDataList({ type }) {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDataList = async () => {
      try {
        let response = [];
        if (type === "marcas") {
          response = await marcas.getAll();
        }
        if (type === "categorias") {
          response = await categorias.getAll();
        }
        if (type === "tipos") {
          response = await tipos.getAll();
        }
        if (type === "medidas") {
          response = await medidas.getAll();
        }
        if (type === "productos") {
          response = await productos.getAll();
        }
        setDataList(response.data);
      } catch (error) {
        setError(`Ocurrio un error al consultar el listado de ${type}`);
      } finally {
        setLoading(false);
      }
    };
    getDataList();
  }, [type]);

  return { dataList, loading, error };
}
