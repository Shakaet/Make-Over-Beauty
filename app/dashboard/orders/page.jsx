"use client";

import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/provider/AuthProvider";
import toast from "react-hot-toast";
import { getOrders } from "@/app/api/orderApi";

export default function OrderHistory() {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openRows, setOpenRows] = useState({});

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getOrders(user.email);
                setOrders(data.orders);
            } catch (err) {
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleDelete = async (orderId) => {
        if (!confirm("Are you sure you want to delete this order?")) return;
    };

    if (loading) return <p className="p-6 text-center text-gray-500">Loading orders…</p>;
    if (!orders.length) return <p className="p-6 text-center text-gray-500">No orders found.</p>;

    return (
        <div className="p-6 min-h-screen bg-gradient-to-b from-[#fff6f0] to-[#fff0e8]">
            <h1 className="text-3xl font-bold mb-6 ">Order History</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 bg-white rounded-2xl shadow-lg">
                    <thead className="bg-red-50 rounded-t-2xl">
                        <tr>
                            <th className="px-4 py-3 border text-left">Invoice</th>
                            <th className="px-4 py-3 border text-left">Date</th>
                            <th className="px-4 py-3 border text-left">Subtotal</th>
                            <th className="px-4 py-3 border text-left">Coupon</th>
                            <th className="px-4 py-3 border text-left">Total</th>
                            <th className="px-4 py-3 border text-center">Items</th>
                            <th className="px-4 py-3 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const isOpen = openRows[order._id];
                            return (
                                <tr key={order._id} className="hover:bg-red-50 transition-all">
                                    <td className="px-4 py-2 border font-medium">{order.invoiceId}</td>
                                    <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-2 border">৳{order.subtotal}</td>
                                    <td className="px-4 py-2 border">{order.couponCode || "-"}</td>
                                    <td className="px-4 py-2 border font-semibold text-red-600">৳{order.totalAmount}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() =>
                                                setOpenRows((prev) => ({ ...prev, [order._id]: !prev[order._id] }))
                                            }
                                            className="text-blue-600 underline text-sm"
                                        >
                                            {isOpen ? "Hide Items" : "View Items"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border text-center">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="text-red-600 underline text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {orders.map((order) =>
                            openRows[order._id]
                                ? order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td colSpan={7} className="px-4 py-2 border bg-red-50">
                                            <div className="grid grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <strong>Serial NO:</strong> {idx + 1}
                                                </div>
                                                <div>
                                                    <strong>Product ID:</strong> {item.productId}
                                                </div>
                                                <div>
                                                    <strong>Qty:</strong> {item.quantity}
                                                </div>
                                                <div>
                                                    <strong>Price:</strong> ৳{item.price}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                : null
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
