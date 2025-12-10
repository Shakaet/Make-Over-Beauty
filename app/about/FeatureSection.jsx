import React from 'react'

const FeatureSection = () => {
  return (
    <section className='bg-white/30 mt-16 py-12'>
      <div className='items-center gap-10 grid grid-cols-1 lg:grid-cols-3 mx-auto px-4 sm:px-8 md:px-12 max-w-7xl'>
        {/* LEFT: Image Grid */}
        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:col-span-2'>
          <div className='overflow-hidden'>
            <img
              src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-2-693x1024.jpg'
              alt='f1'
              className='w-full h-72 sm:h-80 md:h-[450px] object-cover hover:scale-95 transition-transform duration-500'
            />
          </div>
          <div className='overflow-hidden'>
            <img
              src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-3-693x1024.jpg'
              alt='f2'
              className='w-full h-72 sm:h-80 md:h-[450px] object-cover hover:scale-95 transition-transform duration-500'
            />
          </div>
        </div>

        {/* RIGHT: Text Content */}
        <div className='space-y-5 lg:pl-6 sm:text-left text-center'>
          <p className='text-gray-500 text-xs sm:text-sm uppercase tracking-wider'>
            Intense Hydration
          </p>
          <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl leading-tight'>
            Restore Skin Moisture
          </h2>
          <p className='text-gray-600 text-sm sm:text-base leading-relaxed'>
            Tulla at volutpat diam ut venenatis tellus in. Tellus molestie nunc
            non blandit massa enim nec dui nunc.
          </p>

          {/* Info Boxes */}
          <div className='flex sm:flex-row flex-col sm:justify-between gap-6 mt-4'>
            <div>
              <h3 className='font-semibold text-base'>Opening Hours</h3>
              <p className='text-gray-600 text-sm'>Mon - Fri : 08:30 - 20:00</p>
              <p className='text-gray-600 text-sm'>Sat & Sun : 09:30 - 21:30</p>
            </div>

            <div>
              <h3 className='font-semibold text-base'>Reach Us</h3>
              <p className='text-gray-600 text-sm'>info@example.com</p>
              <p className='text-gray-600 text-sm'>+000 123 456789</p>
            </div>
          </div>

          <button className='bg-[#e9d9bd] hover:bg-[#d8c3a2] shadow mt-6 px-6 py-2.5 font-medium text-sm transition-all duration-300'>
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
