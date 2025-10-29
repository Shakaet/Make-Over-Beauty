import React from 'react'
import Heading from '../component/Heading'
import Product from './Product'

const Page = () => {
  return (
    <div className='home-bg bg-fixed bg-cover bg-center bg-no-repeat'>
      <Heading />
      <section className='relative bg-[#f7efe6] p-6 sm:p-10 md:p-14 lg:p-20'>
        <Product />
      </section>
    </div>
  )
}

export default Page
