import { Search, SlidersHorizontal } from "lucide-react";

// FilterPanel Component
export const ProductFilter = ({
    searchTerm,
    setSearchTerm,
    showFilters,
    setShowFilters,
    sortOption,
    setSortOption,
    categories,
    selectedCategories,
    toggleCategory,
    priceRange,
    setPriceRange
}) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 my-4 border border-pink-200 shadow-2xl">

            {showFilters && (
                <div className="mt-6 pt-6 border-t border-pink-200 space-y-4">
                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold text-sm">Sort By</label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full px-4 py-3 bg-[#fff6f0] border border-pink-200 rounded-2xl text-pink-900 focus:outline-none focus:border-pink-500 transition-all"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>
                            <option value="lowprice-asc">Price: Low to High</option>
                            <option value="lowprice-desc">Price: High to Low</option>
                            <option value="rating-desc">Highest Rated</option>
                            <option value="name-asc">Name: A to Z</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold text-sm">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategories.includes(cat)
                                        ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                                        : 'bg-[#fff6f0] text-pink-900 hover:bg-pink-100 border border-pink-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-pink-900 mb-2 font-semibold text-sm">
                            Price Range: ${priceRange[0]} - ${priceRange[1]}
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="number"
                                placeholder="Min"
                                value={priceRange[0]}
                                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                                className="flex-1 px-4 py-2 bg-[#fff6f0] border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-400 transition-all"
                            />
                            <input
                                type="number"
                                placeholder="Max"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
                                className="flex-1 px-4 py-2 bg-[#fff6f0] border border-pink-200 rounded-xl text-pink-900 focus:outline-none focus:border-pink-400 transition-all"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}