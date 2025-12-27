'use client'

import { useEffect } from 'react'
import ProductCard from './ProductCard'
import SidebarFilter from './SidebarFilter'
import Pagination from '../component/Pagination'
import { useProduct } from '../hooks/useProducts'

const Product = () => {
  const {
    products,
    allProducts,
    loading,
    error,
    totalPages,
    currentPage,
    totalProducts,
    searchTerm,
    selectedCategories,
    priceRange,
    sortOption,
    setSearchTerm,
    setSelectedCategories,
    setPriceRange,
    setSortOption,
    setCurrentPage,
    fetchProducts,
    fetchAllProducts 
  } = useProduct()

  useEffect(() => {
    fetchProducts()
  }, [currentPage, searchTerm, selectedCategories, priceRange, sortOption])

  useEffect(() => {
    fetchAllProducts()
  }, [searchTerm, priceRange]) // Only refetch when search/price changes

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-center">
          <p className="text-xl mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="gap-10 grid lg:grid-cols-4">
      {/* Sidebar - NOW receives ALL products for accurate counts */}
      <SidebarFilter
        products={allProducts} // CHANGED: Pass all products instead of paginated
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
            Showing {products.length} of {totalProducts} results
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md text-sm"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value="createdAt-desc">Default sorting</option>
            <option value="lowprice-asc">Price: Low to High</option>
            <option value="lowprice-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="gap-8 grid sm:grid-cols-2 lg:grid-cols-3">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={page => setCurrentPage(page)}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Product