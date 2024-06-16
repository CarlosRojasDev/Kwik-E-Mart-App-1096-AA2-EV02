import http from "../http";

class CategoriasData {
  getAll() {
    return http.get("/categorias");
  }
  create(data) {
    return http.post("/categorias", data);
  }
  get(id) {
    return http.get(`/categorias/${id}`);
  }
  update(id, data) {
    return http.put(`/categorias/${id}`, data);
  }
  delete(id){
    return http.delete(`/categorias/${id}`)
  }
}

const categorias = new CategoriasData();
export default categorias;