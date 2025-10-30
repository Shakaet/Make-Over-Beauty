'use client'
import React, { useState } from 'react'
import Heading from '../../component/Heading'
import Link from 'next/link'

const faqs = [
  {
    question: 'Are your skincare products suitable for sensitive skin?',
    answer:
      'Yes, all our skincare products are dermatologically tested and formulated with natural ingredients suitable for sensitive skin. We avoid harsh chemicals, parabens, and artificial fragrances.'
  },
  {
    question: 'How long does it take to see visible results?',
    answer:
      'You’ll typically notice visible improvements within 2 weeks of consistent use. However, results may vary depending on your skin type and daily routine.'
  },
  {
    question: 'Are your products cruelty-free?',
    answer:
      'Absolutely. We are 100% cruelty-free and never test on animals. Our formulas are ethically created and environmentally friendly.'
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship worldwide! Delivery times vary depending on your location, but most orders arrive within 5–10 business days.'
  },
  {
    question: 'Can I return a product if it doesn’t suit me?',
    answer:
      'Of course. We offer a 7-day return policy for unused and unopened items. Just reach out to our support team to initiate a hassle-free return.'
  }
]

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div>
      <Heading />

      <section className='bg-[#F9F5F2] py-16 text-black/80'>
        <div className='max-w-4xl mx-auto px-6'>
          <h2 className='text-3xl font-bold text-center text-gray-900 mb-4'>
            Frequently Asked Questions
          </h2>
          <p className='text-center text-gray-600 max-w-2xl mx-auto mb-10'>
            Have questions about our beauty and skincare essentials? Here are
            some of the most common ones answered by our skincare experts.
          </p>

          <div className='space-y-4'>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded-2xl transition hover:shadow-lg'
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className='w-full flex justify-between items-center px-5 py-4 text-left focus:outline-none'
                >
                  <span className='font-medium text-gray-800 text-base sm:text-lg'>
                    {faq.question}
                  </span>
                  <span className='text-gray-500 text-xl'>
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className='px-5 pb-5 text-sm sm:text-base text-gray-600 animate-fadeIn'>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className='mt-12 text-center'>
            <h4 className='text-lg font-semibold text-gray-800'>
              Still have a question?
            </h4>
            <p className='text-gray-600 mt-1'>
              Contact our support team — we’re here to help you find the perfect
              skincare solution.
            </p>
            <Link
              href='/pages/contact'
              className='inline-block mt-4 bg-[#E8D8C0] hover:bg-[#dec5a4] text-gray-900 font-medium px-6 py-2 rounded-full shadow transition'
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
