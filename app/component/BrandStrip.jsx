"use client";

import React from "react";
import { motion } from "framer-motion";

const BrandStrip = () => {
    const brands = ["Maybelline", "L'Oréal", "Revlon", "NYX", "Clinique"];

    // duplicate for seamless loop
    const marqueeBrands = [...brands, ...brands];

    return (
        <section className="bg-[var(--light)] py-16 overflow-hidden relative">
            {/* gradient fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#fbe0db] to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#fbe0db] to-transparent z-10" />

            <motion.div
                className="flex gap-22 whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                }}
            >
                {marqueeBrands.map((brand, i) => (
                    <div
                        key={i}
                        className="text-white text-3xl md:text-4xl font-serif tracking-widest opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300"
                    >
                        {brand}
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default BrandStrip;
