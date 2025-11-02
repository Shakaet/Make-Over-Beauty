'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import SidebarFilter from './SidebarFilter'
import Pagination from '../component/Pagination'

// const products = [
//   {
//     id: 1,
//     name: 'Anti-Age Face Serum',
//     lowprice: 340.0,
//     highprice: 480.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-9.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-9.1.jpg',
//     rating: 4.5,
//     category: 'Serums'
//   },
//   {
//     id: 2,
//     name: 'Anti-Aging Face Cream',
//     lowprice: 225.0,
//     highprice: 410.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.1.jpg',
//     rating: 4.0,
//     category: 'Creams'
//   },
//   {
//     id: 3,
//     name: 'Anti-Blemish Facial Serum',
//     lowprice: 340.0,
//     highprice: 480.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-9.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-9.1.jpg',
//     rating: 3.5,
//     category: 'Serums'
//   },
//   {
//     id: 4,
//     name: 'Anti-Wrinkle Retinol Serum',
//     lowprice: 250.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.1.jpg',
//     rating: 5.0,
//     category: 'Serums'
//   },
//   {
//     id: 5,
//     name: 'Detangling Hair Spray',
//     lowprice: 350.0,
//     highprice: 410.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-9.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-9.1.jpg',
//     rating: 4.2,
//     category: 'Hair Care'
//   },
//   {
//     id: 6,
//     name: 'Dry Skin Moisturizing Body Lotion',
//     lowprice: 380.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.1.jpg',
//     rating: 4.8,
//     category: 'Lotions'
//   },
//   {
//     id: 7,
//     name: 'Anti-Blemish Facial Serum',
//     lowprice: 400.0,
//     highprice: 480.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-9.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-9.1.jpg',
//     rating: 4.1,
//     category: 'Serums'
//   },
//   {
//     id: 8,
//     name: 'Anti-Wrinkle Retinol Serum',
//     lowprice: 500.0,
//     imagePrimary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.jpg',
//     imageSecondary:
//       'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-18.1.jpg',
//     rating: 3.9,
//     category: 'Serums'
//   }
// ]

const Product = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortOption, setSortOption] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const productsPerPage = 8

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/data/products.json')
        if (!res.ok) throw new Error('Failed to load posts')
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Filter products based on search, categories, and price
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // search filter
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      // category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)

      // price filter
      const price = product.highprice ?? product.lowprice
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]

      return matchesSearch && matchesCategory && matchesPrice
    })

    // Sort filtered products
    switch (sortOption) {
      case 'price-low-high':
        filtered.sort(
          (a, b) => (a.lowprice ?? a.highprice) - (b.lowprice ?? b.highprice)
        )
        break
      case 'price-high-low':
        filtered.sort(
          (a, b) => (b.lowprice ?? b.highprice) - (a.lowprice ?? a.highprice)
        )
        break
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [searchTerm, selectedCategories, priceRange, sortOption])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  if (loading) {
    return (
      <div className='flex justify-center items-center bg-[#f7efe6] min-h-screen text-gray-700'>
        <p>Loading posts...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center items-center bg-[#f7efe6] min-h-screen text-red-500'>
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className='gap-10 grid lg:grid-cols-4'>
      <SidebarFilter
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      <div className='lg:col-span-3'>
        <img
          className='mb-8 w-full h-48 object-cover'
          src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/03/Slider-1A.jpg'
          alt='Shop Banner'
        />
        <div className='flex justify-between items-center mb-8'>
          <div className='text-gray-500 text-sm'>
            Showing {currentProducts.length} of {filteredProducts.length}{' '}
            results
          </div>
          <select
            className='p-2 border border-gray-300 rounded-md text-sm'
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value='default'>Default sorting</option>
            <option value='price-low-high'>Sort by price: low to high</option>
            <option value='price-high-low'>Sort by price: high to low</option>
            <option value='popularity'>Sort by popularity</option>
          </select>
        </div>

        <div className='gap-8 grid sm:grid-cols-2 lg:grid-cols-3'>
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className='flex justify-center mt-12'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
      <div className='lg:hidden block lg:order-1 lg:col-span-1 p-4 border border-gray-400 rounded-md'>
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
    </div>
  )
}

export default Product
