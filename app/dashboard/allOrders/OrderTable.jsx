// components/orders/OrderTable.jsx
import { format } from "date-fns";
import { Trash2, Eye, Download } from "lucide-react";
import { useState } from "react";
import SimpleViewModal from "./SimpleViewModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

const OrderTable = ({ orders, onDelete }) => {
    console.log(orders)
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);


    const formatCurrency = (amount) => {
        if (!amount) return "$0.00";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        setIsViewModalOpen(true);
    };

    console.log("orderToDelete: ", orderToDelete)

    const handleConfirmDelete = async () => {
        if (!orderToDelete) return;

        try {
            setIsDeleting(true);
            await onDelete(orderToDelete._id);
            setIsDeleteModalOpen(false);
            setOrderToDelete(null);
        } catch (error) {
            console.error("Delete failed:", error);
        } finally {
            setIsDeleting(false);
        }
    };



    return (
        <>
            <div className="overflow-x-auto bg-[#FFF7F5] p-6 rounded-xl shadow-sm border border-pink-100">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-pink-50 to-rose-50 text-gray-700">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Invoice</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Coupon</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Coupon (%)</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                            <tr
                                key={order._id} className="hover:bg-pink-50/50 transition-all duration-200 rounded-lg"
                            >
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="text-sm font-semibold text-pink-700">
                                            {order.invoiceId || `ORD-${order._id?.slice(-8) || "N/A"}`}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                            {order.items?.length || 0} item(s)
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="px-3 py-1 text-xs rounded-full bg-blue-50 text-blue-700 border border-blue-200 w-fit">
                                        {order.email || "No email"}
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {order.customerName || ""}
                                    </div>
                                    {order.phone && (
                                        <div className="text-xs text-gray-400 mt-1">{order.phone}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {order.createdAt ? format(new Date(order.createdAt), "MMM dd, yyyy") : "N/A"}
                                    </div>
                                    <div className="text-sm text-blue-500">
                                        {order.createdAt ? format(new Date(order.createdAt), "hh:mm a") : ""}
                                    </div>
                                </td>
                                <td className="px-6 py-4  ">
                                    <span className="px-3 py-1 text-xs rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                                        {order.couponCode}
                                    </span>
                                </td>
                                <td className="px-6 py-4  ">
                                    {order.discountPercent != null ? (
                                        <span className="px-3 py-1 text-xs rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                            -{order.discountPercent}%
                                        </span>
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-lg font-bold text-gray-900">
                                        {formatCurrency(order.totalAmount)}
                                    </div>
                                    <div className="text-sm text-red-600 line-through">
                                        {formatCurrency(order.subtotal)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleViewDetails(order)}
                                            className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors border border-blue-100"
                                            title="View Order Details"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-50 transition-colors border border-green-100"
                                            title="Download Invoice"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOrderToDelete(order);
                                                setIsDeleteModalOpen(true);
                                            }}
                                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors border border-red-100"
                                            title="Delete Order"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {orders.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-gray-400 mb-6">
                            <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Try adjusting your search filters or create a new order to get started.
                        </p>
                    </div>
                )}
            </div>

            {/* Simple View Modal - Triggered by Eye button */}
            <SimpleViewModal
                order={selectedOrder}
                isOpen={isViewModalOpen}
                onClose={() => {
                    setIsViewModalOpen(false);
                    setSelectedOrder(null);
                }}
            />

            <DeleteConfirmModal
                open={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setOrderToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                isLoading={isDeleting}
                title={`Delete Order ${orderToDelete?.invoiceId || ""}`}
                description={
                    <>
                        {/* 
        console.log("orderToDelete: ", orderToDelete) it is just  id */}
                        Are you sure you want to delete this order?
                        <div className="mt-2 text-sm text-gray-600">
                            <strong>Customer:</strong> {orderToDelete?.email}<br />
                            <strong>Total:</strong> {formatCurrency(orderToDelete?.totalAmount)}
                        </div>
                    </>
                }
                confirmText="Delete Order"
            />

        </>
    );
};

export default OrderTable;