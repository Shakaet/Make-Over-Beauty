"use client"	
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import img1 from "../../app/images/banner1.jpg"
import img2 from "../../app/images/banner2.jpg"

// Local banner images placed in /public. Replace with your own files.
// Example files: /public/banner-1.jpg, banner-2.jpg
const SLIDES = [
  {
    image: img1,
    eyebrow: "Cosmetics",
    title: "Dermatologist Tested",
    copy: "Aenean laoree praesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "left",
  },
  {
    image: img2,
    eyebrow: "Long Lasting",
    title: "Weightless & Waterproof",
    copy: "Doaesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "right",
  },
   {
    image: img1,
    eyebrow: "Cosmetics",
    title: "Dermatologist Tested",
    copy: "Aenean laoree praesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "left",
  },
  {
    image: img2,
    eyebrow: "Long Lasting",
    title: "Weightless & Waterproof",
    copy: "Doaesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "right",
  },

]

const AUTOPLAY_MS = 5500

const Banner = () => {
  const [index, setIndex] = useState(0)
  const timerRef = useRef(null)

  // autoplay
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [])

  const goTo = (i) => setIndex(i % SLIDES.length)

  return (
    <section className="relative">
      <div className="relative h-[90vh] sm:h-[95vh] md:h-[100vh] overflow-hidden">
        <div
          className="h-full w-full flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div key={i} className="relative shrink-0 w-full h-full">
              {/* Background image */}
              <Image
                src={s.image}
                alt={s.title}
                fill
                sizes="100vw"
                className="absolute inset-0 object-cover"
                priority={i === 0}
              />
              {/* Soft overlay gradient for readable text */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f2e6d3]/70 via-transparent to-transparent" />

              {/* Content */}
              <div className={`relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex ${s.align === 'left' ? 'justify-start' : 'justify-end'}`}>
                <div className="self-center max-w-xl text-[#0a0a0a]">
                  <p className="uppercase tracking-[0.35em] text-xs sm:text-sm mb-4 opacity-80">{s.eyebrow}</p>
                  <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">{s.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg text-black/70 mb-8 max-w-md">{s.copy}</p>
                  <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.25em] hover:opacity-90">
                    {s.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${index === i ? 'w-6 bg-black' : 'bg-black/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />)
          )}
        </div>

        {/* Prev/Next */}
        {/* <button
          aria-label="Previous"
          onClick={() => goTo((index - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button> */}
        {/* <button
          aria-label="Next"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6l6 6-6 6"/></svg>
        </button> */}
      </div>
    </section>
  )
}

export default Banner