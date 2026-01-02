import Heading from '@/app/component/Heading'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading title='Delivery & Shipping Policy' />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
            <div className='lg:col-span-1'>
              <p className='text-black/60 text-xs sm:text-sm uppercase tracking-[0.35em]'>
                SHIPPING INFO
              </p>
              <h2 className='mt-3 font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight'>
                Delivery & Shipping Policy
              </h2>
              <p className='mt-4 text-black/70 text-sm leading-relaxed'>
                We aim to deliver quickly and safely. Below you will find estimated delivery times,
                delivery charges, and what to do if there is an issue.
              </p>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Need help with delivery?</div>
                <div className='mt-2 text-black/70 text-sm'>
                  Contact us with your order number for faster updates.
                </div>
                <div className='mt-5'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center bg-[#e5d9c9] hover:bg-[#decfb9] px-6 py-2.5 border border-black/20 font-semibold text-black text-sm uppercase tracking-[0.15em] transition-colors'
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Estimated Delivery Time</div>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4'>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Dhaka City</div>
                    <div className='mt-1 text-black/70 text-sm'>1–2 business days</div>
                  </div>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Outside Dhaka</div>
                    <div className='mt-1 text-black/70 text-sm'>2–5 business days</div>
                  </div>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Remote Areas</div>
                    <div className='mt-1 text-black/70 text-sm'>3–7 business days</div>
                  </div>
                </div>
                <div className='mt-5 text-black/70 text-sm leading-relaxed'>
                  Delivery time may vary due to weather, public holidays, or courier delays.
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Delivery Charges</div>
                <div className='mt-4 text-black/70 text-sm leading-relaxed'>
                  Delivery charge depends on your delivery location and order size. The final shipping
                  fee will be shown at checkout before you place the order.
                </div>
                <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Standard Delivery</div>
                    <div className='mt-1 text-black/70 text-sm'>Shown at checkout</div>
                  </div>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Cash on Delivery</div>
                    <div className='mt-1 text-black/70 text-sm'>Available in selected areas</div>
                  </div>
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Order Processing</div>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Processing Time</div>
                    <div className='mt-1 text-black/70 text-sm'>Usually within 24 hours</div>
                  </div>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Dispatch</div>
                    <div className='mt-1 text-black/70 text-sm'>After confirming stock & address</div>
                  </div>
                </div>
                <div className='mt-5 text-black/70 text-sm leading-relaxed'>
                  If an item is out of stock, we will contact you with options (replacement or refund).
                </div>
              </div>

              <div className='bg-[#ede4d8] p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Delivery Issue?</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  If you receive a damaged parcel or wrong item, please contact us within 24 hours of
                  delivery with an unboxing video and clear photos.
                </div>
                <div className='mt-5'>
                  <Link
                    href='/return-policy'
                    className='inline-flex items-center bg-[#f3eadf] hover:bg-[#efe1d2] px-6 py-2.5 border border-black/10 font-semibold text-black text-sm transition-colors'
                  >
                    View Refund & Return Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default page
