import React from 'react'
import Image from 'next/image'
import leftImg from '@/public/images/make2.jpg'
import rightImgA from '@/public/images/make6.jpg'
import rightImgB from '@/public/images/cream.png'

const HarbalCosmetics = () => {
  return (
    <section className=" pt-10 pb-16 sm:pt-14 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left: Large banner with copy overlay */}
        <div className="relative overflow-hidden rounded-md min-h-[300px] sm:min-h-[420px] md:min-h-[480px]">
          <Image
            src={leftImg}
            alt="Herbal cosmetics banner"
            fill
            priority
            sizes="(min-width: 1024px) 720px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 p-6 sm:p-10 md:p-14 flex items-center">
            <div className="max-w-xl text-[#0a0a0a]">
              <p className="uppercase tracking-[0.35em] text-xs sm:text-sm mb-3">99.9% Chemical Free</p>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">Herbal Cosmetics</h3>
              <p className="text-base sm:text-lg">
                Celebrate The Beauty{' '}
                <a href="#" className="border-b border-black">Shop</a>{' '}
                <a href="#" className="border-b border-black">online</a>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Two images, description and CTA */}
        <div>
          <div className="grid grid-cols-2 gap-6 h-[180px] sm:h-[220px] md:h-[260px] mb-8">
            <div className="relative rounded-md overflow-hidden">
              <Image
                src={rightImgA}
                alt="Facial treatment"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-md overflow-hidden">
              <Image
                src={rightImgB}
                alt="Herbal cream"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-black/80 leading-relaxed space-y-6">
            <p>
              Tortor dignissim convallis aenean et tortor at risus viverra adipiscing. Faucibus in ornare quam
              viverra orci sagittis. Ornare arcu odio ut sem. Adipiscing tristique risus nec feugiat.
            </p>
            <p>
              Ornare arcu odio ut sem. Adipiscing tristique risus nec feugiat. Tortor dignissim convallis aenean et
              tortor at risus viverra adipiscing. Faucibus in ornare quam viverra orci sagittis.
            </p>
          </div>

          <button className="mt-8 inline-block rounded-md bg-[#e7dcc9] hover:bg-[#e1d3b7] px-8 py-3 text-sm uppercase tracking-[0.35em] text-black">
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

export default HarbalCosmetics