// app/dashboard/allOrders/page.jsx
"use client";

import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderFilters from "./OrderFilters";
import { toast, Toaster } from "react-hot-toast";
import { deleteOrder, getAllOrders } from "@/app/api/orderApi";
import { Search, SlidersHorizontal } from "lucide-react";

export default function AllOrdersPage() {
    const [showFilters, setShowFilters] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalOrders: 0,
        totalPages: 1,
    });
    const [filters, setFilters] = useState({
        search: "",
        email: "",
        sortBy: "createdAt",
        order: "desc",
    });

    // Validate and transform orders data
    const validateOrders = (data) => {
        if (!Array.isArray(data)) return [];

        return data.map(order => ({
            _id: order._id || `order-${Math.random().toString(36).substr(2, 9)}`,
            invoiceId: order.invoiceId || `ORD-${(order._id || "").slice(-8)}`,
            customerName: order.customerName || "",
            email: order.email || "No email provided",
            number: order.number || "",
            status: order.status || "pending",
            paymentStatus: order.paymentStatus || "unpaid",
            totalAmount: order.totalAmount || 0,
            subtotal: order.subtotal || order.totalAmount || 0,
            discountPercent: order.discountPercent || 0,
            shippingFee: order.shippingFee || 0,
            tax: order.tax || 0,
            couponCode: order.couponCode || "",
            shippingAddress: order.shippingAddress || "",
            createdAt: order.createdAt || new Date().toISOString(),
            items: Array.isArray(order.items) ? order.items.map(item => ({
                productId: item.productId || "Unknown Product",
                quantity: item.quantity || 0,
                price: item.price || 0,
                sku: item.sku || "",
                _id: item._id || `item-${Math.random().toString(36).substr(2, 9)}`
            })) : [],
            // Safely handle populated product data
            ...(typeof order.productId === 'object' && order.productId ? {
                productDetails: order.productId
            } : {})
        }));
    };

    // Fetch orders
    const fetchOrders = async () => {
        try {
            setLoading(true);
            const params = {
                ...filters,
                page: pagination.page,
                limit: pagination.limit,
            };

            const data = await getAllOrders(params);

            // Validate and transform the data
            const validatedOrders = validateOrders(data.data || []);

            setOrders(validatedOrders);
            setPagination(prev => ({
                ...prev,
                totalOrders: data.totalOrders || 0,
                totalPages: data.totalPages || 1,
            }));
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [filters, pagination.page, pagination.limit]);

    // Handle filter changes
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            toast.success("Order deleted successfully");
            fetchOrders();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete order");
        }
    };


    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        handleFilterChange(newFilters);
    };

    // Calculate stats
    // const calculateStats = () => {
    //     const totalAmount = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    //     const completedOrders = orders.filter(order =>
    //         (order.status || "").toLowerCase() === "completed"
    //     ).length;
    //     const pendingOrders = orders.filter(order =>
    //         ["pending", "processing"].includes((order.status || "").toLowerCase())
    //     ).length;
    //     const totalItems = orders.reduce((sum, order) =>
    //         sum + (order.items?.length || 0), 0
    //     );

    //     return {
    //         totalAmount,
    //         completedOrders,
    //         pendingOrders,
    //         totalItems,
    //         averageOrder: orders.length > 0 ? totalAmount / orders.length : 0,
    //     };
    // };

    // const stats = calculateStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#fff6f0] to-[#fff0e8] p-4 md:p-8">
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">
                            Order Management
                        </h1>
                        <p className="text-[var(--pink)] pt-2">
                            Manage and track all customer orders in one place
                        </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-rose-100 shadow-sm text-sm text-gray-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" /> {orders.length} Orders
                    </span>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-4 mb-6 border border-white/20 shadow-2xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 ">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--pink)]" size={20} />
                            <input type="text"
                                placeholder="Search by invoice ID..."
                                value={localFilters.search}
                                onChange={(e) => handleChange(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[var(--pink)] placeholder-pink-300 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 transition-all" />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="px-6 py-1 bg-[var(--pink)]/90 border border-pink-500/10 rounded-2xl text-white hover:bg-pink-400/90 transition-all flex items-center gap-2 justify-center">
                            <SlidersHorizontal size={20} />
                            Filters
                        </button>
                    </div>

                    {showFilters && (
                        <OrderFilters
                            filters={filters}
                            showFilters={showFilters}
                            onFilterChange={handleFilterChange}
                        />
                    )}
                </div>

                <div className="mx-auto">
                    {loading ? (
                        <div className="p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                            <p className="mt-4 text-gray-600">Loading orders...</p>
                        </div>
                    ) : (
                        <OrderTable
                            orders={orders}
                            onDelete={handleDeleteOrder}
                        />
                    )}

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Page {pagination.page} of {pagination.totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page === pagination.totalPages}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}