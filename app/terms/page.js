import Heading from '@/app/component/Heading'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading title='Terms & Conditions' />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
            <div className='lg:col-span-1'>
              <p className='text-black/60 text-xs sm:text-sm uppercase tracking-[0.35em]'>
                LEGAL
              </p>
              <h2 className='mt-3 font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight'>
                Terms & Conditions
              </h2>
              <p className='mt-4 text-black/70 text-sm leading-relaxed'>
                By using our website and placing an order, you agree to the terms below. Please read
                carefully.
              </p>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Quick Links</div>
                <div className='mt-4 grid grid-cols-1 gap-3'>
                  <Link
                    href='/privacy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href='/return-policy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Refund & Return Policy
                  </Link>
                  <Link
                    href='/shipping-policy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Delivery & Shipping Policy
                  </Link>
                </div>
              </div>
            </div>

            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>1. About Our Service</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  We provide beauty and personal care products through our online store. Product
                  descriptions, pricing, and availability may change without notice.
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>2. Orders & Payments</div>
                <div className='mt-4 grid grid-cols-1 gap-4'>
                  {[
                    {
                      title: 'Order Confirmation',
                      desc: 'An order is confirmed after checkout and verification. We may contact you to confirm details.'
                    },
                    {
                      title: 'Pricing',
                      desc: 'Prices shown on the website are subject to change. Any discounts/promotions apply as displayed at checkout.'
                    },
                    {
                      title: 'Payment Methods',
                      desc: 'Available payment options are shown at checkout and may vary by location.'
                    }
                  ].map(item => (
                    <div key={item.title} className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                      <div className='font-semibold text-black'>{item.title}</div>
                      <div className='mt-1 text-black/70 text-sm leading-relaxed'>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>3. Delivery</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  Delivery timelines depend on courier service and location. For details, please see
                  our Delivery & Shipping Policy.
                </div>
                <div className='mt-4'>
                  <Link
                    href='/shipping-policy'
                    className='inline-flex items-center bg-[#e5d9c9] hover:bg-[#decfb9] px-6 py-2.5 border border-black/20 font-semibold text-black text-sm transition-colors'
                  >
                    View Shipping Policy
                  </Link>
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>4. Returns & Refunds</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  Return eligibility depends on item condition and category. For details, please see
                  our Refund & Return Policy.
                </div>
                <div className='mt-4'>
                  <Link
                    href='/return-policy'
                    className='inline-flex items-center bg-[#e5d9c9] hover:bg-[#decfb9] px-6 py-2.5 border border-black/20 font-semibold text-black text-sm transition-colors'
                  >
                    View Return Policy
                  </Link>
                </div>
              </div>

              <div className='bg-[#ede4d8] p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>5. Contact</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  For any questions about these terms, please contact our support.
                </div>
                <div className='mt-4'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center bg-[#f3eadf] hover:bg-[#efe1d2] px-6 py-2.5 border border-black/10 font-semibold text-black text-sm transition-colors'
                  >
                    Contact Support
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
