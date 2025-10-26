import React from 'react'
import Heading from '../component/Heading'
import Product from './Product'

const page = () => {
  return (
    <div className='home-bg bg-fixed bg-cover bg-center bg-no-repeat'>
      <Heading></Heading>
      <section className='relative bg-[#f7efe6] p-16 sm:p-20'>
        <Product />
      </section>
    </div>
  )
}

export default page
