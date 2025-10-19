import React from 'react'
import Image from 'next/image'
import productImg from '../images/cream.png'

const PureSimple = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: Product image */}
          <div className="relative mx-auto w-full sm:w-[420px] md:w-[560px] lg:w-[720px] xl:w-[900px] max-w-full">
            <Image
              src={productImg}
              alt="Deeply Nourishing Hair Serum bg-transparent"
              className="h-auto w-full drop-shadow-2xl"
              sizes="(min-width: 1280px) 900px, (min-width: 1024px) 720px, (min-width: 768px) 560px, (min-width: 640px) 420px, 100vw"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="text-stone-900">
            <p className="text-xs font-semibold tracking-[0.25em] text-stone-700 uppercase">Pure and simple</p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Deeply Nourishing Hair
              <br className="hidden md:block" />
              Serum For Glowing &amp;
              <br className="hidden md:block" />
              Healthy Hair
            </h2>
            <p className="mt-5 max-w-xl text-stone-700">
              Ut tempor sem leo, a ultricies quam aliquam eget. Vivamus commodo scelerisque vel,
              quis viverra velit bibendum vel. Phasellus suscipit leo et vestibulum.
            </p>

            {/* Feature badges */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md">
              {[
                { label: 'Strong & Smooth' },
                { label: 'Sulfate-Free' },
                { label: 'Paraben-Free' },
                { label: '100% Vegan' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/70 text-stone-700">✓</span>
                  <span className="text-sm font-medium text-stone-800">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <button className="rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold tracking-wider text-white hover:bg-stone-800">SHOP LILAC</button>
              <div className="flex items-center gap-3 text-stone-700">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 bg-white/70">💬</span>
                <div className="text-sm">
                  <div className="font-medium text-stone-800">Chat Us Anytime</div>
                  <div className="text-stone-600">+00 123 456 789</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PureSimple