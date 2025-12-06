"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import img1 from "/public/images/ban2.jpg"
import img2 from "/public/images/ban3.jpg"

// Local banner images placed in /public. Replace with your own files.
// Example files: /public/banner-1.jpg, banner-2.jpg
const SLIDES = [
  {
    image: img1,
    eyebrow: "Cosmetics",
    title: "Dermatologist Tested",
    copy: "Aenean laoree praesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "right",
  },
  {
    image: img2,
    eyebrow: "Long Lasting",
    title: "Weightless & Waterproof",
    copy: "Doaesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "left",
  },
  {
    image: img1,
    eyebrow: "Cosmetics",
    title: "Dermatologist Tested",
    copy: "Aenean laoree praesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "right",
  },
  {
    image: img2,
    eyebrow: "Long Lasting",
    title: "Weightless & Waterproof",
    copy: "Doaesent in nunc vel urna consequat mattis eget vel libero.",
    cta: "Shop now",
    align: "left",
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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#ffc0cb] to-[#ffb6c1]">
      <div className="relative h-[95vh] sm:h-[92vh] overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className={`min-w-full h-full relative md:flex ${s.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* IMAGE */}
              <div className={`relative w-full h-full md:w-1/2`}>
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center"
                  priority={i === 0}
                />
              </div>

              <div className="absolute inset-0 bg-black/20 md:hidden"></div>

              {/* CONTENT */}
              <div
                className={`
        absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 px-6 text-center
        md:relative md:translate-x-0 md:bottom-0 md:left-0 md:px-12 md:w-1/2
        flex items-center justify-center md:items-center md:justify-start
      `}
              >
                <div className="max-w-lg text-left">
                  <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-white md:text-black/70 mb-3">
                    {s.eyebrow}
                  </p>

                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white md:text-black mb-4 leading-tight">
                    {s.title}
                  </h2>

                  <p className="text-sm md:text-lg text-white/90 md:text-black/60 mb-8">
                    {s.copy}
                  </p>

                  <a
                    href='/product'
                    className="inline-flex items-center bg-black text-white px-4 py-2 text-sm sm:text-base uppercase tracking-[0.25em] hover:bg-black/80 transition">
                    {s.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${index === i ? "w-6 bg-black" : "bg-black/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Banner