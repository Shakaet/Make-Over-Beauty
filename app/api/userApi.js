// app/api/userApi.js
// import api from "./axiosInstance"; // Make sure this path points to your axios config file

export const userApi = {
  // Get all users
  getAllUsers: async () => {
    try {
      // ✅ FIX: Removed full URL, using relative path
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch users" };
    }
  },

  // Get single user by email
  getUserByEmail: async (email) => {
    try {
      const response = await api.get(`/users/${email}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user" };
    }
  },

  // Get all managers
  getAllManagers: async () => {
    try {
      const response = await api.get("/users/allmanager");
      return response.data;
    } catch (error) {
      // ✅ Better Error Logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(
          "Backend Error:",
          error.response.status,
          error.response.data,
        );
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // This usually means CORS issue or Backend is down
        console.error("Network Error:", error.message);
        throw {
          message:
            "Network Error: Cannot connect to backend. Check CORS settings.",
        };
      } else {
        throw { message: "Request failed" };
      }
    }
  },

  // Get manager access
  getManagerAccess: async (email) => {
    try {
      const response = await api.get(`/users/manager/access/${email}`);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch manager access" }
      );
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete user" };
    }
  },

  // Check user role
  checkUserRole: async (email) => {
    try {
      const [customer, admin, manager] = await Promise.all([
        api.get(`/users/getCustomer/${email}`),
        api.get(`/users/getadmin/${email}`),
        api.get(`/users/getmanager/${email}`),
      ]);

      return {
        isCustomer: customer.data.customer,
        isAdmin: admin.data.admin,
        isManager: manager.data.manager,
      };
    } catch (error) {
      throw error.response?.data || { message: "Failed to check user role" };
    }
  },

  // Update manager permissions
  updateManagerAccess: async (id, permissions) => {
    try {
      const response = await api.patch(
        `/users/update-access/${id}`,
        permissions,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update access" };
    }
  },

  // Invite Moderator (from previous steps)
  inviteModerator: async (email, permissions) => {
    try {
      const response = await api.post("/users/invite-moderator", {
        email,
        permissions,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send invite" };
    }
  },
};
