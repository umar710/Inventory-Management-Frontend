import api from "./api";

export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
};

// Token management
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Get stored token
export const getStoredToken = () => {
  return localStorage.getItem("token");
};

// Get user from token
export const getCurrentUser = () => {
  const token = getStoredToken();
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { username: payload.username, userId: payload.userId };
    } catch (error) {
      return null;
    }
  }
  return null;
};
