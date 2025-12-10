import React from 'react'

const LinkItem = ({ href = '#', children }) => (
  <li>
    <a
      href={href}
      className='block py-1.5 text-black/70 hover:text-black text-sm transition-colors'
    >
      {children}
    </a>
  </li>
)

const SocialIcon = ({ label, path }) => (
  <a
    aria-label={label}
    href='#'
    className='inline-flex justify-center items-center border border-black/20 hover:border-black rounded-full w-9 h-9 text-black/70 hover:text-black transition-colors'
  >
    <svg viewBox='0 0 24 24' fill='currentColor' className='w-4 h-4'>
      <path d={path} />
    </svg>
  </a>
)

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer className='bg-[#f3ede6] text-[#0a0a0a]'>
      {/* Top grid */}
      <div className='mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-10 pt-16 max-w-7xl'>
        <div className='gap-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'>
          {/* Brand and blurb */}
          <div className='lg:col-span-2'>
            <div className='font-serif text-5xl sm:text-6xl italic tracking-wide'>
              Blooming Beauty By Moon
            </div>
            <p className='mt-6 max-w-md text-black/70 text-sm leading-7'>
              Sed viverra tellus in hac habitasse platea dictumst vestibulum.
              Mauris augue neque gravida in. In cursus turpis massa tincidunt.
            </p>
          </div>

          {/* About */}
          <div>
            <h3 className='font-semibold text-lg'>About</h3>
            <ul className='mt-4'>
              <LinkItem>Career</LinkItem>
              <LinkItem>Stockists</LinkItem>
              <LinkItem>Shop Locator</LinkItem>
              <LinkItem>Contact</LinkItem>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className='font-semibold text-lg'>Help</h3>
            <ul className='mt-4'>
              <LinkItem>Shipping & Returns</LinkItem>
              <LinkItem>Track Order</LinkItem>
              <LinkItem>FAQ</LinkItem>
              <LinkItem>Product Returns</LinkItem>
              <LinkItem>Checkout</LinkItem>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className='font-semibold text-lg'>Information</h3>
            <ul className='mt-4'>
              <LinkItem>Store Information</LinkItem>
              <LinkItem>About Store</LinkItem>
              <LinkItem>Latest Products</LinkItem>
              <LinkItem>New Discounts</LinkItem>
              <LinkItem>Sale Products</LinkItem>
            </ul>
          </div>

          {/* Newsletter */}
          {/* <div className="sm:col-span-2 md:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-lg">Newsletter</h3>
            <p className="mt-4 text-black/70 text-sm">
              Signup for our newsletter to stay up to date on sales and events.
            </p>
            <div className="flex mt-4 w-full max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white/60 px-3 py-2 border border-black/20 rounded-l-md outline-none focus:ring-2 focus:ring-black/20 placeholder:text-black/50 text-sm"
              />
              <button
                aria-label="Subscribe"
                className="bg-[#e5d9c9] hover:bg-[#decfb9] px-4 border border-black/20 border-l-0 rounded-r-md transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M2 12h17m0 0-6-6m6 6-6 6" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <SocialIcon label="Facebook" path="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12z" />
              <SocialIcon label="Twitter" path="M22 5.8c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.6 1.1A3.7 3.7 0 0 0 12 8.6c0 .3 0 .6.1.9-3-.2-5.7-1.6-7.5-3.9-.3.6-.5 1.3-.5 2.1 0 1.4.7 2.6 1.8 3.3-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.7 3.2 4.1-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.7 2.1 3 3.9 3.1A7.5 7.5 0 0 1 2 18.6 10.6 10.6 0 0 0 7.7 20c6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.3-1.2 1.8-1.9z" />
              <SocialIcon label="Instagram" path="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18.5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </div>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4 mt-10 pt-6 border-black/10 border-t'>
          {/* Payments */}
          <div className='flex items-center gap-4 text-xs'>
            {/* Legal */}
            <div className='flex items-center gap-4 text-sm'>
              <SocialIcon
                label='Facebook'
                path='M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.2 3-3.2.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.63-1.3 1.3V12h2.2l-.35 3h-1.85v7A10 10 0 0 0 22 12z'
              />
              <SocialIcon
                label='Twitter'
                path='M22 5.8c-.7.3-1.5.5-2.2.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.9-2.6 1.1A3.7 3.7 0 0 0 12 8.6c0 .3 0 .6.1.9-3-.2-5.7-1.6-7.5-3.9-.3.6-.5 1.3-.5 2.1 0 1.4.7 2.6 1.8 3.3-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.7 3.2 4.1-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1.5 1.7 2.1 3 3.9 3.1A7.5 7.5 0 0 1 2 18.6 10.6 10.6 0 0 0 7.7 20c6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.3-1.2 1.8-1.9z'
              />
              <SocialIcon
                label='Instagram'
                path='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM18.5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0z'
              />
            </div>
          </div>

          {/* Copyright */}
          <div className='text-black/70 text-sm'>
            © {year} blooming beauty by moon, Wedesign Tech.
          </div>

          {/* Legal */}
          <div className='flex items-center gap-4 text-sm'>
            <a href='#' className='text-black/70 hover:text-black'>
              Privacy Policy
            </a>
            <span className='text-black/30'>|</span>
            <a href='#' className='text-black/70 hover:text-black'>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
