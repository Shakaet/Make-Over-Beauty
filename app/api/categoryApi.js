import api from "../libs/axios";

export const categoryApi = {
    getAllCategory: async () => {
        const response = await api.get("/api/category");
        return response.data.data;
    },
}