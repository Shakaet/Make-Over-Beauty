"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const FaqCard = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const panels = [
    {
      id: 1,
      initialImage: '/images/makeup1.jpeg',
      hoverImage: '/images/make4.jpg',
      title: 'Skincare Application',
      description: 'Discover our premium skincare products'
    },
    {
      id: 2,
      initialImage: '/images/make2.jpg',
      hoverImage: '/images/make5.jpg',
      title: 'Natural Beauty',
      description: 'Organic ingredients for radiant skin'
    },
    {
      id: 3,
      initialImage: '/images/make3.jpg',
      hoverImage: '/images/make6.jpg',
      title: 'Luxurious Products',
      description: 'Elevate your beauty routine'
    }
  ]

  return (
    <section className="bg-[#f3eadf] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {panels.map((panel, index) => (
            <div
              key={panel.id}
              className="group relative overflow-hidden cursor-pointer rounded-lg"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image Container */}
              <div className="relative h-[250px] sm:h-[280px] lg:h-[320px] transition-all duration-500 ease-in-out">
                {/* Initial Image */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                }`}>
                  <Image
                    src={panel.initialImage}
                    alt={panel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Hover Image */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Image
                    src={panel.hoverImage}
                    alt={panel.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{panel.title}</h3>
                    <p className="text-sm sm:text-base text-white/90">{panel.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqCard