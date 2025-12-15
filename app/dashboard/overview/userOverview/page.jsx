'use client'

import { useContext, useEffect, useState } from "react";
import { ShoppingBag, DollarSign, Award, Clock, Eye } from "lucide-react";
import { OrderItem, StatCard } from "../../components";
import { Context } from "@/app/provider/AuthProvider";
import toast from "react-hot-toast";
import { getOrders } from "@/app/api/orderApi";
import { data } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useProduct } from "@/app/hooks/useProducts";
import ProductCard from "@/app/product/ProductCard";

export default function UserDashboardPage() {
    const router = useRouter();
    const { user, role } = useContext(Context);
    const [overview, setOverview] = useState({});
    const [loading, setLoading] = useState(true);
    const { products, fetchProducts } = useProduct();

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        if (!user) return;

        const fetchOverview = async () => {
            setLoading(true);
            try {
                const data = await getOrders(user.email);
                const orderData = data.orders || [];
                //      const totalOrders = data.totalOrders || 0;
                const totalSpent = orderData?.reduce(
                    (sum, order) => sum + order.totalAmount,
                    0
                ) || 0;
                const lastOrder = orderData?.length ? orderData[0].invoiceId : "-";

                setOverview({ ...data, totalSpent, lastOrder });
            } catch (err) {
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOverview();
    }, [user]);

    const stats = [
        {
            icon: ShoppingBag,
            value: overview.totalOrders || 0,
            label: "Total Orders",
            color: "from-pink-500 to-rose-500",
            description: "All time purchases"
        },
        {
            icon: DollarSign,
            value: `৳${(overview.totalSpent || 0).toLocaleString()}`,
            label: "Total Spent",
            color: "from-purple-500 to-pink-500",
            description: "Lifetime spending"
        },

        {
            icon: Clock,
            value: overview.lastOrder || "-",
            label: "Last Order",
            color: "from-blue-500 to-cyan-500",
            description: "Latest purchase"
        }
    ];

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            {role === 'customer' && (
                <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Recent Orders */}
                            <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
                                        <p className="text-gray-600 text-sm">Track your latest purchases</p>
                                    </div>
                                    <button className="text-[var(--pink)] hover:text-pink-700 font-semibold text-sm flex items-center gap-1">
                                        View All
                                        <Eye size={16} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {overview?.orders?.length > 0 ? (
                                        overview.orders.map((order, index) => (
                                            <OrderItem key={index} order={order} />
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                            {overview.orders && overview.orders.length > 0 ? (
                                                <div>
                                                    {overview?.orders.slice(-2).reverse().map((order, index) => (
                                                        <div key={index} className="mb-2">
                                                            <div>
                                                                <span className="font-semibold">Order ID:</span> {order.invoiceId}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold">Date:</span> {order.date}
                                                            </div>
                                                            <div>
                                                                <span className="font-semibold">Amount:</span> ৳{order.totalAmount.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No orders yet</p>
                                            )}
                                            <button
                                                onClick={() => router.push('/products')}
                                                className="mt-4 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-semibold hover:from-[var(--pink)] hover:to-rose-600 transition-all duration-300">
                                                Start Shopping
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="space-y-6">
                            {/* Loyalty Program */}
                            <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl shadow-xl p-6 text-white">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold">Coupon Program</h3>
                                        <p className="text-pink-100 text-sm">Apply coupon with every purchase</p>
                                    </div>
                                    <Award size={24} className="text-pink-200" />
                                </div>

                                <div className="mb-6">
                                    <div className="text-center mb-4">
                                        <div className="text-3xl font-bold">{overview.loyaltyPoints?.total || 0}</div>
                                        <div className="text-pink-200 text-sm">Total Coupon</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <span>Current Tier</span>
                                        <span className="font-semibold">{overview.loyaltyPoints?.tier || 'No Coupon'}</span>
                                    </div>
                                    <div className="flex items-center justify-between bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <span>Current Discount</span>
                                        <span className="font-semibold">{overview.loyaltyPoints?.currentDiscount || '0% OFF'}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Recommended Products */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 border border-pink-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Recommended For You</h3>
                                <p className="text-gray-600 text-sm">Based on your browsing history</p>
                            </div>
                            <button className="text-[var(--pink)] hover:text-pink-700 font-semibold text-sm">
                                See More
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products?.slice(0, 3).map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}