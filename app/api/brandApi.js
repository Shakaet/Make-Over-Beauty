import api from "../libs/axios";

export const brandApi = {
    getAllBrands: async () => {
        const response = await api.get("/api/brand");
        return response.data.data;
    },
}