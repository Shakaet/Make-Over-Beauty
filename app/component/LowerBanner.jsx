import React from 'react'

const items = [
  {
    title: 'Free Shipping World Wide',
    label: 'Shipping',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7h11v7H3z"/>
        <path d="M14 10h4l3 3v1h-7z"/>
        <circle cx="7.5" cy="18" r="1.5"/>
        <circle cx="17.5" cy="18" r="1.5"/>
        <path d="M2 10h2M1 13h3"/>
      </svg>
    )
  },
  {
    title: '24*7 Customer Support',
    label: 'Hassle Free',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="7" r="3"/>
        <path d="M6 20c1.5-3.5 4-5 6-5s4.5 1.5 6 5"/>
        <path d="M4 10v2a2 2 0 0 0 2 2h1"/>
        <path d="M20 10v2a2 2 0 0 1-2 2h-1"/>
      </svg>
    )
  },
  {
    title: 'Safe Packaging',
    label: 'Secured',
    icon: (
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7l9-4 9 4-9 4-9-4z"/>
        <path d="M21 10l-9 4-9-4"/>
        <path d="M12 14v8"/>
        <path d="M5 12v8M19 12v8"/>
        <path d="M20 5l2 2M2 5l2 2M20 19l2-2M2 19l2-2"/>
      </svg>
    )
  },
]

const LowerBanner = () => {
  return (
    <section className="bg-[#e9d9bd] ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-12">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center gap-5">
              <div className="text-black/80">{it.icon}</div>
              <div>
                <p className="uppercase tracking-[0.35em] text-[11px] text-black/70 mb-1">{it.label}</p>
                <h4 className="text-xl sm:text-2xl text-black font-semibold">{it.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LowerBanner