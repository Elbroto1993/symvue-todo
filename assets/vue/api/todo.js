import axios from "axios";

export default {
  create(name) {
    return axios.post("/api/todos", {
      name
    });
  },
  findAll() {
    return axios.get("/api/todos");
  },
  delete(id) {
    return axios.delete(`/api/todos/${id}`);
  }
};
