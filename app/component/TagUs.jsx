import React from "react";
import Image from "next/image";

const TileImage = ({ src, alt }) => (
  <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 overflow-hidden">
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover object-center transition-transform duration-500 hover:scale-105"
      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 12vw"
    />
  </div>
);

const CenterPanel = () => (
  <div className="relative flex items-center justify-center bg-[#f3ede6] text-[#0a0a0a] h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 py-5 pt-5">
    <div className="text-center px-4 sm:px-8 md:px-10">
      <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-black/70">
        Insta Shop
      </p>
      <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold">
        Tag Us on Instagram
      </h2>
      <p className="mt-3 text-xs sm:text-sm md:text-base max-w-md mx-auto text-black/70">
        Praesent in nunc vel urna consequat mattis eget vel libero. Phasellus
        pellentesque Proin tempus tempor diam.
      </p>
    </div>
  </div>
);

const TagUs = () => {
  return (
    <section className="w-full bg-white">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        {/* Left images */}
        {/* <TileImage src="/images/makeup1.jpeg" alt="Skincare closeup" /> */}
        <TileImage src="/images/cream.png" alt="Cream texture" />
        <TileImage src="/images/makeup3.webp" alt="Face roller" />

        {/* Center panel (full width on small, 1 col on md, 3 cols on lg) */}
        <div className="col-span-2 sm:col-span-3 md:col-span-1 lg:col-span-3">
          <CenterPanel />
        </div>

        {/* Right images */}
        {/* <TileImage src="/images/makeup5.jpg" alt="Makeup swatch" /> */}
        <TileImage src="/images/makeuo4.webp" alt="Serum bottle" />
        <TileImage src="/images/makeup5.jpeg" alt="Hand applying serum" />
      </div>
    </section>
  );
};

export default TagUs;
