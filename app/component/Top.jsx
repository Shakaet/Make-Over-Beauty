import React from 'react'

const Top = ({props: announcements = []}) => {

    // const ANNOUNCEMENTS = [
    //     "Black Friday: 10% off storewide",
    //     "Free shipping on orders above $75",
    //     "Vegan • Cruelty‑free • Clean beauty",
    //     "New arrivals in skincare & haircare",
    //   ]
  return (
    <>


    {/* Top announcement marquee */}
    <div className="border-b border-black/10 bg-[var(--rose)] text-white">
        <div className="relative overflow-hidden mask-edge">
          <div className="marquee h-10 flex items-center">
            <div className="marquee-track px-4 gap-12">
              {[...announcements, ...announcements].map((text, idx) => (
                <span
                  key={idx}
                  className="text-xs sm:text-sm tracking-[0.3em] uppercase whitespace-nowrap"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Top