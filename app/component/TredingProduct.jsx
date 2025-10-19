import React from 'react'
import Image from 'next/image'
import imgBody from '../images/makeup1.jpeg'
import imgMoist from '../images/makeup2.png'
import imgBath from '../images/makeup3.webp'
import imgScrub from '../images/makeuo4.webp'
import imgTooth from '../images/makeup5.jpeg'

const TredingProduct = () => {
  return (
    <div className="bg-[#f5f1ec] py-16 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs font-semibold tracking-widest text-gray-600 mb-3">
          TOP PICKS
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          New & Trending Products
        </h2>
      </div>
  
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {/* Body Lotion - Top Left */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 group">
          <div className="relative w-full h-64">
            <Image src={imgBody} alt="Body Lotion" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-stone-700 uppercase mb-1">BODYCARE</p>
            <h3 className="text-2xl font-bold text-stone-900 underline underline-offset-4">Body Lotion</h3>
            <p className="mt-2 max-w-xs text-sm font-bold text-stone-700">Faucibus a pellentesque sit amet porttitor eget dolor morbi non.</p>
          </div>
        </div>
  
        {/* Moisturizer - Top Middle */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 group">
          <div className="relative w-full h-64">
            <Image src={imgMoist} alt="Moisturizer" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-stone-700 uppercase mb-1">SMOOTH</p>
            <h3 className="text-2xl font-bold text-stone-900 underline underline-offset-4">Moisturizer</h3>
            <p className="mt-2 max-w-xs text-sm font-bold text-stone-700">Urna porttitor rhoncus dolor purus non enim praesent elementum.</p>
          </div>
        </div>
  
        {/* Bathing Salts - Top Right (Large) */}
        <div className="lg:col-span-4 lg:row-span-2 bg-white rounded-lg overflow-hidden shadow-sm relative group">
          <div className="relative w-full h-[380px] md:h-[460px] lg:h-full">
            <Image src={imgBath} alt="Bathing Salts" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(min-width:1024px) 33vw, 100vw" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
            <p className="text-xs font-semibold tracking-widest text-white mb-2">
              NATURAL
            </p>
            <h3 className="text-2xl font-bold text-white underline">
              Bathing Salts
            </h3>
          </div>
        </div>
  
        {/* Face Scrub - Bottom Left */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 group">
          <div className="relative w-full h-64">
            <Image src={imgScrub} alt="Face Scrub" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-stone-700 uppercase mb-1">ORGANIC</p>
            <h3 className="text-2xl font-bold text-stone-900 underline underline-offset-4">Face Scrub</h3>
            <p className="mt-2 max-w-xs text-sm font-bold text-stone-700">Bibendum neque egestas congue quisque egestas diam in arcu cursus.</p>
          </div>
        </div>
  
        {/* Tooth Paste - Bottom Middle */}
        <div className="lg:col-span-4 relative overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5 group">
          <div className="relative w-full h-64">
            <Image src={imgTooth} alt="Tooth Paste" fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <p className="text-[10px] font-semibold tracking-[0.25em] text-stone-700 uppercase mb-1">CHEMICAL FREE</p>
            <h3 className="text-2xl font-bold text-stone-900 underline underline-offset-4">Tooth Paste</h3>
            <p className="mt-2 max-w-xs text-sm font-bold text-stone-700">A iaculis at erat pellentesque adipiscing commodo elamat.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TredingProduct