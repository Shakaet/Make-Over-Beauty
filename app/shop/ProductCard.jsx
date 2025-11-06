
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-[#F7F2EA] shadow-sm hover:shadow-md rounded-2xl overflow-hidden transition duration-300">
      {/* Product Images */}
      <div className="relative">
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-[#E8D8C0] text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* Stock Badge */}
        <div
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${product.stock && product.stock > 0
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }`}
        >
          {product.stock && product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </div>

        <img
          src={product.imagePrimary}
          alt={product.name}
          className="group-hover:opacity-0 w-full h-64 object-cover transition duration-500"
        />
        <img
          src={product.imageSecondary}
          alt={product.name}
          className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 w-full h-64 object-cover transition duration-500"
        />

        {/* Details Button */}
        <Link
          href={`/shop/products/${product._id}`}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#E8D8C0] hover:bg-[#dec5a4] opacity-0 group-hover:opacity-100 shadow-md px-6 py-2 rounded-full font-medium text-gray-900 transition duration-300"
        >
          View Details
        </Link>
      </div>

      {/* Product Info */}
      <div className="px-4 py-5 text-center">
        <h3 className="font-medium text-sm sm:text-base text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-2 flex items-center justify-center">
          <div className="text-yellow-500 text-sm">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="mt-3 text-sm">
          {product.discount ? (
            <div className="flex justify-center items-center gap-2">
              <span className="text-gray-500 line-through">
                ${product.lowprice.toFixed(2)}
              </span>
              <span className="text-gray-900 font-semibold">
                ${((product.lowprice * (100 - product.discount)) / 100).toFixed(2)}
              </span>
            </div>
          ) : product.highprice ? (
            <span>
              ${product.lowprice.toFixed(2)} - ${product.highprice.toFixed(2)}
            </span>
          ) : (
            <span>${product.lowprice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart */}
        <div className="mt-4">
          <button
            type="button"
            disabled={!product.stock || product.stock === 0}
            className={`block mx-auto w-full md:w-3/4 font-medium text-gray-900 rounded-full shadow-md px-6 py-2 transition duration-200 ${product.stock && product.stock > 0
                ? 'bg-[#E8D8C0] hover:bg-[#dec5a4]'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
          >
            {product.stock && product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductCard
