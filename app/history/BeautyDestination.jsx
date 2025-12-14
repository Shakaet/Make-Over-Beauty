import React from 'react'
import Image from 'next/image'
import heroImg from '@/public/images/cream.png'

const BeautyDestination = () => {
  return (
    <section className="pt-10 pb-16 sm:pt-14 sm:pb-24 bg-[#fbf6ee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Copy */}
        <div>
          <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-black/60 mb-5">
            World Beauty Destination
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] text-[#0a0a0a] mb-6">
            Our Beauty Store Is
            <br className="hidden sm:block" />
            Founded In 1945
          </h2>
          <p className="text-base sm:text-lg text-black/70 max-w-xl">
            Risus feugiat in ante metus dictum. Nibh sit amet commodo nulla facilisi nullam
            vehicula ipsum. Posuere urna nec tincidunt praesent.
          </p>
        </div>

        {/* Image */}
        <div className="relative w-full h-[260px] sm:h-[360px] md:h-[460px] lg:h-[520px] overflow-hidden rounded-md">
          <Image
            src={heroImg}
            alt="Beauty products arrangement"
            fill
            priority
            sizes="(min-width: 1024px) 600px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default BeautyDestination