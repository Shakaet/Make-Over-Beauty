
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

const SPANS = ['lg:col-span-2 lg:row-span-2','', 'lg:col-span-2 lg:row-span-2','', '', '']

const GalaryImages = ({ images }) => {
  // If dynamic images provided (public paths), map them into the mosaic with spans
  const tiles = images && images.length
    ? images.slice(0,6).map((src, i) => ({ src, alt: `Gallery image ${i+1}`, span: SPANS[i] || '' }))
    : TILES
  return (
    <>


     {/* Mosaic grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[160px] gap-4 sm:gap-5">
              {tiles.map((t, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-md bg-[#f7efe6] ${t.span}`}
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
    </>
  )
}

export default GalaryImages