import api from "@/app/libs/axios";

export const getOrders = async (email) => {
  try {
    const res = await api.get(
      `https://bloomingbeauty.vercel.app/api/orders/${email}`,
    );

    // Safety check: ensure we return an array
    // The backend returns { orders: [...] }, so we access .orders
    // If .orders is missing (fallback), return empty array
    return res.data?.orders || [];
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    // Return empty array on error so the UI doesn't break
    return [];
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await api.post(
      "https://bloomingbeauty.vercel.app/api/orders",
      orderData,
    );
    return res.data;
  } catch (err) {
    console.error("Failed to create order:", err);
    throw err;
  }
};

export const getAllOrders = async (params = {}) => {
  try {
    const res = await api.get(
      "https://bloomingbeauty.vercel.app/api/orders/all",
      {
        params,
      },
    );
    return res.data || { totalOrders: 0, page: 1, totalPages: 1, data: [] };
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    throw err;
  }
};

export const deleteOrder = async (id) => {
  try {
    const res = await api.delete(
      `https://bloomingbeauty.vercel.app/api/orders/delete/${id}`,
    );
    return res.data;
  } catch (err) {
    console.error("Failed to delete order:", err);
    throw err;
  }
};

// export const getOrders = async (email) => {
//   try {
//     const res = await api.get(`https://bloomingbeauty.vercel.app/api/orders/${email}`);

//     // Safety check: ensure we return an array
//     // The backend returns { orders: [...] }, so we access .orders
//     // If .orders is missing (fallback), return empty array
//     return res.data?.orders || [];
//   } catch (err) {
//     console.error("Failed to fetch orders:", err);
//     // Return empty array on error so the UI doesn't break
//     return [];
//   }
// };
