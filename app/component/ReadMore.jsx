'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

export default function ReadMore() {
  const [open, setOpen] = useState(false)

  return (
    <section className="bg-[var(--blush)] py-12">
      <div className="px-18 mx-auto">

        {/* Content Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Blooming Beauty by Moon
          </h2>

          <p className="text-gray-600 leading-relaxed">
            আমরা বিশ্বাস করি যে সত্যিকারের সৌন্দর্য ভিতর থেকে ফুটে ওঠে। আমরা আপনাকে প্রিমিয়াম এবং খাঁটি সৌন্দর্য পণ্য সরবরাহ করতে প্রতিশ্রুতিবদ্ধ যা আপনার প্রাকৃতিক দীপ্তি বৃদ্ধি করে।গুণমান এবং সত্যতার প্রতি ভালোবাসার সাথে প্রতিষ্ঠিত, Blooming Beauty by Moon আপনাকে প্রদান করে: <br />

            • সব ধরনের ত্বকের জন্য প্রিমিয়াম স্কিনকেয়ার ... <br />

          </p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <p>
                  • প্রাকৃতিক এবং অর্গানিক সৌন্দর্য সমাধান<br />
                  • বিশ্বস্ত ব্র্যান্ডের মেকআপ এবং কসমেটিক্স <br />
                  • চুলের যত্নের অপরিহার্য পণ্য <br />
                  আমাদের লক্ষ্য, আপনি নতুন পণ্য ব্যবহার করছেন বা প্রতিষ্ঠিত রুটিন অনুসরণ করছেন - আমরা আপনাকে আত্মবিশ্বাসী এবং সুন্দর বোধ করতে সাহায্য করতে প্রতিশ্রুতিবদ্ধ। <br />
                  ✓ যত্ন সহকারে নির্বাচিত সংগ্রহ <br />
                  ✓ বিশেষজ্ঞ পণ্য পরামর্শ <br />
                  ✓ দ্রুত এবং নির্ভরযোগ্য ডেলিভারি <br />
                  ✓ গ্রাহক-প্রথম দৃষ্টিভঙ্গি<br />
                  আপনার সৌন্দর্য যাত্রা সেরাটির যোগ্য। Blooming Beauty by Moon কে আপনার বিশ্বস্ত অংশীদার করুন সেই প্রাকৃতিক দীপ্তি অর্জনে যা আপনি প্রাপ্য।
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setOpen(!open)}
            className="mt-6 inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition"
          >
            {open ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </section>
  )
}
