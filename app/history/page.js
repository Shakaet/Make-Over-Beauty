import React from 'react'
import BeautyDestination from './BeautyDestination'
import HarbalCosmetics from './HarbalCosmetics'
import WhatsPeopleSay from '@/app/component/WhatsPeopleSay'
import MarqueLogo from '@/app/component/MarqueLogo'
import PremiumCound from './PremiumCound'
import NewsUpdates from '@/app/component/NewsUpdates'
import Heading from '../component/Heading'

const Page = () => {
  return (
    <div className="home-bg bg-fixed bg-cover bg-center bg-no-repeat">
      <Heading />
      <BeautyDestination></BeautyDestination>
      <HarbalCosmetics></HarbalCosmetics>
      <WhatsPeopleSay></WhatsPeopleSay>
      <MarqueLogo></MarqueLogo>
      <NewsUpdates></NewsUpdates>
      <PremiumCound></PremiumCound>
    </div>
  )
}

export default Page


