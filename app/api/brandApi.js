import api from "../libs/axios";

export const brandApi = {
    getAllBrands: async () => {
        const response = await api.get("/api/brand");
        return response.data.data;
    },

    createBrand: async (data) => {
        const response = await api.post("/api/brand", data);
        return response.data;
    },

    updateBrand: async (id, data) => {
        const response = await api.put(`/api/brand/${id} `, data);
        return response.data;
    },

    deleteBrand: async (id) => {
        const response = await api.delete(`/api/brand/${id}`);
        return response.data;
    },
}