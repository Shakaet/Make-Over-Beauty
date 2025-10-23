import React from 'react'
import Heading from '../component/Heading'
import ProductGalary from './ProductGalary'
import Testimonial from '../component/Testimonial'
import TagUs from '../component/TagUs'
import GalaryImages from './GalaryImages'
import Category from './Category'
import GalleryClient from './GalleryClient'

const page = () => {
  return (
    <div className="home-bg bg-fixed bg-cover bg-center bg-no-repeat">
        <Heading></Heading>
        <section className="relative bg-[#f7efe6] py-16 sm:py-20">
          <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
            <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-black/70">Organic is the way to go</p>
            <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-black">Our Product Gallery</h2>
          </div>
            <GalleryClient />
        </section>
    </div>
  )
}

export default page