"use client";

import { useEffect, useState, useContext } from "react";
import { Context } from "@/app/provider/AuthProvider";
import toast from "react-hot-toast";
import { deleteOrder, getOrders } from "@/app/api/orderApi";
import { ProductDetailsModal } from "@/app/modal/ProductDetailsModal";


export default function OrderHistory() {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null); // order shown in modal

    const fetchData = async () => {
        if (!user) return;

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

    useEffect(() => {
        fetchData();
    }, [user]);


    const handleDelete = async (orderId) => {
        const confirmed = window.confirm("Are you sure you want to delete this order?");
        if (!confirmed) return;

        try {
            await deleteOrder(orderId);
            toast.success("Order deleted successfully");
            fetchData(); // refresh orders
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete order");
        }
    };


    const closeModal = () => setSelectedOrder(null);


    if (loading) return <p className="p-6 text-center text-gray-500">Loading orders…</p>;
    if (!orders.length) return <p className="p-6 text-center text-gray-500">No orders found.</p>;

    return (
        <div className="p-6 pt-18 min-h-screen bg-gradient-to-b from-[#fff6f0] to-[#fff0e8]">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                    Order History
                </h1>
                <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm text-sm text-gray-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> {orders.length} Orders
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden text-sm align-middle border border-gray-200">
                    <thead className="sticky top-0 z-10 bg-gradient-to-r from-rose-50 to-fuchsia-50 rounded-t-2xl border-b border-rose-100/70">
                        <tr>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Invoice</th>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Date</th>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Subtotal</th>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Coupon</th>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Coupon (%)</th>
                            <th className="px-5 py-3.5 text-left text-gray-700 font-semibold whitespace-nowrap">Total</th>
                            <th className="px-5 py-3.5 text-center text-gray-700 font-semibold whitespace-nowrap">Items</th>
                            <th className="px-5 py-3.5 text-center text-gray-700 font-semibold whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order._id} className="odd:bg-white even:bg-rose-50/20 hover:bg-rose-50/60 transition-colors">
                                    <td className="px-5 py-3 border-b border-gray-100 font-medium text-gray-900">{order.invoiceId}</td>
                                    <td className="px-5 py-3 border-b border-gray-100">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-5 py-3 border-b border-gray-100 tabular-nums">৳{order.subtotal}</td>
                                    <td className="px-5 py-3 border-b border-gray-100">
                                        {order.couponCode ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-xs">
                                                {order.couponCode}
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-100">
                                        {order.discountPercent != null ? (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-xs">
                                                -{order.discountPercent}%
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-100 font-semibold text-rose-600 tabular-nums">৳{order.totalAmount}</td>
                                    <td className="px-5 py-3 border-b border-gray-100 text-center">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                                        >
                                            View Items
                                        </button>
                                    </td>
                                    <td className="px-5 py-3 border-b border-gray-100 text-center">
                                        <button
                                            onClick={() => handleDelete(order._id)}
                                            className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ProductDetailsModal
                title={selectedOrder ? `Order ${selectedOrder.invoiceId} — ${selectedOrder.items?.length || 0} item(s)` : ""}
                open={!!selectedOrder}
                onClose={closeModal}
            >
                {selectedOrder && (
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                                Date: {new Date(selectedOrder.createdAt).toLocaleString()}
                            </span>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                Total: ৳{selectedOrder.totalAmount}
                            </span>
                            {selectedOrder.couponCode ? (
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                                    Coupon: {selectedOrder.couponCode}
                                </span>
                            ) : null}
                        </div>

                        <ul className="space-y-3">
                            {selectedOrder.items?.map((item, idx) => {
                                const subtotal = (item.quantity || 0) * (item.price || 0);
                                const code = String(item.productId || "").slice(-4).padStart(4, "0");
                                return (
                                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                                        <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white grid place-items-center font-semibold">
                                            #{code}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="font-medium text-gray-900 truncate">Product: {item.productId}</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">Qty: {item.quantity}</span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Price: ৳{item.price}</span>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 mt-1">Subtotal: ৳{subtotal}</div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </ProductDetailsModal>
        </div>
    );
}
