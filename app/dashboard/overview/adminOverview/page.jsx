'use client'

import { useContext, useEffect, useState } from "react";
import { DollarSign, Users, Package, ShoppingBagIcon } from "lucide-react";
import { TopProductItem, AdminOrderItem, AdminStatCard, } from "../../components";
import AreaChart from "../../components/AreaChart";
import { useProduct } from "@/app/hooks/useProducts";
import { Context } from "@/app/provider/AuthProvider";

export default function AdminDashboard() {
    const { role } = useContext(Context);

    const { allProducts, fetchAllProducts } = useProduct();

    useEffect(() => {
        fetchAllProducts()
    }, [])

    console.log(allProducts)

    const adminStats = {
        totalRevenue: 125000,
        monthlyGrowth: 8.5,
        totalUsers: 4520,
        totalProducts: 320,
        conversionRate: 4.7,
        revenueData: [
            { month: 'Jan', revenue: 8000 },
            { month: 'Feb', revenue: 9500 },
            { month: 'Mar', revenue: 12000 },
        ],
        userGrowth: [
            { month: 'Jan', users: 300 },
            { month: 'Feb', users: 450 },
            { month: 'Mar', users: 600 },
        ],
        systemMetrics: [
            { name: 'CPU Usage', value: '65%', trend: 'up' },
            { name: 'Memory Usage', value: '72%', trend: 'down' },
        ],
        recentOrders: [
            { id: 'ORD12345', customer: 'John Doe', amount: 250, status: 'Completed', date: '2024-06-15' },
            { id: 'ORD12346', customer: 'Jane Smith', amount: 450, status: 'Pending', date: '2024-06-14' },
        ],
        topProducts: [
            { name: 'Product A', sales: 1500, revenue: 30000 },
            { name: 'Product B', sales: 1200, revenue: 24000 },
        ]
    };
    const adminCards = [
        {
            icon: DollarSign,
            value: `৳${adminStats.totalRevenue.toLocaleString() || '-'}`,
            label: "Total Revenue",
            trend: "up",
            color: "from-emerald-500 to-green-500",
            description: "Monthly recurring revenue"
        },
        {
            icon: ShoppingBagIcon,
            value: adminStats.totalOrder || '0',
            label: "Total Orders",
            trend: "up",
            color: "from-blue-500 to-cyan-500",
            description: "Active orders"
        },
        {
            icon: Users,
            value: adminStats.totalUsers.toLocaleString() || '-',
            label: "Total Users",
            trend: "up",
            color: "from-purple-500 to-pink-500",
            description: "Active in last 30 days"
        },
        {
            icon: Package,
            value: adminStats.totalProducts || '-',
            label: "Total Products",
            trend: "up",
            color: "from-blue-500 to-cyan-500",
            description: "Active products"
        },
    ];

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            {role === 'admin' && (
                <div className="space-y-8">
                    {/* Admin Stats */}
                    < div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {adminCards.map((stat, index) => (
                            <AdminStatCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* User Chart */}
                        <div className="bg-white rounded-3xl grid col-span-2 shadow-xl p-6 border border-pink-100">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Order Analytics</h3>
                                    <p className="text-gray-600 text-sm">Monthly Order trends</p>
                                </div>

                            </div>

                            <div className="h-64 bg-gradient-to-b from-pink-50 to-transparent rounded-xl p-4">

                                <div className="h-full flex items-end gap-2">
                                    <AreaChart />
                                </div>

                            </div>
                        </div>
                        {/* Recent Orders */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                                    <p className="text-gray-600 text-sm">Latest customer transactions</p>
                                </div>
                                <button className="text-[var(--pink)] hover:text-pink-700 font-semibold text-sm">
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {adminStats.recentOrders.slice(0, 5).map((order) => (
                                    <AdminOrderItem key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tables Section */}
                    <div className="w-full gap-8">


                        {/* Top Products */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Top Products</h3>
                                    <p className="text-gray-600 text-sm">Best selling items by revenue</p>
                                </div>
                                <ShoppingBagIcon className="text-pink-500" size={24} />
                            </div>

                            <div className="space-y-4">
                                {adminStats.topProducts.slice(0, 5).map((product, index) => (
                                    <TopProductItem key={index} product={product} index={index + 1} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Admin Actions */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <QuickAdminAction
                        icon={Users}
                        label="Manage Users"
                        description="View and manage all users"
                        color="bg-purple-500"
                        count={adminStats.totalUsers}
                        onClick={() => router.push('/dashboard/users')}
                    />
                    <QuickAdminAction
                        icon={Package}
                        label="Manage Products"
                        description="Add/edit products"
                        color="bg-blue-500"
                        count={adminStats.totalProducts}
                        onClick={() => router.push('/dashboard/products')}
                    />
                    <QuickAdminAction
                        icon={ShoppingBag}
                        label="Order Management"
                        description="Process and track orders"
                        color="bg-pink-500"
                        count={adminStats.recentOrders.length}
                        onClick={() => router.push('/dashboard/orders')}
                    />
                    <QuickAdminAction
                        icon={Settings}
                        label="System Settings"
                        description="Configure platform settings"
                        color="bg-gray-500"
                        onClick={() => router.push('/dashboard/settings')}
                    />

                </div> */}
                </div >)
            }
        </div >
    );
}