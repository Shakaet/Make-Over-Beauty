"use client"
import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import bgImage from '/public/images/banner.png'

function capitalizeWords(input) {
  return input
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const Heading = ({ title: titleProp, breadcrumb: breadcrumbProp, image = bgImage }) => {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)

  const inferredTitle = segments.length === 0
    ? 'Home'
    : capitalizeWords(segments[segments.length - 1].replace(/-/g, ' '))

  const title = titleProp ?? inferredTitle
  const crumbs = breadcrumbProp ?? ['Home', ...segments.map((s) => capitalizeWords(s.replace(/-/g, ' ')))]

  return (
    <section className="relative">
      <div className="relative h-[260px] sm:h-[320px] md:h-[360px] overflow-hidden">
        <Image
          src={image}
          alt={`${title} background`}
          fill
          sizes="100vw"
          className="absolute inset-0 object-cover"
          priority
        />
        {/* Soft warm overlay to match brand look */}
        <div className="absolute inset-0 bg-[#f3eadf]/85" />

        <div className="z-10 relative flex justify-center items-center mx-auto px-4 sm:px-6 max-w-7xl h-full text-center">
          <div>
            <h1 className="mb-4 font-extrabold text-black text-4xl sm:text-5xl md:text-6xl tracking-tight">{title}</h1>
            <p className="text-black/70 text-xs sm:text-sm uppercase tracking-[0.35em]">
              {crumbs.join(' / ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Heading