import React from 'react'

const PremiumCound = () => {
  return (
    <section className="relative overflow-hidden bg-[#fbf6ee] py-16 sm:py-24">
      {/* soft floral background */}
      <div className="absolute inset-0 opacity-[0.25] bg-[url('/images/bgN.jpg')] bg-cover bg-center" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left: Big headline */}
        <h2 className="text-[#0a0a0a] font-extrabold leading-[1.08] text-4xl sm:text-6xl md:text-7xl">
          Luxurious & Premium Essential
          <br className="hidden sm:block" />
          Daily Use Cosmetic Product
        </h2>

        {/* Right: Copy + counters */}
        <div>
          <p className="text-black/70 text-base sm:text-lg md:text-xl max-w-2xl">
            Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Gravida dictum fusce
            ut placerat orci. Et leo duis ut diam quam nulla porttitor massa. Ipsum nunc aliquet
            bibendum enim. Arcu bibendum at varius vel pharetra.
          </p>

          <div className="grid grid-cols-3 gap-6 sm:gap-10 mt-10">
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#c5824d]">12k</div>
              <div className="mt-2 text-base sm:text-lg text-[#0a0a0a] font-semibold">Beauty Products</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#c5824d]">5k</div>
              <div className="mt-2 text-base sm:text-lg text-[#0a0a0a] font-semibold">Employees</div>
            </div>
            <div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#c5824d]">20k</div>
              <div className="mt-2 text-base sm:text-lg text-[#0a0a0a] font-semibold">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PremiumCound