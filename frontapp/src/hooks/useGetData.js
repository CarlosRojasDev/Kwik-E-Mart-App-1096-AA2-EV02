import { useState, useEffect } from "react";
import marcas from "../services/marcas.services";
import categorias from "../services/categorias.service";
import tipos from "../services/tipos.de.productos.services";
import medidas from "../services/unidades.de.medida.services";
import productos from "../services/productos.services";

export function useGetData(id,type) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = []
        if (type==="marca") {
          response = await marcas.get(id);
        }
        if (type==="categoria") {
          response = await categorias.get(id);
        }
        if (type==="tipo") {
          response = await tipos.get(id);
        }
        if (type==="medida") {
          response = await medidas.get(id);
        }
        if (type==="producto") {
          response = await productos.get(id);
        }
        setData(response.data);
      } catch (error) {
        setError("Ocurrio un error al consultar la información.");
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      getData();
    }
  }, [id,type]);

  return { data, loading, error };
}
