import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use(
  (request) => {
    if (request) {
      const token = Cookies.get("token");
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use((response) => {
  if (response) {
    return response;
  }
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.replace("/login");
    }
    return Promise.reject(error);
  };
});

export default api;
