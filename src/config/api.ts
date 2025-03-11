import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/",
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});
