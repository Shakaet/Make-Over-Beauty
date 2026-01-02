'use client'

import Heading from '@/app/component/Heading'
import Link from 'next/link'
import { useState } from 'react'

 const faqs = [
  {
    question: 'How do I place an order?',
    answer:
      'Browse products, add your items to the cart, then proceed to checkout. After submitting your details and confirming the order, you will receive an order confirmation.'
  },
  {
    question: 'Can I order without creating an account?',
    answer:
      'Yes. You can place an order as a guest. However, creating an account helps you track orders and checkout faster next time.'
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We support Cash on Delivery (where available) and other payment methods shown at checkout. Available options may vary by location.'
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Delivery time depends on your location. Typically, Dhaka city deliveries take 1–2 business days and outside Dhaka takes 2–5 business days.'
  },
  {
    question: 'How can I track my order?',
    answer:
      'After your order is shipped, we will share a tracking/update message. You can also contact our support team with your order number.'
  },
  {
    question: 'Do you offer returns or exchanges?',
    answer:
      'Yes, we do. Please check our Refund & Return Policy page for eligibility, timelines, and step-by-step instructions.'
  }
]

const page = () => {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className='bg-cover bg-no-repeat bg-center bg-fixed home-bg'>
      <Heading title='Faqs' />

      <section className='relative bg-[#f7efe6] py-16 sm:py-20'>
        <div className='mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
            <div className='lg:col-span-1'>
              <p className='text-black/60 text-xs sm:text-sm uppercase tracking-[0.35em]'>
                HELP CENTER
              </p>
              <h2 className='mt-3 font-extrabold text-3xl sm:text-4xl leading-tight tracking-tight'>
                Frequently Asked Questions
              </h2>
              <p className='mt-4 text-black/70 text-sm leading-relaxed'>
                Quick answers about ordering, delivery, payments, and returns. If you still need help,
                please contact us and we will respond as soon as possible.
              </p>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Need Support?</div>
                <div className='mt-2 text-black/70 text-sm'>
                  Share your order number and issue details to get faster assistance.
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

            <div className='lg:col-span-2'>
              <div className='bg-white/40 border border-black/10 rounded-xl overflow-hidden'>
                {faqs.map((item, idx) => {
                  const isOpen = openIndex === idx

                  return (
                    <div key={item.question} className='border-b last:border-b-0 border-black/10'>
                      <button
                        type='button'
                        onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                        className='w-full flex items-center justify-between gap-6 px-6 sm:px-8 py-5 text-left'
                        aria-expanded={isOpen}
                      >
                        <span className='font-semibold text-black text-base sm:text-lg'>{item.question}</span>
                        <span
                          className={`flex items-center justify-center w-9 h-9 border border-black/15 rounded-full bg-[#f3eadf] text-black transition-transform ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M12 5v14' />
                            <path d='M5 12h14' />
                          </svg>
                        </span>
                      </button>

                      {isOpen ? (
                        <div className='px-6 sm:px-8 pb-6 text-black/75 text-sm leading-relaxed'>
                          {item.answer}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>

              <div className='bg-[#ede4d8] mt-8 p-6 border border-black/10 rounded-lg'>
                <div className='font-bold text-black text-lg'>Related Policies</div>
                <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                  <Link
                    href='/shipping-policy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Delivery & Shipping Policy
                  </Link>
                  <Link
                    href='/return-policy'
                    className='bg-[#f3eadf] hover:bg-[#efe1d2] px-4 py-3 border border-black/10 rounded-md text-sm font-medium text-black transition-colors'
                  >
                    Refund & Return Policy
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
