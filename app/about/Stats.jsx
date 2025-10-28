import React from 'react'

const Stats = () => {
  return (
    <section className='bg-[#F3EAE3] py-12'>
      <div className='flex md:flex-row flex-col justify-between items-center gap-8 mx-auto p-6 max-w-7xl'>
        <div className='max-w-xl'>
          <h3 className='font-bold text-2xl'>
            Luxurious & Premium Essential Daily Use Cosmetic Product
          </h3>
          <p className='mt-4 text-gray-600'>
            Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat.
          </p>
        </div>

        <div className='flex gap-8'>
          <div className='text-center'>
            <div className='font-bold text-2xl'>12k</div>
            <div className='text-gray-500 text-sm'>Beauty Products</div>
          </div>
          <div className='text-center'>
            <div className='font-bold text-2xl'>5k</div>
            <div className='text-gray-500 text-sm'>Employees</div>
          </div>
          <div className='text-center'>
            <div className='font-bold text-2xl'>20k</div>
            <div className='text-gray-500 text-sm'>Happy Users</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
