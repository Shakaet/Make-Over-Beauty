"use client"
import React from 'react'
import Link from 'next/link'

const FourZero = ({ fullScreen = false }) => {
  return (
    <div className={`${fullScreen ? 'fixed inset-0 z-50' : 'relative min-h-screen'} bg-[#f3eadf] flex items-center justify-center overflow-hidden`}>
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Diamond Shape with Error Message */}
        <div className=" mt-40 relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 transform rotate-45 bg-[#d4c4b0] border-2 border-[#b8a998] flex items-center justify-center shadow-lg">
          <div className="transform -rotate-45 text-center">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Oops!
            </p>
            <p className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-3">
              404
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-medium text-white">
              Page Not Found
            </p>
          </div>
        </div>

        {/* Supporting Text */}
        {/* <p className="text-base sm:text-lg text-black/80 mb-8 text-center">
          It seems you've ventured too far.
        </p> */}

        {/* Back to Home Button */}
        <Link href="/">
          <button className="px-8 py-3 bg-transparent border-2 border-black/40 text-black uppercase tracking-[0.15em] font-semibold text-sm hover:bg-black/5 transition-colors rounded-md mt-22 mb-10">
            BACK TO HOME
          </button>
        </Link>
      </div>

      {/* Decorative Elements */}
      {/* Wooden Log Slice */}
      <div className="absolute bottom-0 right-1/4 w-48 h-12 sm:w-64 sm:h-16 opacity-80 pointer-events-none z-0">
        <div className="relative w-full h-full">
          {/* Log Shape */}
          <div className="absolute bottom-0 w-full h-12 sm:h-16 bg-gradient-to-b from-[#d4a574] to-[#c89562] rounded-t-full border-t-2 border-[#b8834f]">
            {/* Wood Grain Lines */}
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 opacity-30">
              <div className="w-full h-0.5 bg-[#8b6f47] rounded-full"></div>
              <div className="w-3/4 h-0.5 bg-[#8b6f47] rounded-full"></div>
              <div className="w-full h-0.5 bg-[#8b6f47] rounded-full"></div>
              <div className="w-2/3 h-0.5 bg-[#8b6f47] rounded-full"></div>
            </div>
          </div>
          {/* Bark Edge */}
          <div className="absolute bottom-0 left-0 w-16 h-12 sm:h-16 bg-gradient-to-b from-[#b8834f] to-[#8b6f47] rounded-tl-full"></div>
          <div className="absolute bottom-0 right-0 w-16 h-12 sm:h-16 bg-gradient-to-b from-[#b8834f] to-[#8b6f47] rounded-tr-full"></div>
        </div>
      </div>

      {/* Eucalyptus Leaves */}
      <div className="absolute bottom-8 left-4 sm:left-8 w-32 h-40 sm:w-40 sm:h-48 opacity-70 pointer-events-none z-0">
        <svg viewBox="0 0 120 150" className="w-full h-full">
          {/* Stem */}
          <path
            d="M60 150 L60 80"
            stroke="#8b9962"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Leaf 1 */}
          <ellipse
            cx="50"
            cy="60"
            rx="12"
            ry="20"
            fill="#9dac72"
            transform="rotate(-30 50 60)"
          />
          {/* Leaf 2 */}
          <ellipse
            cx="55"
            cy="50"
            rx="10"
            ry="18"
            fill="#9dac72"
            transform="rotate(20 55 50)"
          />
          {/* Leaf 3 */}
          <ellipse
            cx="65"
            cy="55"
            rx="11"
            ry="19"
            fill="#9dac72"
            transform="rotate(-20 65 55)"
          />
          {/* Leaf 4 */}
          <ellipse
            cx="70"
            cy="65"
            rx="12"
            ry="20"
            fill="#9dac72"
            transform="rotate(25 70 65)"
          />
          {/* Leaf 5 */}
          <ellipse
            cx="45"
            cy="70"
            rx="10"
            ry="17"
            fill="#9dac72"
            transform="rotate(-25 45 70)"
          />
          {/* Leaf 6 */}
          <ellipse
            cx="75"
            cy="75"
            rx="11"
            ry="18"
            fill="#9dac72"
            transform="rotate(15 75 75)"
          />
        </svg>
      </div>

      {/* Subtle Shadow for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none"></div>
    </div>
  )
}

export default FourZero