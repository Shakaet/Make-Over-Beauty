"use client";
import { useState } from "react";
import {
    IconBrandWhatsapp,
    IconBrandMessenger,
    IconPhone,
    IconMessageCircle,
    IconX,
} from "@tabler/icons-react";

const ContactIcons = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-18 md:bottom-6 right-6 flex flex-col items-end gap-4 z-50">

            {/* Expanded Icons */}
            {open && (
                <div className="flex flex-col gap-4 mb-2 animate-fadeIn">
                    {/* WhatsApp */}
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/8801780326279"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Chat on WhatsApp"
                        className="bg-green-400/70 backdrop-blur-md p-4 rounded-full text-white shadow-lg
             hover:scale-110 hover:bg-green-400/90 transition-transform duration-300"
                    >

                        <IconBrandWhatsapp size={28} />
                    </a>

                    {/* Messenger */}
                    <a
                        href="https://m.me/username"
                        target="_blank"
                        className="bg-blue-600/70 hover:bg-blue-600/90 backdrop-blur-md p-4 rounded-full text-white shadow-lg hover:scale-110 transition"
                    >
                        <IconBrandMessenger size={28} />
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+8801780326279"
                        className="bg-[var(--rose)]/70 backdrop-blur-md p-4 rounded-full text-white shadow-lg hover:scale-110 transition"
                    >
                        <IconPhone size={28} />
                    </a>
                </div>
            )}

            {/* Main Toggle Button (Always visible) */}
            <button
                onClick={() => setOpen(!open)}
                className={`bg-[var(--pink)] p-4 rounded-full text-white shadow-xl hover:scale-110 transition ${open ? 'bg-red-500' : 'animate-pulse'}`}
            >
                {open ? <IconX size={30} /> : <IconMessageCircle size={30} />}
            </button>
        </div>
    );
};

export default ContactIcons;
