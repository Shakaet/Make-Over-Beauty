import React from 'react'

const FeatureSection = () => {
  return (
    <section className='bg-white/30 mt-16 py-12'>
      <div className='items-center gap-8 grid grid-cols-1 lg:grid-cols-3 mx-auto p-6 max-w-7xl'>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 col-span-2'>
          <div className='rounded overflow-hidden'>
            <img
              src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-2-693x1024.jpg'
              alt='f1'
              width={800}
              height={600}
              style={{ objectFit: 'cover' }}
              className='hover:scale-95 hover:transition-transform'
            />
          </div>
          <div className='rounded overflow-hidden'>
            <img
              src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-3-693x1024.jpg'
              alt='f2'
              width={800}
              height={600}
              style={{ objectFit: 'cover' }}
              className='hover:scale-95 hover:transition-transform'
            />
          </div>
        </div>

        <div className='pl-6'>
          <p className='text-gray-500 text-xs uppercase'>Intense Hydration</p>
          <h2 className='font-bold text-3xl'>Restore Skin Moisture</h2>
          <p className='mt-3 text-gray-600'>
            Tulla at volutpat diam ut venenatis tellus in. Tellus molestie nunc
            non blandit massa enim nec dui nunc.
          </p>

          <div className='flex justify-between items-center'>
            <div className='mt-6'>
              <h3 className='font-bold'>Opening Hours</h3>
              <p className='text-gray-600 text-sm'>Mon - Fri : 08:30 - 20:00</p>
              <p className='text-gray-600 text-sm'>Sat & Sun : 09:30 - 21:30</p>
            </div>

            <div className='mt-6'>
              <h3 className='font-bold'>Reach Us</h3>
              <p className='text-gray-600 text-sm'>info@example.com</p>
              <p className='text-gray-600 text-sm'>+000 123 456789</p>
            </div>
          </div>

          <button className='bg-[#e9d9bd] shadow mt-6 px-5 py-2 rounded'>
            Read More
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
