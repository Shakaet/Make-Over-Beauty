import { IconBrandWhatsapp } from "@tabler/icons-react"
import React from "react"

const PureSimple = () => {
  return (
    <section
      className="py-12 md:py-20 px-7"
    >

      <div className="relative z-10 mx-auto px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--pink)] mb-8 drop-shadow">
          কি খুঁজছেন?
        </h1>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--pink)] bg-[var(--light)] text-base text-[var(--pink)] font-medium">
            <span className="w-5 h-5 rounded-full bg-red-500"></span>
            ডার্ক স্পট দূর করার জন্য (DARK SPOT REMOVAL)
          </span>

          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--pink)] bg-[var(--light)] text-base text-[var(--pink)] font-medium">
            <span className="w-5 h-5 rounded-full bg-lime-500"></span>
            প্রাকৃতিক পণ্য (NATURAL PRODUCTS)
          </span>

          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--pink)] bg-[var(--light)] text-base text-[var(--pink)] font-medium">
            <span className="w-5 h-5 rounded-full bg-blue-500"></span>
            সাশ্রয়ী দাম (BUDGET-FRIENDLY)
          </span>

          <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--pink)] bg-[var(--light)] text-base text-[var(--pink)] font-medium">
            <span className="w-5 h-5 rounded-full bg-white"></span>
            সংবেদনশীল ত্বকের জন্য (SENSITIVE SKIN)
          </span>
        </div>

        {/* CTA Button */}
        <a
          href="tel:01780326279"
          className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold shadow-lg">
          <IconBrandWhatsapp /> <span className="px-2">অর্ডার করতে CALL AT 01780326279</span>
        </a>
      </div>
    </section>
  )
}

export default PureSimple
