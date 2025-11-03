import React from 'react'
import Heading from '../component/Heading'
import Login from './Login'
import Register from './Register'
import Card from './Card'
import TagUs from '../component/TagUs'

const page = () => {
  return (
    <div className='home-bg bg-fixed bg-cover bg-center bg-no-repeat'>
      <Heading />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <Login />
            <Register />
          </div>
        </div>
      </section>
      <Card></Card>
      <TagUs></TagUs>
    </div>
  )
}

export default page