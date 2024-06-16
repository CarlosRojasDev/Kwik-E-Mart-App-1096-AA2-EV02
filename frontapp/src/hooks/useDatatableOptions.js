export default function useDatatableOptions() {
  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  const noData = "No hay registros para mostrar";
  
  return { paginationComponentOptions, noData };
}
