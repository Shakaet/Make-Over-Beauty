'use client'

import React, { useState, useEffect } from 'react'

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

  const prices = products.map(p => p.price ?? p.lowprice ?? 0) // get prices
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice)

  // Reset price range if products change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
    setLocalMaxPrice(maxPrice)
  }, [minPrice, maxPrice])

  const handleCategoryChange = category => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter(item => item !== category)
      )
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
    <aside className='space-y-8'>
      {/* Mobile toggle buttons */}
      <div className='lg:hidden flex justify-between mb-4'>
        <button
          onClick={() => {
            setShowCategoryFilter(!showCategoryFilter)
            setShowPriceFilters(false)
          }}
          className='flex-1 bg-[#f0e3cd] mr-2 p-2 border border-gray-400 rounded-md font-semibold text-gray-800'
        >
          <span className='flex justify-center items-center gap-2 text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z'
              />
            </svg>
            Category
          </span>
        </button>
        <button
          onClick={() => {
            setShowPriceFilters(!showPriceFilters)
            setShowCategoryFilter(false)
          }}
          className='flex-1 bg-[#f0e3cd] ml-2 p-2 border border-gray-400 rounded-md font-semibold text-gray-800'
        >
          <span className='flex justify-center items-center gap-2 text-base'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='size-5'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
            Price Range
          </span>
        </button>
      </div>

      {/* Category & Price Filters */}
      <div
        className={`space-y-8 ${
          showCategoryFilter ? 'block' : 'hidden'
        } lg:block`}
      >
        {/* Product Category */}
        <div className='p-4 border border-gray-400 rounded-md'>
          <h4 className='bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold'>
            Product Category
          </h4>
          <ul className='space-y-2 text-sm'>
            {Array.from(new Set(products.map(p => p.category))).map(
              category => (
                <li key={category}>
                  <label>
                    <input
                      type='checkbox'
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className='ml-2'>
                      {category} (
                      {products.filter(p => p.category === category).length})
                    </span>
                  </label>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Price Filter */}
      <div
        className={`p-4 border border-gray-400 rounded-md ${
          showPriceFilters ? 'block' : 'hidden'
        } lg:block`}
      >
        {/* Filter by price */}
        <div className='p-4 border border-gray-400 rounded-md'>
          <h4 className='bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold'>
            Filter by Price
          </h4>
          <div>
            <input
              type='range'
              min={minPrice}
              max={maxPrice}
              value={localMaxPrice}
              onChange={handlePriceChange}
              className='w-full'
            />
            <div className='flex justify-between text-sm'>
              <span>${minPrice.toFixed(2)}</span>
              <span>${maxPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className='text-sm'>
                Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
              </span>
            </div>
          </div>
          <button
            className='bg-[#f0e3cd] mt-4 py-2 rounded-md w-full'
            onClick={() => setPriceRange([minPrice, localMaxPrice])}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Search Section */}
      <div className={`p-4 border border-gray-400 rounded-md `}>
        <h4 className='bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold'>
          Search Product
        </h4>
        <input
          type='text'
          placeholder='Search products…'
          className='p-2 border border-gray-400 rounded-md focus:outline-none w-full'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Recent Products */}
      <div className='hidden lg:block p-4 border border-gray-400 rounded-md'>
        <h4 className='bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold'>
          Recent Products
        </h4>
        {products.slice(-3).map(product => (
          <div key={product.id} className='flex items-start space-x-3 mb-3'>
            <img
              src={product.imagePrimary}
              alt={product.name}
              className='p-1 border w-16 h-16 object-cover'
            />
            <div>
              <h5 className='font-bold text-sm'>{product.name}</h5>
              <div>
                <span className='text-yellow-500'>
                  {'★'.repeat(Math.floor(product.rating))}
                </span>
                <span className='text-yellow-500'>
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
              </div>
              <div className='font-bold text-xs'>
                {product.highprice
                  ? `$${product.lowprice.toFixed(
                      2
                    )} - $${product.highprice.toFixed(2)}`
                  : `$${product.lowprice.toFixed(2)}`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SidebarFilter
