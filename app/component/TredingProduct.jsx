import React from 'react'
import Image from 'next/image'
import imgBody from '@/public/images/makeup1.jpeg'
import imgMoist from '@/public/images/makeup2.png'
import imgBath from '@/public/images/makeup3.webp'
import imgScrub from '@/public/images/makeuo4.webp'
import imgTooth from '@/public/images/makeup5.jpeg'

const TredingProduct = () => {
  return (
    <div className="bg-[#f5f1ec] px-4 py-16">
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-12 text-center">
        <p className="mb-3 font-semibold text-gray-600 text-xs tracking-widest">
          TOP PICKS
        </p>
        <h2 className="font-bold text-gray-900 text-4xl md:text-5xl">
          New & Trending Products
        </h2>
      </div>
  
      {/* Grid Layout */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12">
        {/* Body Lotion - Top Left */}
        <div className="group relative lg:col-span-4 shadow-sm rounded-sm ring-1 ring-black/5 overflow-hidden">
          <div className="relative w-full h-64">
            <Image src={imgBody} alt="Body Lotion" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="bottom-0 left-0 absolute p-6">
            <p className="mb-1 font-semibold text-[10px] text-stone-700 uppercase tracking-[0.25em]">BODYCARE</p>
            <h3 className="font-bold text-stone-900 text-2xl underline underline-offset-4">Body Lotion</h3>
            <p className="mt-2 max-w-xs font-bold text-stone-700 text-sm">Faucibus a pellentesque sit amet porttitor eget dolor morbi non.</p>
          </div>
        </div>
  
        {/* Moisturizer - Top Middle */}
        <div className="group relative lg:col-span-4 shadow-sm rounded-sm ring-1 ring-black/5 overflow-hidden">
          <div className="relative w-full h-64">
            <Image src={imgMoist} alt="Moisturizer" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="bottom-0 left-0 absolute p-6">
            <p className="mb-1 font-semibold text-[10px] text-stone-700 uppercase tracking-[0.25em]">SMOOTH</p>
            <h3 className="font-bold text-stone-900 text-2xl underline underline-offset-4">Moisturizer</h3>
            <p className="mt-2 max-w-xs font-bold text-stone-700 text-sm">Urna porttitor rhoncus dolor purus non enim praesent elementum.</p>
          </div>
        </div>
  
        {/* Bathing Salts - Top Right (Large) */}
        <div className="group relative lg:col-span-4 lg:row-span-2 bg-white shadow-sm rounded-sm overflow-hidden">
          <div className="relative w-full h-[380px] md:h-[460px] lg:h-full">
            <Image src={imgBath} alt="Bathing Salts" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(min-width:1024px) 33vw, 100vw" />
          </div>
          <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/50 to-transparent p-6">
            <p className="mb-2 font-semibold text-white text-xs tracking-widest">
              NATURAL
            </p>
            <h3 className="font-bold text-white text-2xl underline">
              Bathing Salts
            </h3>
          </div>
        </div>
  
        {/* Face Scrub - Bottom Left */}
        <div className="group relative lg:col-span-4 shadow-sm rounded-sm ring-1 ring-black/5 overflow-hidden">
          <div className="relative w-full h-64">
            <Image src={imgScrub} alt="Face Scrub" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="bottom-0 left-0 absolute p-6">
            <p className="mb-1 font-semibold text-[10px] text-stone-700 uppercase tracking-[0.25em]">ORGANIC</p>
            <h3 className="font-bold text-stone-900 text-2xl underline underline-offset-4">Face Scrub</h3>
            <p className="mt-2 max-w-xs font-bold text-stone-700 text-sm">Bibendum neque egestas congue quisque egestas diam in arcu cursus.</p>
          </div>
        </div>
  
        {/* Tooth Paste - Bottom Middle */}
        <div className="group relative lg:col-span-4 shadow-sm rounded-sm ring-1 ring-black/5 overflow-hidden">
          <div className="relative w-full h-64">
            <Image src={imgTooth} alt="Tooth Paste" fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
          <div className="bottom-0 left-0 absolute p-6">
            <p className="mb-1 font-semibold text-[10px] text-stone-700 uppercase tracking-[0.25em]">CHEMICAL FREE</p>
            <h3 className="font-bold text-stone-900 text-2xl underline underline-offset-4">Tooth Paste</h3>
            <p className="mt-2 max-w-xs font-bold text-stone-700 text-sm">A iaculis at erat pellentesque adipiscing commodo elamat.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default TredingProduct