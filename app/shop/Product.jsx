'use client'

import { useEffect, useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import SidebarFilter from './SidebarFilter'
import Pagination from '../component/Pagination'
import api from '../libs/axios'

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
    const fetchProducts = async () => {
      try {
        const res = await api.get('/api/products/all-products')
        console.log(res.data)
        setProducts(res.data.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)
      const price = product.highprice ?? product.lowprice
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })

    switch (sortOption) {
      case 'price-low-high':
        filtered.sort((a, b) => (a.lowprice ?? a.highprice) - (b.lowprice ?? b.highprice))
        break
      case 'price-high-low':
        filtered.sort((a, b) => (b.lowprice ?? b.highprice) - (a.lowprice ?? a.highprice))
        break
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }

    return filtered
  }, [products, searchTerm, selectedCategories, priceRange, sortOption])

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>

  return (
    <div className="gap-10 grid lg:grid-cols-4">
      {/* Sidebar */}
      <SidebarFilter
        products={products}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {/* Main Content */}
      <div className="lg:col-span-3">
        <img
          className="mb-8 w-full h-48 object-cover rounded-md"
          src="https://wdtlilac.wpengine.com/wp-content/uploads/2023/03/Slider-1A.jpg"
          alt="Shop Banner"
        />

        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-500 text-sm">
            Showing {currentProducts.length} of {filteredProducts.length} results
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md text-sm"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="default">Default sorting</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>

        <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
          {currentProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Product
