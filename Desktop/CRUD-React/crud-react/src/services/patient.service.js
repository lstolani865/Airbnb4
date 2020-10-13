import http from "../http-common";

class PatientDataService {
  getAll() {
    return http.get("/patients/");
  }

  get(id) {
    return http.get(`/patient/${id}`);
  }

  create(data) {
    return http.post("/patients", data);
  }

  update(id, data) {
  console.log("PatientDataService -> update -> id, data", id, data)
    
    return http.put(`/patient/${id}`, data);
  }

  delete(id) {
    return http.delete(`/patient/${id}`);
  }

  deleteAll() {
    return http.delete(`/patients`);
  }

  findByFirstName(FirstName) {
    return http.get(`/patients?FirstName=${FirstName}`);
  }
}

export default new PatientDataService();
