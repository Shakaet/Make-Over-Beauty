'use client'
import React, { useState } from 'react'
import ContactForm from './ContactForm'
import ContactMap from './ContactMap'
import Heading from '../component/Heading'

const Page = () => {

  return (
    <div>
      <Heading />
      <ContactForm></ContactForm>
      <ContactMap></ContactMap>

    </div>
  )
}

export default Page
