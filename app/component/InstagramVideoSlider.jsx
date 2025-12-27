'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Instagram } from 'lucide-react'
import 'swiper/css'

const videos = [
    '/videos/insta1.mp4',
    '/videos/insta2.mp4',
    '/videos/insta3.mp4',
    '/videos/insta4.mp4',
    '/videos/insta5.mp4',
    '/videos/insta6.mp4',
    '/videos/insta7.mp4',
    '/videos/insta8.mp4',
    '/videos/insta9.mp4',
    '/videos/insta10.mp4',
    '/videos/insta11.mp4',
]

export default function InstagramVideoSlider() {
    return (
        <section className="bg-[var(--blush)] py-16">
            <Swiper
                slidesPerView={5}
                spaceBetween={24}
                loop
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                centeredSlides
                modules={[Autoplay]}
                className="px-14 mx-auto"
            >
                {videos.map((video, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <motion.div
                                animate={{ scale: isActive ? 1 : 0.95 }}
                                transition={{ duration: 0.3 }}
                                className={`relative rounded-2xl overflow-hidden bg-[var(--light)] h-[300px]
                  ${isActive ? 'ring-2 ring-pink-400' : ''}`}
                            >
                                <video
                                    src={video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-black/70 p-3 rounded-full">
                                        <Instagram className="text-white w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
