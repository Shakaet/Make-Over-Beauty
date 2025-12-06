"use client";
import { IconBrandWhatsapp, IconBrandMessenger, IconPhone } from '@tabler/icons-react';

const ContactIcons = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp */}
        <a
            href="https://wa.me/1234567890"
            target="_blank"
            className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-white shadow-lg hover:bg-[#ffc0cb]/60 hover:scale-110 transition transform duration-300"
        >
            <IconBrandWhatsapp size={28} />
        </a>

        {/* Messenger */}
        <a
            href="https://m.me/username"
            target="_blank"
            className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-white shadow-lg hover:bg-[#ffc0cb]/60 hover:scale-110 transition transform duration-300"
        >
            <IconBrandMessenger size={28} />
        </a>

        {/* Phone */}
        <a
            href="tel:+1234567890"
            className="bg-[#ffc0cb]/70 backdrop-blur-md p-4 rounded-full text-white shadow-lg hover:bg-[#ffc0cb]/60 hover:scale-110 transition transform duration-300"
        >
            <IconPhone size={28} />
        </a>
    </div>
);

export default ContactIcons;
