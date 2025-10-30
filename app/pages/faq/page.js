import React from 'react'
import Heading from '../../component/Heading'
import Faq from './Faq'
import FaqCard from './FaqCard'
import NewsUpdates from '@/app/component/NewsUpdates'
import TagUs from '@/app/component/TagUs'
import JoinUs from './JoinUs'

const Page = () => {
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


