import api from "@/app/libs/axios";

export const getOrders = async (email) => {
    try {
        const res = await api.get(`/api/orders/${email}`);
        return res.data || [];
    } catch (err) {
        console.error("Failed to fetch orders:", err);
        throw err;
    }
};

export const createOrder = async (orderData) => {
    try {
        const res = await api.post("/api/orders", orderData);
        return res.data;
    } catch (err) {
        console.error("Failed to create order:", err);
        throw err;
    }
};
