import api from "../libs/axios";

export const siteSettingApi = {
  getAll: async () => {
    const response = await api.get("/api/site-setting");
    return response.data;
  },

  update: async (formData) => {
    const response = await api.patch(
      "/api/site-setting",
      formData
    );
    return response.data;
  },
};
