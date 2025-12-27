"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brandApi } from "../api/brandApi";

const BrandStrip = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandApi.getAllBrands();

                // Extract brand names from the response
                let brandsArray = [];

                if (Array.isArray(response)) {
                    // Direct array response
                    brandsArray = response;
                } else if (response && Array.isArray(response.data)) {
                    // Wrapped in data property
                    brandsArray = response.data;
                }

                // Map to brand names (if objects) or use as is (if strings)
                const brandNames = brandsArray.map(item =>
                    typeof item === 'object' && item.brandName
                        ? item.brandName
                        : String(item)
                );

                setBrands(brandNames);
            } catch (err) {
                console.error("Error fetching brands:", err);
            }
        };

        fetchBrands();
    }, []);

    // If no brands, return null or loading state
    if (brands.length === 0) {
        return null;
    }

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
                {marqueeBrands.map((brandName, i) => (
                    <div
                        key={`${brandName}-${i}`}
                        className="text-[var(--pink)] text-3xl md:text-4xl font-serif tracking-widest opacity-90 hover:opacity-100 hover:scale-110 transition-all duration-300 px-8"
                    >
                        {brandName.toUpperCase()}
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default BrandStrip;