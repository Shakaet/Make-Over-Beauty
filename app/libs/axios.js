import axios from "axios";

// HARDCODE THE URL TO FIX THE ISSUE NOW
const api = axios.create({
  baseURL: "https://bloomingbeauty.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const userApi = {
  getAllManagers: async () => {
    try {
      const response = await api.get("/users/allmanager");
      return response.data;
    } catch (error) {
      // If error.response exists, log the real data
      if (error.response) {
        console.error(
          "Backend Response Error:",
          error.response.status,
          error.response.data,
        );
        throw error.response.data;
      } else {
        // This is the "Network Error" / CORS zone
        console.error("Network/CORS Error:", error.message);
        throw {
          message:
            "Cannot connect to backend. Check if server is running and CORS is enabled.",
        };
      }
    }
  },

  updateManagerAccess: async (id, permissions) => {
    try {
      const response = await api.patch(
        `/users/update-access/${id}`,
        permissions,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Update failed" };
    }
  },
};
