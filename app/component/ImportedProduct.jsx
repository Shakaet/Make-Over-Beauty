import React from 'react'
import Image from 'next/image'

import img1 from '/public/images/makeup1.jpeg'
import img2 from '/public/images/makeup2.png'
import img3 from '/public/images/makeup3.webp'
import img4 from '/public/images/makeuo4.webp'
import img5 from '/public/images/makeup5.jpeg'

const PRODUCTS = [
  {
    id: 1,
    name: 'Detangling Hair Spray',
    price: '$5.00 – $10.00',
    primary: img1,
    secondary: img3,
    rating: 4
  },
  {
    id: 2,
    name: 'Anti-Aging Face Cream',
    price: '$5.00 – $10.00',
    primary: img2,
    secondary: img4,
    rating: 4
  },
  {
    id: 3,
    name: 'Moisturizing Curl Cream',
    price: '$11.00',
    primary: img3,
    secondary: img1,
    rating: 5
  },
  {
    id: 4,
    name: 'Face Moisturizer & Face Wash',
    price: '$11.05',
    primary: img5,
    secondary: img2,
    rating: 4,
    soldOut: true
  }
]

const ImportedProduct = () => {
  return (
    <section className='bg-[#f5f1ec] px-4 py-16'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <p className='mb-3 font-semibold text-gray-600 text-xs tracking-widest'>
            HOT SALE
          </p>
          <h2 className='font-bold text-gray-900 text-4xl md:text-5xl'>
            Imported Products
          </h2>
        </div>

        <div className='gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
          {PRODUCTS.map(p => (
            <div key={p.id} className='group'>
              <div className='relative rounded-sm ring-1 ring-black/5 overflow-hidden'>
                {p.soldOut && (
                  <span className='top-4 left-4 z-10 absolute bg-[#efe2cc] px-3 py-1 font-semibold text-[#0a0a0a] text-[10px] uppercase tracking-[0.25em]'>
                    Sold out
                  </span>
                )}

                <div className='relative w-full h-96'>
                  <div className='absolute inset-0 flex transition-transform group-hover:-translate-x-full duration-500 ease-out'>
                    {/* Primary image */}
                    <div className='relative w-full h-full shrink-0'>
                      <Image
                        src={p.primary}
                        alt={p.name}
                        fill
                        sizes='(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw'
                        className='object-cover'
                        priority={p.id === 1}
                      />
                    </div>
                    {/* Secondary image (revealed on hover by sliding) */}
                    <div className='relative w-full h-full shrink-0'>
                      <Image
                        src={p.secondary}
                        alt={`${p.name} secondary`}
                        fill
                        sizes='(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw'
                        className='object-cover'
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-6 text-center'>
                <h3 className='font-semibold text-stone-900 text-lg'>
                  {p.name}
                </h3>
                <div className='text-sm'>
                  <span className='text-amber-500'>{'★'.repeat(p.rating)}</span>
                  <span className='text-stone-300'>
                    {'★'.repeat(5 - p.rating)}
                  </span>
                </div>
                <p className='font-medium text-stone-800'>{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImportedProduct
