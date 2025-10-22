"use client"
import React from 'react'
import Image from 'next/image'

const POSTS = [
  {
    title: 'Making CBD-Infused Pastries And Cupcakes',
    date: 'JUN 26, 2023',
    categories: ['Sun Protection', 'Sensitive'],
    excerpt:
      'Nibh tellus molestie nunc non blandit massa. Nec feugiat nisl pretium fusce id....',
    image: '/images/makeup5.jpg',
  },
  {
    title: 'Natural And Detergent‑Free Handmade Soap',
    date: 'JUN 26, 2023',
    categories: ['Enlarged Pores', 'Combination'],
    excerpt:
      'Feugiat tempor nec nisl pretium fusce id. Nibh tellus molestie nunc non blandit...',
    image: '/images/makeup3.webp',
  },
  {
    title: 'Fine And Smooth Organic Face Pack',
    date: 'JUN 26, 2023',
    categories: ['Dark Spots', 'Combination'],
    excerpt:
      'Dempor nec feugiat nec felis pretium fusce id. Nibh tellus molestie nunc non blandit...',
    image: '/images/cream.png',
  },
]

const NewsUpdates = () => {
  return (
    <section className=" text-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24">
        {/* Eyebrow */}
        <div className="flex justify-center mb-4">
          <span className="inline-block bg-[#d3a36a] text-white text-xs tracking-widest uppercase px-3 py-[3px]">Instant</span>
        </div>
        <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-10 sm:mb-14">
          News & Updated Blogs
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {POSTS.map((p, i) => (
            <article key={i} className="group">
              <div className="relative overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={900}
                  height={600}
                  sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  className="w-full h-[240px] sm:h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* vertical date badge */}
                <div className="absolute left-0 top-0 h-full flex">
                  <span className="bg-white/80 text-black text-[11px] tracking-widest px-3 py-4 writing-vertical">
                    {p.date}
                  </span>
                </div>
              </div>

              {/* meta */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-black/80">
                {p.categories.map((c) => (
                  <span key={c} className="flex items-center gap-2">
                    <span className="h-[6px] w-[6px] rounded-full bg-[#b37a2b] inline-block" />
                    {c}
                  </span>
                ))}
              </div>

              {/* title */}
              <h3 className="mt-3 text-2xl font-semibold leading-snug">
                {p.title}
              </h3>

              {/* excerpt */}
              <p className="mt-3 text-black/70 leading-relaxed">
                {p.excerpt}
              </p>

              {/* read more - style copied from ReadMore.jsx */}
              <div className="mt-6">
                <a href="#" className="inline-block tracking-[0.35em] uppercase text-black border-b border-black pb-1">
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* utility for vertical text */}
      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  )
}

export default NewsUpdates