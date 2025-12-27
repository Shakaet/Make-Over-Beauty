"use client"
import React, { useEffect, useRef, useState } from 'react'
import img1 from "@/public/images/ban2.jpg"
import img2 from "@/public/images/ban3.jpg"
import { siteSettingApi } from '../api/siteSettingApi'
import Image from 'next/image'


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
  const [siteSettings, setSiteSettings] = useState(null);

  // Fetch existing settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await siteSettingApi.getAll();
      const siteData = data.data[0]
      setSiteSettings(siteData);
    } catch (error) {
      console.error("Error fetching site settings:", error);
    }
  };

  // autoplay
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, AUTOPLAY_MS)
    return () => timerRef.current && clearInterval(timerRef.current)
  }, [])


  return (
    <section className="bg-[var(--blush)] pb-4 px-2">
      <div className="relative mx-4 md:mx-12 rounded-2xl overflow-hidden mb-4 bg-white">
        <div className="relative h-[95vh] sm:h-[92vh] overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-700"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {siteSettings?.sections.map((s, i) => (
              <div
                key={i}
                className={`min-w-full h-full relative md:flex ${s.align === "left" ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
              >
                {/* IMAGE */}
                <div className={`relative w-full h-full md:w-1/2`}>
                  <Image
                    src={
                      typeof s.image === "string" && s.image.trim() !== ""
                        ? s.image
                        : img1
                    }
                    alt={s.title || "Banner Image"}
                    fill
                    className="object-cover object-center"
                  // sizes="(max-width: 768px) 100vw, 50vw"
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
                      className="inline-flex items-center bg-[var(--pink)] rounded-full text-white px-4 py-2 text-sm sm:text-base hover:bg-black/80 transition">
                      {s.cta}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DOTS */}
          {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {siteSettings?.sections.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-all ${index === i ? "w-6 bg-black" : "bg-black/40"
                }`}
            />
          ))}
        </div> */}
        </div>
      </div>
    </section>
  );
}

export default Banner