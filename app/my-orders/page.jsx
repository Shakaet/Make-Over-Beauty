"use client";

import { useEffect, useState, useContext } from "react";
import { Context } from "../provider/AuthProvider";
import Link from "next/link";

export default function Dashboard() {
    const { user } = useContext(Context);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openRows, setOpenRows] = useState({});

    // ==== DEMO: Mock order data ====
    useEffect(() => {
        if (!user) return;

        const demoOrders = [
            {
                _id: "ord001",
                invoiceId: "INV-1001",
                email: user.email,
                subtotal: 1450,
                discountPercent: 10,
                couponCode: "WELCOME10",
                totalAmount: 1305,
                createdAt: "2025-01-10",
                items: [
                    { productId: "P100", quantity: 1, price: 500 },
                    { productId: "P200", quantity: 2, price: 450 },
                ],
            },
            {
                _id: "ord002",
                invoiceId: "INV-1002",
                email: user.email,
                subtotal: 800,
                discountPercent: 0,
                couponCode: null,
                totalAmount: 800,
                createdAt: "2025-01-15",
                items: [{ productId: "P300", quantity: 1, price: 800 }],
            },
        ];

        setTimeout(() => {
            setOrders(demoOrders);
            setLoading(false);
        }, 1000);
    }, [user]);

    if (!user) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-lg font-semibold">You are not logged in</h2>
                <Link href="/my-account" className="text-blue-600 underline">
                    Login to view your dashboard
                </Link>
            </div>
        );
    }

    if (loading) return <p className="p-6 text-center">Loading dashboard…</p>;

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r shadow-sm p-6 hidden md:block">
                <h2 className="text-xl font-bold mb-6">Dashboard</h2>
                <nav className="space-y-3">
                    <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
                        Overview
                    </Link>
                    <Link href="/dashboard/orders" className="block px-3 py-2 rounded bg-blue-100 text-blue-700 font-semibold">
                        Order History
                    </Link>
                    <Link href="/dashboard/profile" className="block px-3 py-2 rounded hover:bg-gray-100">
                        Profile
                    </Link>
                    <Link href="/dashboard/settings" className="block px-3 py-2 rounded hover:bg-gray-100">
                        Settings
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Order History</h1>

                <div className="overflow-x-auto bg-white shadow rounded-lg">
                    <table className="min-w-full border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Invoice</th>
                                <th className="px-4 py-2 border">Date</th>
                                <th className="px-4 py-2 border">Subtotal</th>
                                <th className="px-4 py-2 border">Coupon</th>
                                <th className="px-4 py-2 border">Total</th>
                                <th className="px-4 py-2 border">Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                const isOpen = openRows[order._id];
                                return (
                                    <>
                                        <tr key={order._id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{order.invoiceId}</td>
                                            <td className="px-4 py-2 border">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 border">৳{order.subtotal}</td>
                                            <td className="px-4 py-2 border">
                                                {order.couponCode
                                                    ? `${order.couponCode} (-${order.discountPercent}%)`
                                                    : "-"}
                                            </td>
                                            <td className="px-4 py-2 border font-semibold">৳{order.totalAmount}</td>
                                            <td className="px-4 py-2 border text-center">
                                                <button
                                                    onClick={() =>
                                                        setOpenRows((prev) => ({
                                                            ...prev,
                                                            [order._id]: !prev[order._id],
                                                        }))
                                                    }
                                                    className="text-blue-600 underline text-sm"
                                                >
                                                    {isOpen ? "Hide Items" : "View Items"}
                                                </button>
                                            </td>
                                        </tr>

                                        {isOpen &&
                                            order.items.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td colSpan={6} className="px-4 py-2 border bg-gray-50">
                                                        <div className="grid grid-cols-3 gap-4 text-sm">
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
                                            ))}
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
