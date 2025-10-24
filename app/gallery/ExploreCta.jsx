import React from 'react'
import Image from 'next/image'

const ExploreCta = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative h-[260px] sm:h-[360px] overflow-hidden rounded-md">
          <Image
            src="/images/makeup2.png"
            alt="Assorted cosmetics flat lay"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <p className="uppercase tracking-[0.35em] text-xs sm:text-sm text-black/60">Discover More</p>
          <h3 className="mt-3 text-3xl sm:text-5xl font-extrabold text-[#0a0a0a]">Explore Fresh Drops Weekly</h3>
          <p className="mt-4 text-black/70 text-base sm:text-lg max-w-prose">
            New items and looks arrive every week. Browse curated lists or filter by
            categories to find your next essentials.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.25em] hover:opacity-90" href="#">Browse All</a>
            <a className="inline-flex items-center gap-2 border border-black px-6 py-3 text-xs sm:text-sm uppercase tracking-[0.25em] hover:bg-black hover:text-white" href="#">Submit Photo</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExploreCta


