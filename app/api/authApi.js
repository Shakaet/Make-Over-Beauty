import api from "../libs/axios";

export const authApi = {
    login: async (email, password) => {
        const response = await api.post(
            `/api/auth/login`,
            { email, password },
      //      { withCredentials: true }
        );
        return response.data; // contains { success, message, data }
    },

    refreshToken: async () => {
        const response = await api.post(
            `/api/auth/refresh-token`,
            {},
            { withCredentials: true }
        );
        return response.data;
    },

    logout: () => {
        localStorage.removeItem("accessToken");
    },
};



