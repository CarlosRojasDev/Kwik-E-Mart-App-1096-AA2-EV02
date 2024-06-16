import http from "../http";

class TiposData {
  getAll() {
    return http.get("/tipos");
  }
  create(data) {
    console.log(data)
    return http.post("/tipos", data);
  }
  get(id) {
    return http.get(`/tipos/${id}`);
  }
  update(id, data) {
    return http.put(`/tipos/${id}`, data);
  }
  delete(id){
    return http.delete(`/tipos/${id}`)
  }
}

const tipos = new TiposData();
export default tipos;
