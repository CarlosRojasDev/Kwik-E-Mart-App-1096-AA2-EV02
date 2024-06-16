import http from "../http";

class MarcasData {
  getAll() {
    return http.get("/marcas");
  }
  create(data) {
    return http.post("/marcas", data);
  }
  get(id) {
    return http.get(`/marcas/${id}`);
  }
  update(id, data) {
    return http.put(`/marcas/${id}`, data);
  }
  delete(id){
    return http.delete(`/marcas/${id}`)
  }
}

const marcas = new MarcasData();
export default marcas;
