"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "What is the shelf life of cosmetics?",
      answer: "Sed libero enim sed faucibus turpis rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt."
    },
    {
      question: "Does your skincare have preservatives in it?",
      answer: "Our skincare products use natural preservatives that are safe and effective. We carefully select ingredients that maintain product integrity while being gentle on your skin."
    },
    {
      question: "Will your skincare products give me an allergic reaction?",
      answer: "All our products are dermatologically tested and made with natural ingredients. However, if you have sensitive skin, we recommend doing a patch test before regular use."
    },
    {
      question: "Can I cancel my order?",
      answer: "Yes, you can cancel your order within 24 hours of placement. Contact our customer service team for assistance."
    },
    {
      question: "What are the shipping charges?",
      answer: "Shipping charges vary based on your location and order value. We offer free shipping on orders above $75."
    }
  ]

  return (
    <section className="bg-[#f3eadf] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - FAQ Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/60 mb-2">
                OUR EXPERTS ANSWER
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
                Faq For Cosmetic Products
              </h2>
            </div>

            {/* FAQ List */}
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div key={index} className="border-t border-black/10 last:border-b">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-6 text-left flex items-start justify-between group"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span className="text-black/60 font-semibold text-lg mt-1 min-w-[24px]">
                        {index + 1}
                      </span>
                      <span className="text-black font-semibold text-base sm:text-lg group-hover:text-black/80 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-black/60 mt-1 transition-transform flex-shrink-0 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openIndex === index && (
                    <div className="pb-6 pl-12 pr-12">
                      <p className="text-black/70 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[400px] sm:h-[500px] lg:h-full min-h-[600px] lg:min-h-[700px]">
            <Image
              src="/images/makeup3.webp"
              alt="Facial treatment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq