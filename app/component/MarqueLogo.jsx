import React from 'react'

const brands = [
  // Stylized wordmarks approximating the screenshot
  (
    <div className="relative leading-none" aria-label="Lash" key="lash">
      <span className="tracking-[0.35em] text-3xl sm:text-4xl md:text-5xl font-semibold">LASH</span>
    </div>
  ),
  (
    <div className="relative leading-none" aria-label="Dandelion" key="dandelion">
      <span className="text-2xl sm:text-3xl md:text-4xl font-medium">DANDELION</span>
      <span className="block text-xs sm:text-sm text-yellow-700/90 italic">slogan goes here</span>
    </div>
  ),
  (
    <div className="relative leading-none" aria-label="Dropleaf" key="dropleaf">
      <span className="tracking-[0.6em] text-xl sm:text-2xl md:text-3xl font-bold">D R O P L E A F</span>
      <span className="block text-[10px] sm:text-xs opacity-80 mt-1">Premium</span>
    </div>
  ),
  (
    <div className="relative leading-none" aria-label="Am" key="am">
      <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl">Am</span>
    </div>
  ),
  (
    <div className="relative leading-none" aria-label="Amvana" key="amvana">
      <span className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-slate-600">Amvana</span>
    </div>
  ),
  (
    <div className="relative leading-none" aria-label="Mona" key="mona">
      <span className="tracking-[0.25em] text-3xl sm:text-4xl md:text-5xl font-black">MONA</span>
    </div>
  ),
]

const MarqueLogo = () => {
  return (
    <section className="border-y border-black/10 bg-[#ffdcdc] text-[#0a0a0a] py-10 sm:py-12">
      <div className="relative overflow-hidden mask-edge">
        <div className="marquee">
          <div className="marquee-track items-center px-6 gap-20 sm:gap-28 md:gap-36 lg:gap-44">
            {[...brands, ...brands].map((item, idx) => (
              <div className="shrink-0" key={idx}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MarqueLogo