"use client";
import Link from "next/link";
import { Home, Menu, ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { IconBrandProducthunt } from "@tabler/icons-react";

const MobileBottomBar = () => {
    const pathname = usePathname();

    const items = [
        { name: "Home", icon: Home, href: "/" },
        { name: " Products", icon: IconBrandProducthunt, href: "/product" },
        { name: "Offer", icon: Menu, href: "/offer" },
        { name: "Cart", icon: ShoppingCart, href: "/cart" },
        { name: "Account", icon: User, href: "/my-account" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-pink-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
            <div className="flex justify-around items-center h-16">
                {items.map((item) => {
                    const active = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 text-xs transition-all
                ${active ? "text-pink-600" : "text-gray-500 hover:text-pink-500"
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${active ? "scale-110" : ""}`} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileBottomBar;