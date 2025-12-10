'use client'
import React, { useState } from 'react'
import Faq from './Faq'
import FaqCard from './FaqCard'
import NewsUpdates from '@/app/component/NewsUpdates'
import TagUs from '@/app/component/TagUs'
import JoinUs from './JoinUs'
import Heading from '../component/Heading'


const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  

  return (
    <div className='home-bg bg-fixed bg-cover bg-center bg-no-repeat'>
      <Heading />

      <Faq />
      <FaqCard></FaqCard>
      <NewsUpdates></NewsUpdates>
      <JoinUs></JoinUs>
      <TagUs></TagUs>
    </div>
  )
}

export default Page
