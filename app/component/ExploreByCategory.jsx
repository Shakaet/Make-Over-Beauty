'use client'
import React, { useEffect, useState } from "react"
import { categoryApi } from "../api/categoryApi";

const ExploreByCategory = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getAllCategory()

                

                setCategories(data)

            } catch (err) {
                console.error("Error fetching products:", err)
            } finally {
            }
        }

        fetchCategories()
    }, [])

    const colors = [
        "#F59E0B", // amber
        "#10B981", // emerald
        "#3B82F6", // blue
        "#8B5CF6", // violet
        "#EF4444", // red
        "#F97316", // orange
    ];

    return (
        <section className="bg-[#fff4f4] py-10">
            <div className=" mx-auto px-8 md:px-20 pb-8 flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-6">

                {/* Left: Pills */}
                <div className="flex flex-wrap gap-6 max-w-4xl">
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-300 bg-white
                         text-base font-medium hover:border-pink-400 transition"
                        >
                            <span
                                className="w-4 h-4 rounded-full transition-transform duration-300 group-hover:scale-125"
                                style={{ backgroundColor: colors[i % colors.length] }}
                            />
                            {cat.categoryName}
                        </button>
                    ))}
                </div>

                {/* Right: Title */}
                <div className="text-right text-5xl pl-4">
                    <p className=" text-gray-700">Explore by</p>
                    <h2 className="font-bold text-gray-900">
                        Category
                    </h2>
                </div>

            </div>
        </section>
    )
}

export default ExploreByCategory
