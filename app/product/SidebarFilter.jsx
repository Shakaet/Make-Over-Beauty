'use client'

import { Filter } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../api/productApi'

// Helper function to get unique categories with proper counting
const getUniqueCategories = (products) => {
  const categoryMap = new Map();

  products.forEach(product => {
    if (product.category) {
      const normalized = product.category.trim();
      const key = normalized.toLowerCase();

      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          original: normalized,
          count: 0
        });
      }
      categoryMap.get(key).count++;
    }
  });

  return Array.from(categoryMap.values());
};

const SidebarFilter = ({
  products,
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange
}) => {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showPriceFilters, setShowPriceFilters] = useState(false)
  const [categoriesWithCount, setCategoriesWithCount] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllProducts(); 
        const allProducts = res.data || [];

        const categoriesData = getUniqueCategories(allProducts);

        setCategoriesWithCount(categoriesData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const prices = products.map(p => p.highprice ?? p.lowprice ?? 0)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice)

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const handlePriceChange = e => {
    const value = Number(e.target.value)
    setPriceRange([priceRange[0], value])
    setLocalMaxPrice(value)
  }

  return (
    <aside className="space-y-8">
      {/* Mobile toggle buttons */}
      <div className="lg:hidden flex justify-between mb-4">
        <button
          onClick={() => {
            setShowCategoryFilter(!showCategoryFilter)
            setShowPriceFilters(false)
          }}
          className="flex-1 bg-[#f0e3cd] mr-2 p-2 border border-gray-400 rounded-md text-sm font-semibold text-gray-800"
        >
          <span className='justify-center gap-2 items-center flex'>
            <Filter size={14} />Filter By Category
          </span>
        </button>
        <button
          onClick={() => {
            setShowPriceFilters(!showPriceFilters)
            setShowCategoryFilter(false)
          }}
          className="flex-1 bg-[#f0e3cd] mr-2 p-2 border border-gray-400 rounded-md text-sm font-semibold text-gray-800"
        >
          <span className='justify-center gap-2 items-center flex'>
            <Filter size={14} />Filter By Price
          </span>
        </button>
      </div>

      {/* Category Filter */}
      <div className={`${showCategoryFilter ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 border border-gray-400 rounded-md">
          <h4 className="bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold">
            Product Category
          </h4>
          {loading ? (
            <p className="text-sm text-gray-500">Loading categories...</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {categoriesWithCount.map(({ original, count }) => (
                <li key={original}>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(original)}
                      onChange={() => handleCategoryChange(original)}
                    />
                    <span className="ml-2">
                      {original} ({count})
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Price Filter */}
      <div className={`${showPriceFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 border border-gray-400 rounded-md">
          <h4 className="bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold">
            Filter by Price
          </h4>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={localMaxPrice}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>${minPrice?.toFixed(2)}</span>
            <span>${maxPrice?.toFixed(2)}</span>
          </div>
          <div className="text-sm mt-1">
            Price: ${priceRange[0]?.toFixed(2)} - ${priceRange[1]?.toFixed(2)}
          </div>
          <button
            className="bg-[#f0e3cd] mt-3 py-2 rounded-md w-full"
            onClick={() => setPriceRange([minPrice, localMaxPrice])}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 border border-gray-400 rounded-md">
        <h4 className="bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold">
          Search Product
        </h4>
        <input
          type="text"
          placeholder="Search products…"
          className="p-2 border border-gray-400 rounded-md w-full focus:outline-none"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Recent Products */}
      <div className="hidden lg:block p-4 border border-gray-400 rounded-md">
        <h4 className="bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold">
          Recent Products
        </h4>
        {products.slice(-3).map(product => (
          <div key={product._id} className="flex items-start space-x-3 mb-3">
            <img
              src={product.imagePrimary}
              alt={product.name}
              className="p-1 border w-16 h-16 object-cover rounded-md"
            />
            <div>
              <h5 className="font-bold text-sm">{product.name}</h5>
              <div className="text-yellow-500 text-xs">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <div className="font-bold text-xs">
                {product.highprice
                  ? `$${product.lowprice?.toFixed(2)} - $${product.highprice.toFixed(2)}`
                  : `$${product.lowprice?.toFixed(2)}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarFilter