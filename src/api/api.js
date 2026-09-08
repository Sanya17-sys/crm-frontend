import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://crm-backend-r7tg.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to attach JWT token automatically
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

// Response interceptor to handle auth failures globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/" && window.location.pathname !== "/signup") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export { API_BASE_URL };
export default api;
