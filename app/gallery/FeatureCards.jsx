import React from 'react'
import Image from 'next/image'

const CARDS = [
  {
    title: 'Skincare Essentials',
    copy: 'Hydrating creams, serums, and daily toners curated for glow.',
    src: '/images/makeup1.jpeg',
  },
  {
    title: 'Makeup Bestsellers',
    copy: 'Weightless pigments and pro-finish palettes for every look.',
    src: '/images/makeup3.webp',
  },
  {
    title: 'Clean & Herbal',
    copy: 'Consciously crafted formulas with plant-based ingredients.',
    src: '/images/cream.png',
  },
]

const FeatureCards = () => {
  return (
    <section className="relative  py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((c, i) => (
            <article key={i} className="group relative overflow-hidden rounded-md">
              <Image
                src={c.src}
                alt={c.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="relative z-10 p-6 sm:p-8 text-white flex flex-col justify-end h-[260px] sm:h-[320px]">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm sm:text-base text-white/90 mb-4 max-w-[28ch]">{c.copy}</p>
                <button className="self-start border border-white/80 px-4 py-2 text-xs sm:text-sm tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors">Explore</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureCards


