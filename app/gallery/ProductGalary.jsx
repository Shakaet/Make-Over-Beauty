"use client"
import React from 'react'
import Image from 'next/image'
import img1 from '/public/images/makeup1.jpeg'
import img2 from '/public/images/makeup2.png'
import img3 from '/public/images/makeup3.webp'
import img4 from '/public/images/makeup5.jpeg'
import img5 from '/public/images/download.jpeg'
import img6 from '/public/images/cream.png'

const TILES = [
  { src: img5, alt: 'Hand with lotion tube', span: 'lg:col-span-2 lg:row-span-2' },
  { src: img1, alt: 'Models skincare', span: '' },
  { src: img6, alt: 'Open cream jar', span: 'lg:col-span-2 lg:row-span-2' },
  { src: img2, alt: 'Lip products', span: '' },
  { src: img4, alt: 'Essential oil bottles', span: '' },
  { src: img3, alt: 'Cosmetics flatlay', span: '' },
]

const ProductGalary = () => {
  return (
    <section className="relative bg-[#f7efe6] py-16 sm:py-20">
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden>
        {/* subtle floral flourish could be added via background if desired */}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-black/70">Organic is the way to go</p>
          <h2 className="mt-2 text-3xl sm:text-5xl font-extrabold tracking-tight text-black">Our Product Gallery</h2>
        </div>

        {/* Mosaic grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[160px] gap-4 sm:gap-5">
          {TILES.map((t, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-md bg-white/40 ${t.span}`}
            >
              <Image
                src={t.src}
                alt={t.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductGalary