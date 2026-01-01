'use client'
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgePercent } from "lucide-react";
import { useProduct } from "@/app/hooks/useProducts";
import Heading from "../component/Heading";

const OfferPage = () => {
    const { products, fetchProducts, loading } = useProduct();

    useEffect(() => {
        fetchProducts();
    }, []);

    const offerProducts = products.filter(
        (product) => product.offer === true
    );

    if (loading) {
        return <p className="text-center py-20">Loading offers...</p>;
    }

    return (
        <div className=' bg-center bg-no-repeat'>
            <Heading />
            <div className='relative bg-[#f7efe6] py-16 sm:py-20 px-8'>
                {offerProducts.length === 0 ? (
                    <p className="text-gray-500 text-center">No offers available right now.</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {offerProducts.map((product) => {
                            const discountPrice =
                                product.highprice -
                                (product.highprice * product.discount) / 100;

                            return (
                                <Link
                                    key={product._id}
                                    href={`/product/${product._id}`}
                                    className="group bg-white rounded-xl shadow hover:shadow-xl transition relative"
                                >
                                    {/* Discount Badge */}
                                    <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                                        {product.discount}% OFF
                                    </span>

                                    {/* Image */}
                                    <div className="relative h-48">
                                        <Image
                                            src={product.imagePrimary}
                                            alt={product.name}
                                            fill
                                            className="object-cover rounded-t-xl"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {product.name}
                                        </h3>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="text-pink-600 font-semibold">
                                                ৳{discountPrice.toFixed(0)}
                                            </span>
                                            <span className="text-xs text-gray-400 line-through">
                                                ৳{product.highprice}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfferPage;
