"use client";
import Link from "next/link";
import { Home, Menu, ShoppingBag, ShoppingCart, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import CartDrawer from "./CartDrawer";
import useAddToCart from "../hooks/useAddToCart";

const MobileBottomBar = () => {

    const { cart, loadCart } = useAddToCart()
    const pathname = usePathname();
    const router = useRouter();
    const [openCategory, setOpenCategory] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { categories = [], isLoading } = useCategories();

    useEffect(() => {
        setOpenCategory(false);
    }, [pathname]);

    const items = [
        { name: "Home", icon: Home, href: "/" },
        { name: "Shop", icon: ShoppingBag, href: "/product" },
        { name: "Account", icon: User, href: "/my-account" },
    ];

    return (
        <>
            {/* CART DRAWER (NO FLOATING BUTTON) */}
            <CartDrawer
                isOpen={isCartOpen}
                toggleDrawer={() => setIsCartOpen(false)}
                showTrigger={false}
            />

            {/* CATEGORY DROPDOWN */}
            {openCategory && (
                <div className="fixed bottom-16 left-0 right-0 bg-white z-40 border-t max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                        <div
                            key={cat._id}
                            onClick={() => {
                                router.push(`/product?category=${cat._id}`);
                                setOpenCategory(false);
                            }}
                            className="px-4 py-3 text-sm hover:bg-pink-50"
                        >
                            {cat.categoryName}
                        </div>
                    ))}
                </div>
            )}

            {/* BOTTOM BAR */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--blush)] border-t md:hidden">
                <div className="flex justify-around items-center h-16">
                    {items.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={item.href} className="flex flex-col items-center text-xs">
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}

                    {/* CART */}
                    <div className="relative">
                        <span className="absolute -top-1.5 -right-2 bg-white px-1 py-0.5 rounded-full text-[10px] font-bold leading-none">
                            {cart.length}
                        </span>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="flex flex-col items-center text-xs"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Cart
                        </button>
                    </div>


                    {/* CATEGORY */}
                    <button onClick={() => setOpenCategory(p => !p)} className="flex flex-col items-center text-xs">
                        <Menu className="w-5 h-5" />
                        Category
                    </button>
                </div>
            </div>
        </>
    );
};

export default MobileBottomBar;
