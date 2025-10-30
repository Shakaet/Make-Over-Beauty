import React from 'react'

const Stats = () => {
  return (
    <section className='bg-[#F3EAE3] py-12'>
      <div className='flex md:flex-row flex-col justify-between items-center gap-10 mx-auto px-6 sm:px-10 lg:px-16 max-w-7xl md:text-left text-center'>
        {/* LEFT TEXT BLOCK */}
        <div className='max-w-xl'>
          <h3 className='font-bold text-2xl sm:text-3xl leading-snug'>
            Luxurious & Premium Essential Daily Use Cosmetic Product
          </h3>
          <p className='mt-4 text-gray-600 text-sm sm:text-base'>
            Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat.
          </p>
        </div>

        {/* RIGHT STATS */}
        <div className='flex flex-wrap justify-center md:justify-end gap-8 sm:gap-12'>
          {[
            { number: '12k', label: 'Beauty Products' },
            { number: '5k', label: 'Employees' },
            { number: '20k', label: 'Happy Users' }
          ].map((item, i) => (
            <div key={i} className='text-center'>
              <div className='font-bold text-2xl sm:text-3xl'>
                {item.number}
              </div>
              <div className='text-gray-500 text-sm sm:text-base'>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
