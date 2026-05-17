import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://smart-leads-dashboard-4.onrender.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
