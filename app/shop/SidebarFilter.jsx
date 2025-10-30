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
      {/* Search */}
      <div className='p-4 border border-gray-400'>
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

      {/* Product Category */}
      <div className='p-4 border border-gray-400'>
        <h4 className='bg-[#f0e3cd] mb-3 p-2 rounded-md font-semibold'>
          Product Category
        </h4>
        <ul className='space-y-2 text-sm'>
          {Array.from(new Set(products.map(p => p.category))).map(category => (
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
          ))}
        </ul>
      </div>

      {/* Filter by price */}
      <div className='p-4 border border-gray-400'>
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

      {/* Recent Products */}
      <div className='p-4 border border-gray-400'>
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
