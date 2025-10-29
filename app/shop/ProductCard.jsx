import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className='group bg-[#F7F2EA] shadow-sm hover:shadow-md rounded-2xl overflow-hidden transition'>
      <div className='relative'>
        <img
          src={product.imagePrimary}
          alt={product.name}
          className='group-hover:opacity-0 w-full h-64 object-cover transition duration-300'
        />
        <img
          src={product.imageSecondary}
          alt={product.name}
          className='top-0 left-0 absolute opacity-0 group-hover:opacity-100 w-full h-64 object-cover transition duration-300'
        />
      </div>
      <div className='px-4 py-5 text-center'>
        <h3 className='font-medium text-sm sm:text-base'>{product.name}</h3>
        <div className='mt-2'>
          <span className='text-yellow-500'>
            {'★'.repeat(Math.floor(product.rating))}
          </span>
          <span className='text-yellow-500'>
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
        </div>
        <div className='mt-2 text-sm'>
          {product.highprice
            ? `$${product.lowprice.toFixed(2)} - $${product.highprice.toFixed(
                2
              )}`
            : `$${product.lowprice.toFixed(2)}`}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
