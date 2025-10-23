"use client"
import React from 'react'

const Category = ({ categories = [], selected, onSelect }) => {
  return (
    <div className="mt-6 px-2">
      <div className="flex gap-3 sm:gap-6 items-center justify-center overflow-x-auto whitespace-nowrap">
        {categories.map((cat) => {
          const isActive = cat === selected
          return (
            <button
              key={cat}
              onClick={() => onSelect && onSelect(cat)}
              role="tab"
              aria-selected={isActive}
              className={`relative px-1 sm:px-2 py-2 text-sm sm:text-base md:text-lg transition-colors whitespace-nowrap ${isActive ? 'text-[#5aafbb] font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {cat}
              {isActive && (
               <svg
                 className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 sm:w-16 md:w-20 h-2"
                 viewBox="0 0 80 8"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg"
                 aria-hidden="true"
               >
                 <path
                   d="M4 4Q40 -2 76 4C76 4 76 6 76 6Q40 10 4 6C4 6 4 4 4 4Z"
                   fill="#5aafbb"
                   opacity="0.9"
                 />
               </svg>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Category