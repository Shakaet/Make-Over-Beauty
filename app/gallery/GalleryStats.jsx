import React from 'react'

const items = [
  { value: '1.2k', label: 'Curated Photos' },
  { value: '350', label: 'Videos' },
  { value: '95+', label: 'Brands' },
  { value: '4.9', label: 'Avg. Rating' },
]

const GalleryStats = () => {
  return (
    <section className="relative overflow-hidden bg-[#fbf6ee] py-14 sm:py-20">
      <div className="absolute inset-0 opacity-[0.25] bg-[url('/images/bgN.jpg')] bg-cover bg-center" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {items.map((it) => (
            <div key={it.label}>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#c5824d]">{it.value}</div>
              <div className="mt-2 text-sm sm:text-base font-semibold text-[#0a0a0a]">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GalleryStats


