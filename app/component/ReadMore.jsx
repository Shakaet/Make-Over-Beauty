import React from 'react'
import Link from 'next/link'

const FEATURES = [
  {
    title: 'Natural Ingredients',
    desc: 'Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus entesque',
    icon: (
      <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12c2 0 3-2 4-4s3-4 6-4c0 3-2 5-4 6s-4 2-6 2z"/>
        <path d="M6 20h10a4 4 0 0 0 4-4v-1H2v1a4 4 0 0 0 4 4z"/>
      </svg>
    ),
  },
  {
    title: 'Fragrance Free',
    desc: 'Ahasellus entesque praesent in nunc vel urna consequat mattis eget vel libero.',
    icon: (
      <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="4"/>
        <circle cx="16" cy="16" r="4"/>
        <path d="M3 21L21 3"/>
      </svg>
    ),
  },
  {
    title: 'Allergy Tested',
    desc: 'Nunc vel urna consequat praesent in mattis eget vel libero zhasellus entesque.',
    icon: (
      <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="7" width="10" height="10" rx="2"/>
        <path d="M15 7l4 4v6a2 2 0 0 1-2 2h-2"/>
        <path d="M12 11l-2 3 3 2"/>
      </svg>
    ),
  },
  {
    title: 'Paraben Free',
    desc: 'Mattis eget vel libero praesent in nunc vel urna consequat ehasellus entesque',
    icon: (
      <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19l8-14 8 14z"/>
        <path d="M6 16h12"/>
        <path d="M3 3l18 18"/>
      </svg>
    ),
  },
]

const ReadMore = () => {
  return (
    <section className="bg-[#fbf6ed]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14 text-center">
          {FEATURES.map((f, i) => (
            <div key={i}>
              <div className="flex justify-center mb-6 text-black/90">{f.icon}</div>
              <h3 className="text-2xl font-semibold text-black mb-4">{f.title}</h3>
              <p className="text-black/70 leading-relaxed mb-6">
                {f.desc}
              </p>
              <Link href="/" className="inline-block tracking-[0.35em] uppercase text-black border-b border-black pb-1">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReadMore