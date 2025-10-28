import React from 'react'
import Heading from '../component/Heading'
import AboutHero from './AboutHero'
import FeatureSection from './FeatureSection'
import Team from './Team'
import Stats from './Stats'

const page = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading></Heading>
      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <AboutHero />
        <FeatureSection />
        <Team />
        <Stats />
      </section>
    </div>
  )
}

export default page
