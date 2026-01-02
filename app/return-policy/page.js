import Heading from '@/app/component/Heading'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading title='Refund & Return Policy' />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
            <div className='lg:col-span-1'>
              <p className='text-black/60 text-xs sm:text-sm uppercase tracking-[0.35em]'>
                RETURNS & REFUNDS
              </p>
              <h2 className='mt-3 font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight'>
                Refund & Return Policy
              </h2>
              <p className='mt-4 text-black/70 text-sm leading-relaxed'>
                We want you to be satisfied. If something is wrong with your order, follow the steps
                below to request a return or refund.
              </p>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Before you request</div>
                <div className='mt-2 text-black/70 text-sm leading-relaxed'>
                  Keep the invoice and packaging. For damaged/wrong items, please provide an unboxing
                  video.
                </div>
                <div className='mt-5'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center bg-[#e5d9c9] hover:bg-[#decfb9] px-6 py-2.5 border border-black/20 font-semibold text-black text-sm uppercase tracking-[0.15em] transition-colors'
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>

            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Eligibility</div>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Wrong / Damaged Item</div>
                    <div className='mt-1 text-black/70 text-sm'>Report within 24 hours of delivery</div>
                  </div>
                  <div className='bg-[#f3eadf] p-5 border border-black/10 rounded-lg'>
                    <div className='font-semibold text-black'>Change of Mind</div>
                    <div className='mt-1 text-black/70 text-sm'>Only if unused & sealed (where applicable)</div>
                  </div>
                </div>
                <div className='mt-5 text-black/70 text-sm leading-relaxed'>
                  For hygiene and safety reasons, we may not accept returns on opened cosmetics,
                  skincare, or personal care products.
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>How to Request a Return</div>
                <div className='mt-5 grid grid-cols-1 gap-4'>
                  {[
                    {
                      title: 'Step 1: Contact us',
                      desc: 'Send your order number, product name, and the issue via Contact page or support channels.'
                    },
                    {
                      title: 'Step 2: Share proof',
                      desc: 'Provide an unboxing video + clear photos for damaged or wrong items.'
                    },
                    {
                      title: 'Step 3: Approval',
                      desc: 'Our team will verify and confirm eligibility, then share next instructions.'
                    },
                    {
                      title: 'Step 4: Pickup / Drop-off',
                      desc: 'If approved, we will arrange pickup (where available) or provide drop-off details.'
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
                <div className='font-bold text-black text-xl'>Refund Timeline</div>
                <div className='mt-4 text-black/70 text-sm leading-relaxed'>
                  After we receive and inspect the returned product, refunds are usually processed
                  within 3–7 business days. The exact time may vary depending on payment method.
                </div>
              </div>

              <div className='bg-[#ede4d8] p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>Also check</div>
                <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Link
                    href='/shipping-policy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Delivery & Shipping Policy
                  </Link>
                  <Link
                    href='/faqs'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    FAQs
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
