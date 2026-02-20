export const userApi = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get(
        "https://bloomingbeauty.vercel.app/api/users",
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch users" };
    }
  },

  // Get single user by email
  getUserByEmail: async (email) => {
    try {
      const response = await api.get(
        `https://bloomingbeauty.vercel.app/api/users/${email}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user" };
    }
  },

  // Get all managers
  getAllManagers: async () => {
    try {
      const response = await api.get(
        "https://bloomingbeauty.vercel.app/api/users/allmanager",
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch managers" };
    }
  },

  // Get manager access
  getManagerAccess: async (email) => {
    try {
      const response = await api.get(
        `https://bloomingbeauty.vercel.app/api/users/manager/access/${email}`,
      );
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
      const response = await api.delete(
        `https://bloomingbeauty.vercel.app/api/users/${id}`,
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete user" };
    }
  },

  // Check user role
  checkUserRole: async (email) => {
    try {
      const [customer, admin, manager] = await Promise.all([
        api.get(
          `https://bloomingbeauty.vercel.app/api/users/getCustomer/${email}`,
        ),
        api.get(
          `https://bloomingbeauty.vercel.app/api/users/getadmin/${email}`,
        ),
        api.get(
          `https://bloomingbeauty.vercel.app/api/users/getmanager/${email}`,
        ),
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
};
