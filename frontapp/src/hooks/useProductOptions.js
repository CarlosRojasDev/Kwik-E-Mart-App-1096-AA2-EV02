import { useEffect, useState } from "react";
import marcas from "../services/marcas.services";
import categorias from "../services/categorias.service";
import tipos from "../services/tipos.de.productos.services";
import medidas from "../services/unidades.de.medida.services";

export function useProductOptions() {
    const [selectOptions, setSelectOptions] = useState([[], [], [], []]);
    const [loadingOptions, setLoadingOptions] = useState(true)
    const [errorOptions, setErrorOptions] = useState(null)
  
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const [marcasList, tiposList, categoriasList, medidasList] = await Promise.all([
            marcas.getAll(),
            tipos.getAll(),
            categorias.getAll(),
            medidas.getAll(),
          ]);
  
          setSelectOptions([marcasList.data, tiposList.data, categoriasList.data, medidasList.data]);
        } catch (error) {
          setErrorOptions("Error al cargar las listas de opciones")
        }finally{
            setLoadingOptions(false)
        }
      };
  
      fetchOptions();
    }, []);
  
    return {selectOptions, loadingOptions, errorOptions};
  }