import api from "../libs/axios";

export const categoryApi = {
  getAllCategory: async () => {
    const response = await api.get(
      "https://bloomingbeauty.vercel.app/api/category",
    );
    return response.data.data;
  },

  createCategory: async (data) => {
    const response = await api.post(
      "https://bloomingbeauty.vercel.app/api/category",
      data,
    );
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await api.put(
      `https://bloomingbeauty.vercel.app/api/category/${id}`,
      data,
    );
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await api.delete(
      `https://bloomingbeauty.vercel.app/api/category/${id}`,
    );
    return response.data;
  },
};
