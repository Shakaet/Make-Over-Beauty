import React from 'react'
import Heading from '../component/Heading'
import ProductGalary from './ProductGalary'
import Testimonial from '../component/Testimonial'
import TagUs from '../component/TagUs'

const page = () => {
  return (
    <div className="home-bg bg-fixed bg-cover bg-center bg-no-repeat">
        <Heading></Heading>
        <ProductGalary></ProductGalary>
        <Testimonial title={`ORGANIC IS THE WAY TO GO`} des={`Best Nature & Organic Sets`}></Testimonial>
        <TagUs></TagUs>
    </div>
  )
}

export default page