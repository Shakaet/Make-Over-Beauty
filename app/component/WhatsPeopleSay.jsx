"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const TESTIMONIALS = [
  {
    quote:
      "Aenean sed rutrum purus. Nunc nec magna laoreet, sodaleus bibens viverra. Nullam iaos mattis dolor rutrum nec libero vehicula, a suscipit felicitudin vivamus odia.",
    name: "Jesica",
    role: "Designer",
    avatar: "/images/makeup5.jpg",
  },
  {
    quote:
      "Curabitur ut arcu et justo pulvinar faucibus. Integer dictum, sapien a sodales feugiat, massa elit venenatis magna, id vehicula urna turpis vitae elit.",
    name: "Amelia",
    role: "Makeup Artist",
    avatar: "/images/makeup3.webp",
  },
  {
    quote:
      "Praesent nec nisl eget elit suscipit gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;",
    name: "Monica",
    role: "Stylist",
    avatar: "/images/makeup1.jpeg",
  },
]

const WhatsPeopleSay = () => {
  const [index, setIndex] = useState(0)
  const count = TESTIMONIALS.length

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  const t = TESTIMONIALS[index]

  return (
    <section className="relative bg-[#efe2cc] text-[#0a0a0a]">
      {/* subtle floral background */}
      <div className="absolute inset-0 bg-[url('/images/bgNN.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 text-center">
        <p className="uppercase tracking-[0.35em] text-xs sm:text-sm opacity-80 mb-4">Testimonial</p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">What Our People Says</h2>

        {/* rating */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="22" height="22" viewBox="0 0 24 24" className="text-[#b37a2b]" fill="currentColor" aria-hidden>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* quote */}
        <blockquote className="mx-auto max-w-3xl text-base sm:text-lg md:text-xl leading-relaxed text-black/80">
          {t.quote}
        </blockquote>

        {/* author */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm sm:text-base tracking-[0.25em] uppercase">
            <span>{t.name}</span>
            <span className="opacity-60">— {t.role}</span>
          </div>
          <Image
            src={t.avatar}
            alt={t.name}
            width={64}
            height={64}
            className="rounded-full object-cover h-16 w-16"
          />
        </div>

        {/* controls */}
        <button
          aria-label="Previous testimonial"
          onClick={prev}
          className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 p-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button
          aria-label="Next testimonial"
          onClick={next}
          className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 p-2"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>
    </section>
  )
}

export default WhatsPeopleSay