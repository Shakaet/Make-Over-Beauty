import api from "../libs/axios";

export const categoryApi = {
    getAllCategory: async () => {
        const response = await api.get("/api/category");
        return response.data.data;
    },

    createCategory: async (data) => {
        const response = await api.post("/api/category", data);
        return response.data;
    },

    updateCategory: async (id, data) => {
        const response = await api.put(`/api/category/${id} `, data);
        return response.data;
    },

    deleteCategory: async (id) => {
        const response = await api.delete(`/api/category/${id}`);
        return response.data;
    },
}