'use client'

import { useContext, useEffect, useState } from "react";
import { DollarSign, Users, Package, ShoppingBagIcon } from "lucide-react";
import { TopProductItem, AdminOrderItem, AdminStatCard } from "../../components";
import AreaChart from "../../components/AreaChart";
import { useProduct } from "@/app/hooks/useProducts";
import { Context } from "@/app/provider/AuthProvider";
import { getAllOrders } from "@/app/api/orderApi";
import ProductCard from "@/app/product/ProductCard";
import { userApi } from "@/app/api/userApi";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdminDashboard() {
    const { user, role } = useContext(Context);

    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const { allProducts, fetchAllProducts } = useProduct();

    /* ---------------- PRODUCTS ---------------- */
    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    /* ---------------- ORDERS ---------------- */
    useEffect(() => {
        if (!user) return;

        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                const orderList = res?.data || [];
                console.log('orderList', orderList)

                const revenue = orderList.reduce(
                    (sum, order) => sum + (order.totalAmount || 0),
                    0
                );

                setOrders(orderList);
                setTotalRevenue(revenue);
            } catch (error) {
                toast.error("Failed to fetch orders");
            }
        };

        fetchOrders();
    }, [user]);

    /* ---------------- USERS ---------------- */
    useEffect(() => {
        if (!user || role !== 'admin') return;

        const fetchUsers = async () => {
            let usersData = [];

            try {
                const res = await userApi.getAllUsers();
                usersData = res?.data || res;
            } catch (err) {
                try {
                    const token = localStorage.getItem('accessToken');
                    const res = await axios.get(
                        'https://beauty-server-nine.vercel.app/api/users',
                        {
                            headers: token ? { Authorization: `Bearer ${token}` } : {}
                        }
                    );
                    usersData = res?.data?.data || res?.data;
                } catch (finalErr) {
                    toast.error("Failed to fetch users");
                }
            }

            setUsers(usersData || []);
        };

        fetchUsers();
    }, [user, role]);

    /* ---------------- STATS ---------------- */
    const adminCards = [
        {
            icon: DollarSign,
            value: `৳${totalRevenue.toLocaleString()}`,
            label: "Total Revenue",
            color: "from-emerald-500 to-green-500",
            description: "All time revenue"
        },
        {
            icon: ShoppingBagIcon,
            value: orders.length,
            label: "Total Orders",
            color: "from-blue-500 to-cyan-500",
            description: "Completed & pending orders"
        },
        {
            icon: Users,
            value: users.length,
            label: "Total Users",
            color: "from-purple-500 to-pink-500",
            description: "Registered users"
        },
        {
            icon: Package,
            value: allProducts?.length || 0,
            label: "Total Products",
            color: "from-orange-500 to-yellow-500",
            description: "Active products"
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            {role === 'customer' && (
                <div className="space-y-8">

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {adminCards.map((stat, index) => (
                            <AdminStatCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Charts + Orders */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="bg-white col-span-2 rounded-3xl shadow-xl p-6 border border-pink-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Order Analytics
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Monthly order trends
                            </p>
                            <div className="h-64">
                                <AreaChart />
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                                Recent Orders
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Latest transactions
                            </p>

                            <div className="space-y-4">
                                {orders.slice(0, 3).map(order => (
                                    <div key={order.invoiceId} className="flex items-center justify-between p-3 bg-pink-50 rounded-xl hover:bg-pink-100 transition-colors duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                                                <Package size={20} className="text-pink-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">{order.invoiceId}</h4>
                                                <p className="text-sm text-gray-600">{order.email}</p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="font-bold text-gray-800 mb-1">৳{order.totalAmount}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                            Top Products
                        </h3>
                        <p className="text-gray-600 text-sm mb-6">
                            Best selling items
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {allProducts?.slice(0, 4).map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
