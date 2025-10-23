"use client"
import React from 'react'
import GalaryImages from './GalaryImages'

const ProductGalary = ({ images }) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
      <GalaryImages images={images}></GalaryImages>
    </div>
  )
}

export default ProductGalary