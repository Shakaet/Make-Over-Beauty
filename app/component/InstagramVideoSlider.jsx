'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'

const images = [
    '/images/HomePageImage (1).jpeg',
    '/images/HomePageImage (2).jpeg',
    '/images/HomePageImage (3).jpeg',
    '/images/HomePageImage (4).jpeg',
    '/images/HomePageImage (5).jpeg',
    '/images/HomePageImage (6).jpeg',
    '/images/HomePageImage (7).jpeg',
    '/images/HomePageImage (8).jpeg',
]

export default function InstagramVideoSlider() {
    return (
        <section className="bg-[var(--blush)] py-12">
            <Swiper
                loop
                centeredSlides
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={16}
                modules={[Autoplay]}
                className="px-4 md:px-14 mx-auto"
                breakpoints={{
                    0: {
                        slidesPerView: 1.2,
                    },
                    640: {
                        slidesPerView: 2.2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <motion.div
                                animate={{ scale: isActive ? 1 : 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`relative h-[260px] md:h-[300px] rounded-2xl overflow-hidden bg-[var(--light)]
                  ${isActive ? 'ring-2 ring-pink-400' : ''}`}
                            >
                                <img
                                    src={image}
                                    alt="Instagram post"
                                    className="h-full w-full object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-white/20 opacity-0 hover:opacity-100 transition">

                                </div>
                            </motion.div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
