'use client'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

const members = [
  {
    name: 'Nicolas',
    role: 'Product Manager',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-7.jpg`
  },
  {
    name: 'Niyama',
    role: 'CEO',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-6.jpg`
  },
  {
    name: 'Mark',
    role: 'Founder',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-5.jpg`
  },
  {
    name: 'Bernita',
    role: 'Co-Founder',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-4.jpg`
  },
  {
    name: 'Lina Akter',
    role: 'Makeup Artist',
    img: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-4.jpg'
  },
  {
    name: 'David Smith',
    role: 'Skincare Expert',
    img: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-5.jpg'
  },
  {
    name: 'Nusrat Khan',
    role: 'Cosmetologist',
    img: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-6.jpg'
  },
  {
    name: 'Emily Brown',
    role: 'Spa Therapist',
    img: 'https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-8.jpg'
  }
]

const Team = () => {
  return (
    <section className='bg-white py-16'>
      <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 max-w-7xl'>
        {/* HEADER */}
        <div className='text-center'>
          <p className='text-gray-500 text-xs sm:text-sm uppercase tracking-wider'>
            Our Team
          </p>
          <h2 className='mt-2 font-bold text-2xl sm:text-3xl md:text-4xl'>
            Cosmetic Experts
          </h2>
        </div>

        {/* SLIDER */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className='mt-10'
        >
          {members.map(m => (
            <SwiperSlide key={m.name}>
              <div className='bg-white shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-500'>
                <div className='relative w-full h-56 sm:h-64'>
                  <img
                    src={m.img}
                    alt={m.name}
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='p-5 text-center'>
                  <h3 className='font-semibold text-lg sm:text-xl'>{m.name}</h3>
                  <p className='text-gray-500 text-sm'>{m.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default Team
