"use client"
import React from 'react'

const ContactMap = () => {
  // Replace these coordinates with your actual business location
  // Melbourne, Australia coordinates as shown in the image
  const latitude = -37.8136
  const longitude = 144.9631
  const address = "54 Cunningham Street, Joanna, Australia, 6236"

  return (
    <section className="bg-[#f3eadf] py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-black/60 mb-4">
            LOCATION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Find Us Here
          </h2>
          <p className="text-black/70 text-sm">
            Visit us at our physical location or explore the map below
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="relative w-full h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg border border-black/10">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14856.364017453705!2d91.95944888715822!3d21.425667700000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30adc8652d5a8305%3A0xad38092104307ea7!2sLong%20Beach%20Hotel%20Cox's%20Bazar!5e0!3m2!1sen!2sbd!4v1735156684722!5m2!1sen!2sbd`}
            title="Business Location"
            className="absolute inset-0"
          />
        </div>

        {/* Map Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#ede4d8] rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Main Office
            </h3>
            <p className="text-black/70 text-sm leading-relaxed">
              {address}
            </p>
          </div>

          <div className="bg-[#ede4d8] rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Business Hours
            </h3>
            <p className="text-black/70 text-sm leading-relaxed">
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactMap