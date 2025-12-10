import React from 'react'
import Heading from '../component/Heading'
import Product from './Product'

const ProductPage = () => {
  return (
    <div className='home-bg bg-fixed bg-cover bg-center bg-no-repeat'>
      <Heading />
      <section className='relative bg-[#f7efe6] px-4 py-10 sm:px-8 md:px-10 lg:px-16 xl:px-20'>
        <Product />
      </section>
    </div>
  )
}

export default ProductPage
