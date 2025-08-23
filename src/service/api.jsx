// src/services/api.js
import axios from "axios";

const BASE_URL =
  import.meta.env.DEV ? "/api" : "https://api.alibekmoyliyev.uz";

// axios instance yaratamiz
const api = axios.create({
  baseURL: BASE_URL,
});

// Har bir requestdan oldin tokenni localStorage dan qo‘shamiz
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
