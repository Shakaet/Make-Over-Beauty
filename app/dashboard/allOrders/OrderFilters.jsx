// components/orders/OrderFilters.jsx
import { Search, Filter } from "lucide-react";
import { useState } from "react";

const OrderFilters = ({ filters, onFilterChange, showFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onFilterChange(newFilters);
    };

    const handleReset = () => {
        const resetFilters = {
            search: "",
            email: "",
            sortBy: "createdAt",
            order: "desc",
        };
        setLocalFilters(resetFilters);
        onFilterChange(resetFilters);
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 my-4 border border-pink-200 shadow-2xl">

            {showFilters && (
                <div className="mt-4 pt-6 border-t border-pink-200 space-y-4">
                    {/* Email Filter */}
                    <div>
                        <label className="block text-sm font-semibold text-pink-700 mb-2">
                            Customer Email
                        </label>
                        <input
                            type="email"
                            value={localFilters.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            placeholder="Filter by email..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        />
                    </div>

                    <div className="pb-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-semibold text-pink-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={localFilters.sortBy}
                                onChange={(e) => handleChange("sortBy", e.target.value)}
                                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition bg-pink-50"
                            >
                                <option value="createdAt">Newest First</option>
                                <option value="totalAmount">Total Amount</option>
                                <option value="invoiceId">Invoice ID</option>
                            </select>
                        </div>


                        {/* Order */}
                        <div>
                            <label className="block text-sm font-semibold text-pink-700 mb-2">
                                Order
                            </label>
                            <select
                                value={localFilters.order}
                                onChange={(e) => handleChange("order", e.target.value)}
                                className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300 outline-none transition bg-pink-50"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                    onClick={handleReset}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default OrderFilters;