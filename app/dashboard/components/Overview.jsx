"use client";

import { useEffect, useState, useContext } from "react";
import { getOrders } from "@/app/api/orderApi";
import { Context } from "@/app/provider/AuthProvider";
import toast from "react-hot-toast";

export default function Overview() {
    const { user, role } = useContext(Context);
    const [overview, setOverview] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchOverview = async () => {
            setLoading(true);
            try {
                const data = await getOrders(user.email);

                const totalOrders = data.totalOrders || 0;
                const totalSpent = data.orders?.reduce(
                    (sum, order) => sum + order.totalAmount,
                    0
                ) || 0;
                const lastOrder = data.orders?.length ? data.orders[0].invoiceId : "-";

                setOverview({ totalOrders, totalSpent, lastOrder });
            } catch (err) {
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, [user]);

    if (loading) return <p className="p-6 text-center text-gray-500">Loading overview...</p>;

    return (
        <div className="min-h-screen p-6 pt-18 bg-gradient-to-b from-[#fff6f0] to-[#fff0e8]">
            {/* <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">Overview</h1> */}
            {role == 'customer' && (<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold text-red-600">{overview.totalOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Spent</h2>
                    <p className="text-3xl font-bold text-red-600">৳{overview.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Last Order</h2>
                    <p className="text-3xl font-bold text-red-600">{overview.lastOrder}</p>
                </div>
            </div>)}
            {role == 'admin' && (
                <div></div>
            )}
        </div>
    );
}
