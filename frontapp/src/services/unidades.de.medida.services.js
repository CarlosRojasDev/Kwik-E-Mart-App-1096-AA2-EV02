import http from "../http";

class MedidasData {
  getAll() {
    return http.get("/medidas");
  }
  create(data) {
    return http.post("/medidas", data);
  }
  get(id) {
    return http.get(`/medidas/${id}`);
  }
  update(id, data) {
    return http.put(`/medidas/${id}`, data);
  }
  delete(id){
    return http.delete(`/medidas/${id}`)
  }
}

const medidas = new MedidasData();
export default medidas;
