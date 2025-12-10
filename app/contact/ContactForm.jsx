"use client"
import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="bg-[#f3eadf] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Contact Form */}
          <div className="relative">
            {/* Decorative Floral Pattern */}
            <div className="absolute -bottom-10 -left-10 opacity-5 pointer-events-none">
              <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 50 Q60 30 70 50 T90 50" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M80 40 Q90 20 100 40 T120 40" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M110 50 Q120 30 130 50 T150 50" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M70 70 Q80 50 90 70 T110 70" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                <path d="M100 80 Q110 60 120 80 T140 80" stroke="#f59e0b" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <div className="relative z-10">
              <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/60 mb-4">
                CONTACT FORM
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8">
                Ask Us Anything
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name here"
                    required
                    className="w-full px-4 py-3 border border-black/20 bg-[#f3eadf] text-black placeholder:text-black/50 rounded-sm focus:outline-none focus:border-black/40 transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your E-Mail here"
                    required
                    className="w-full px-4 py-3 border border-black/20 bg-[#f3eadf] text-black placeholder:text-black/50 rounded-sm focus:outline-none focus:border-black/40 transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write a Message"
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-black/20 bg-[#f3eadf] text-black placeholder:text-black/50 rounded-sm focus:outline-none focus:border-black/40 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#e5d9c9] border border-black/20 text-black uppercase tracking-[0.15em] font-semibold text-sm hover:bg-[#decfb9] transition-colors"
                >
                  SEND MAIL
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="bg-[#ede4d8] rounded-lg p-8 lg:p-10">
            {/* Address Section */}
            <div className="mb-8 pb-8 border-b border-black/10">
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">Address</h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-2">
                    No: 58 A, East Madison Street,<br />
                    Baltimore, MD, USA 4508
                  </p>
                  <p className="text-black/70 text-sm leading-relaxed">
                    54 Cunningham Street,<br />
                    Joanna, Australia, 6236.
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Section */}
            <div className="mb-8 pb-8 border-b border-black/10">
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">Phone</h3>
                  <p className="text-black/70 text-sm mb-2">+1000-123-456789</p>
                  <p className="text-black/70 text-sm">+100-123-456789</p>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div>
              <div className="flex items-start gap-4 mb-4">
                <svg className="w-6 h-6 text-black flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h3 className="text-lg font-bold text-black mb-3">Email</h3>
                  <p className="text-black/70 text-sm mb-2">support@example.com</p>
                  <p className="text-black/70 text-sm">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm