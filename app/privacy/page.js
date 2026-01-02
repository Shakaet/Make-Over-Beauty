import Heading from '@/app/component/Heading'
import Link from 'next/link'

const page = () => {
  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading title='Privacy Policy' />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 items-start'>
            <div className='lg:col-span-1'>
              <p className='text-black/60 text-xs sm:text-sm uppercase tracking-[0.35em]'>
                YOUR PRIVACY
              </p>
              <h2 className='mt-3 font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight'>
                Privacy Policy
              </h2>
              <p className='mt-4 text-black/70 text-sm leading-relaxed'>
                This policy explains how we collect, use, and protect your personal information when
                you use our website and services.
              </p>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Related</div>
                <div className='mt-4 grid grid-cols-1 gap-3'>
                  <Link
                    href='/terms'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href='/contact'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            <div className='lg:col-span-2 space-y-8'>
              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>1. Information We Collect</div>
                <div className='mt-4 grid grid-cols-1 gap-4'>
                  {[
                    {
                      title: 'Account & Order Information',
                      desc: 'Name, phone number, email, shipping address, and order details.'
                    },
                    {
                      title: 'Support Messages',
                      desc: 'Information you provide when you contact us (message content, attachments, order number).'
                    },
                    {
                      title: 'Usage Data',
                      desc: 'Basic analytics such as pages visited and device/browser information to improve the site experience.'
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
                <div className='font-bold text-black text-xl'>2. How We Use Your Information</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  We use your data to process orders, deliver products, provide customer support, and
                  improve our services. We do not sell your personal information.
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>3. Data Sharing</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  We may share necessary information with delivery partners to complete shipments, and
                  with service providers that help us run the website. We only share what is required.
                </div>
              </div>

              <div className='bg-white/40 p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>4. Data Security</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  We take reasonable measures to protect your information. However, no method of
                  transmission over the internet is 100% secure.
                </div>
              </div>

              <div className='bg-[#ede4d8] p-6 sm:p-8 border border-black/10 rounded-xl'>
                <div className='font-bold text-black text-xl'>5. Questions</div>
                <div className='mt-3 text-black/70 text-sm leading-relaxed'>
                  If you have questions about this Privacy Policy, please contact us.
                </div>
                <div className='mt-4'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center bg-[#e5d9c9] hover:bg-[#decfb9] px-6 py-2.5 border border-black/20 font-semibold text-black text-sm transition-colors'
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
