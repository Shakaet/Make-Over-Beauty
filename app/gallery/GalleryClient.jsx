"use client"
import React, { useMemo, useState } from 'react'
import Category from './Category'
import ProductGalary from './ProductGalary'
import Testimonial from '../component/Testimonial'
import TagUs from '../component/TagUs'

const CATEGORIES = ['Filtered List', 'Selected List', 'Skincare', 'Makeup', 'Haircare']

function getCategoryData(category) {
  // In a real app, fetch by category; here we swap sources per tab for demo
  switch (category) {
    case 'Filtered List':
      return {
        videos: [
          'https://videos.pexels.com/video-files/4154241/4154241-uhd_4096_2160_25fps.mp4',
          'https://videos.pexels.com/video-files/3886376/3886376-uhd_4096_2160_25fps.mp4',
          'https://videos.pexels.com/video-files/3181791/3181791-uhd_3840_2160_25fps.mp4',
        ],
        tagImages: ['/images/cream.png','/images/makeup3.webp','/images/makeuo4.webp','/images/makeup5.jpeg'],
        galleryImages: ['/images/download.jpeg','/images/makeup1.jpeg','/images/cream.png','/images/makeup2.png','/images/makeup5.jpeg','/images/makeup3.webp'],
      }
    case 'Selected List':
      return {
        videos: [
          'https://videos.pexels.com/video-files/2698866/2698866-uhd_2560_1440_25fps.mp4',
          'https://videos.pexels.com/video-files/3689088/3689088-uhd_2560_1440_25fps.mp4',
          'https://videos.pexels.com/video-files/3757195/3757195-uhd_4096_2160_24fps.mp4',
        ],
        tagImages: ['/images/makeup5.jpeg','/images/cream.png','/images/makeup3.webp','/images/makeuo4.webp'],
        galleryImages: ['/images/cream.png','/images/makeup3.webp','/images/download.jpeg','/images/makeup5.jpeg','/images/makeup2.png','/images/makeup1.jpeg'],
      }
    case 'Skincare':
      return {
        videos: [
          'https://videos.pexels.com/video-files/3181791/3181791-uhd_3840_2160_25fps.mp4',
          'https://videos.pexels.com/video-files/3886376/3886376-uhd_4096_2160_25fps.mp4',
          'https://videos.pexels.com/video-files/4154241/4154241-uhd_4096_2160_25fps.mp4',
        ],
        tagImages: ['/images/cream.png','/images/makeup5.jpeg','/images/makeup3.webp','/images/makeuo4.webp'],
        galleryImages: ['/images/cream.png','/images/download.jpeg','/images/makeup3.webp','/images/makeup5.jpeg','/images/makeup2.png','/images/makeup1.jpeg'],
      }
    case 'Makeup':
      return {
        videos: [
          'https://videos.pexels.com/video-files/3757195/3757195-uhd_4096_2160_24fps.mp4',
          'https://videos.pexels.com/video-files/2698866/2698866-uhd_2560_1440_25fps.mp4',
          'https://videos.pexels.com/video-files/3886376/3886376-uhd_4096_2160_25fps.mp4',
        ],
        tagImages: ['/images/makeup5.jpeg','/images/makeuo4.webp','/images/makeup3.webp','/images/cream.png'],
        galleryImages: ['/images/makeup1.jpeg','/images/makeup2.png','/images/makeup3.webp','/images/makeup5.jpeg','/images/makeuo4.webp','/images/cream.png'],
      }
    case 'Haircare':
      return {
        videos: [
          'https://videos.pexels.com/video-files/3689088/3689088-uhd_2560_1440_25fps.mp4',
          'https://videos.pexels.com/video-files/2698866/2698866-uhd_2560_1440_25fps.mp4',
          'https://videos.pexels.com/video-files/4154241/4154241-uhd_4096_2160_25fps.mp4',
        ],
        tagImages: ['/images/makeuo4.webp','/images/makeup3.webp','/images/cream.png','/images/makeup5.jpeg'],
        galleryImages: ['/images/download.jpeg','/images/makeup5.jpeg','/images/cream.png','/images/makeup3.webp','/images/makeup1.jpeg','/images/makeup2.png'],
      }
    default:
      return { videos: [], tagImages: [] }
  }
}

const GalleryClient = () => {
  const [selected, setSelected] = useState(CATEGORIES[0])
  const data = useMemo(() => getCategoryData(selected), [selected])

  return (
    <div className='mt-10'>
      <Category categories={CATEGORIES} selected={selected} onSelect={setSelected} />

      {/* Dynamic grid images per category */}
      <ProductGalary images={data.galleryImages} />

      {/* Dynamically driven sections */}
      <Testimonial title={selected.toUpperCase()} des={`Best ${selected} Sets`} videos={data.videos} />
      <TagUs images={data.tagImages} />
    </div>
  )
}

export default GalleryClient

