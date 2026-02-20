import api from "../libs/axios";

export const authApi = {
  login: async (email, password) => {
    const response = await api.post(
      `https://bloomingbeauty.vercel.app/api/auth/login`,
      { email, password },
      //      { withCredentials: true }
    );
    return response.data; // contains { success, message, data }
  },

  refreshToken: async () => {
    const response = await api.post(
      `https://bloomingbeauty.vercel.app/api/auth/refresh-token`,
      {},
      { withCredentials: true },
    );
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("accessToken");
  },
};
