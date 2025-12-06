"use client";
import { IconBrandWhatsapp, IconBrandMessenger, IconPhone } from '@tabler/icons-react';

const ContactIcons = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <a
            href="https://wa.me/1234567890"
            target="_blank"
            className="bg-green-500 p-4 rounded-full text-white shadow-lg hover:bg-green-600 transition"
        >
            <IconBrandWhatsapp size={28} />
        </a>

        <a
            href="https://m.me/username"
            target="_blank"
            className="bg-blue-500 p-4 rounded-full text-white shadow-lg hover:bg-blue-600 transition"
        >
            <IconBrandMessenger size={28} />
        </a>

        <a
            href="tel:+1234567890"
            className="bg-gray-800 p-4 rounded-full text-white shadow-lg hover:bg-gray-900 transition"
        >
            <IconPhone size={28} />
        </a>
    </div>
);

export default ContactIcons;
