"use client"
import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const items = [
  {
    id: 1,
    title: 'Glow Essentials',
    image: '/images/make2.jpg',
    hoverImage: '/images/makeup1.jpeg'
  },
  {
    id: 2,
    title: 'Serum Touch',
    image: '/images/make3.jpg',
    hoverImage: '/images/makeup3.webp'
  },
  {
    id: 3,
    title: 'Citrus Care',
    image: '/images/make4.jpg',
    hoverImage: '/images/makeup5.jpg'
  }
]

const Card = () => {
  return (
    <section className="bg-[#f7efe6] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {items.map(item => (
            <SwiperSlide key={item.id}>
              <div className="group relative overflow-hidden rounded-xl shadow-sm bg-white">
                {/* Base image */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  {/* Hover image */}
                  <Image
                    src={item.hoverImage}
                    alt={`${item.title} hover`}
                    fill
                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <div className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-md">
                    <p className="text-sm font-medium text-black">{item.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Card