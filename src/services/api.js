import axios from "axios";

import { getStoredToken } from "./auth";
// Use absolute URL to avoid any confusion
const API_BASE_URL =
  "https://inventory-management-backend-d94i.onrender.com/api";

console.log("🔗 API Base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

//
// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
//

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ Response received: ${response.status} ${response.statusText}`
    );
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

// Products API
export const productsAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  getHistory: (id) => api.get(`/products/${id}/history`),
  getCategories: () => api.get("/products/data/categories"),
};

// Import/Export API - USING THE DIRECT ROUTE
export const importExportAPI = {
  import: (formData) =>
    api.post("/products/import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  export: () => api.get("/export-products", { responseType: "blob" }), // CHANGED TO DIRECT ROUTE
};

export default api;
