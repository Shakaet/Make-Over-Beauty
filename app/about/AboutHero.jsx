import React from 'react'

const AboutHero = () => {
  return (
    <section className='pt-10 pb-10'>
      <div className='items-center gap-12 grid grid-cols-1 lg:grid-cols-2 px-22 sm:px-26'>
        <div className='space-y-6'>
          <p className='text-gray-500 text-xs uppercase tracking-wider'>
            Effective for skin
          </p>
          <h1 className='font-extrabold text-4xl md:text-5xl tracking-tight'>
            Guaranteed Result In 2 Weeks
          </h1>
          <p className='max-w-xl text-gray-600 text-sm'>
            Quickly pursue granular synergy after just-in-time niche markets.
            Phosfluorescently syndicate sticky content whereas robust resources.
          </p>

          <div className='flex items-center gap-6 mt-6 text-gray-600 text-sm'>
            <div className='flex items-center gap-3'>
              <span className='text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M12 21.325q-.35 0-.7-.125t-.625-.375Q9.05 19.325 7.8 17.9t-2.087-2.762t-1.275-2.575T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 1.125-.437 2.363t-1.275 2.575T16.2 17.9t-2.875 2.925q-.275.25-.625.375t-.7.125M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12'
                  />
                </svg>
              </span>
              <div>
                <div>72 St. Merch Street</div>
                <div className='text-gray-500 text-xs'>LA, California</div>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M20.875 22q-3.9 0-7.337-1.475q-3.438-1.475-6-4.037q-2.563-2.563-4.05-6Q2 7.05 2 3.125q-.025-.45.3-.788Q2.625 2 3.1 2H7q.45 0 .775.337q.325.338.325.813q0 1.1.15 2.075q.15.975.475 1.85q.125.275.05.562q-.075.288-.3.538l-2.5 2.5q1.075 2.2 3.05 4.175Q11 16.825 13.275 18l2.5-2.5q.225-.225.525-.3q.3-.075.6.05q.925.3 1.912.462q.988.163 2.038.163q.475 0 .813.35q.337.35.337.85V20.9q0 .45-.325.775t-.8.325ZM20 12q0-3.35-2.325-5.675Q15.35 4 12 4V2q2.075 0 3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12Zm-4 0q0-1.65-1.175-2.825Q13.65 8 12 8V6q2.5 0 4.25 1.75T18 12Z'
                  />
                </svg>
              </span>
              <div>+00 123 456 789</div>
            </div>

            <div className='flex items-center gap-3'>
              <span className='text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='32'
                  height='32'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7.175q.125 0 .263-.038t.262-.112L19.6 8.25q.2-.125.3-.312t.1-.413q0-.5-.425-.75T18.7 6.8L12 11L5.3 6.8q-.45-.275-.875-.012T4 7.525q0 .25.1.438t.3.287l7.075 4.425q.125.075.263.113t.262.037'
                  />
                </svg>
              </span>
              <div>info@example.com</div>
            </div>
          </div>
        </div>

        <div className='rounded w-full overflow-hidden'>
          <div className='relative bg-gray-100 w-full h-72 md:h-96'>
            <img
              src='https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-1.jpg'
              alt='hero'
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
