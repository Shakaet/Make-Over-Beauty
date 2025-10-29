const members = [
  {
    name: 'Nicolas',
    role: 'Product Manager',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-7.jpg`
  },
  {
    name: 'Niyama',
    role: 'CEO',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-6.jpg`
  },
  {
    name: 'Mark',
    role: 'Founder',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-5.jpg`
  },
  {
    name: 'Bernita',
    role: 'Co-Founder',
    img: `https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/about-4.jpg`
  }
]

const Team = () => {
  return (
    <section className='py-16'>
      <div className='mx-auto px-22 sm:px-26'>
        <p className='text-gray-500 text-xs text-center'>Our Team</p>
        <h2 className='mt-2 font-bold text-3xl text-center'>
          Cosmetic Experts
        </h2>

        <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-10'>
          {members.map(m => (
            <div
              key={m.name}
              className='bg-white shadow-sm rounded overflow-hidden'
            >
              <div className='relative w-full h-52'>
                <img
                  src={m.img}
                  alt={m.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className='p-4'>
                <h3 className='font-semibold'>{m.name}</h3>
                <p className='text-gray-500 text-xs'>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
