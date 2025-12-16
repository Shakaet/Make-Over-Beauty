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
                    <a
                        href="https://wa.me/1234567890"
                        target="_blank"
                        className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-black shadow-lg hover:scale-110 transition"
                    >
                        <IconBrandWhatsapp size={28} />
                    </a>

                    {/* Messenger */}
                    <a
                        href="https://m.me/username"
                        target="_blank"
                        className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-black shadow-lg hover:scale-110 transition"
                    >
                        <IconBrandMessenger size={28} />
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+1234567890"
                        className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-black shadow-lg hover:scale-110 transition"
                    >
                        <IconPhone size={28} />
                    </a>
                </div>
            )}

            {/* Main Toggle Button (Always visible) */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-[#ffc0cb] p-4 rounded-full text-black shadow-xl hover:scale-110 transition"
            >
                {open ? <IconX size={30} /> : <IconMessageCircle size={30} />}
            </button>
        </div>
    );
};

export default ContactIcons;
