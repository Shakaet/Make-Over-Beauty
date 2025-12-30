// components/orders/SimpleViewModal.jsx
"use client"
import  {ProductDetailsModal}  from "@/app/modal/ProductDetailsModal";



const SimpleViewModal = ({ order, isOpen, onClose }) => {
    if (!isOpen || !order) return null;

    // Helper to get product display safely
    const getProductDisplay = (productId) => {
        if (!productId) return "Unknown Product";

        if (typeof productId === 'object' && productId !== null) {
            return productId.name || productId._id || "Unknown Product";
        }

        if (typeof productId === 'string') {
            // If it's a long ID, show a shortened version
            if (productId.length > 20) {
                return `Product: ${productId.substring(0, 10)}...`;
            }
            return `Product: ${productId}`;
        }

        return "Unknown Product";
    };

    // Helper to get product code safely
    const getProductCode = (productId) => {
        if (!productId) return "0000";

        let productString = "";

        if (typeof productId === 'object' && productId !== null) {
            productString = productId._id || "";
        } else if (typeof productId === 'string') {
            productString = productId;
        }

        return productString.slice(-4).padStart(4, "0");
    };

    return (
        <ProductDetailsModal
            title={order ? `Order ${order.invoiceId} — ${order.items?.length || 0} item(s)` : ""}
            open={isOpen}
            onClose={onClose}
        >
            {order && (
                <div className="space-y-4">
                    {/* Order Summary Badges */}
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200">
                            Date: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                        </span>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                            Total: ৳{order.totalAmount?.toFixed(2) || "0.00"}
                        </span>
                        {order.couponCode ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 border border-violet-100">
                                Coupon: {order.couponCode}
                            </span>
                        ) : null}
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">

                        <div>
                            <p className="text-sm text-gray-500 mb-1">Email</p>
                            <p className="font-medium text-gray-900 truncate">{order.email || "No email"}</p>
                        </div>
                        {order.phone && (
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Phone</p>
                                <p className="font-medium text-gray-900">{order.phone}</p>
                            </div>
                        )}
                        {/* <div>
                            <p className="text-sm text-gray-500 mb-1">Status</p>
                            <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-200' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 'bg-gray-100 text-gray-800 border border-gray-200'}`}>
                                {order.status?.toUpperCase() || "PENDING"}
                            </span>
                        </div> */}
                    </div>

                    {/* Order Items */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Order Items ({order.items?.length || 0})</h4>
                        <ul className="space-y-3">
                            {order.items?.map((item, idx) => {
                                const subtotal = (item.quantity || 0) * (item.price || 0);
                                const productDisplay = getProductDisplay(item.productId);
                                const code = getProductCode(item.productId);

                                return (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white grid place-items-center font-semibold">
                                            #{code}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="font-medium text-gray-900 truncate">
                                                    {productDisplay}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                                                    Qty: {item.quantity || 0}
                                                </span>
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    Price: ৳{item.price?.toFixed(2) || "0.00"}
                                                </span>
                                            </div>
                                            <div className="text-sm font-semibold text-gray-900 mt-1">
                                                Subtotal: ৳{subtotal.toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">৳{order.subtotal?.toFixed(2) || order.totalAmount?.toFixed(2) || "0.00"}</span>
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-red-600">
                                    <span>Discount</span>
                                    <span>-৳{order.discount.toFixed(2)}</span>
                                </div>
                            )}
                            {order.shippingFee > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="font-medium">৳{order.shippingFee.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="border-t border-gray-200 pt-2 mt-2">
                                <div className="flex justify-between text-base font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>৳{order.totalAmount?.toFixed(2) || "0.00"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ProductDetailsModal>
    );
};

export default SimpleViewModal;