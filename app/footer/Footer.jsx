'use client'
import Link from 'next/link'
import { Phone, Mail, ArrowLeftRight, MoveRightIcon } from 'lucide-react'
import { footerLinks } from './FooterData'
import logo from "@/public/images/logoup9.png"
import Image from 'next/image'
import { LocationOn, LocationOnRounded, WhatsApp } from '@mui/icons-material'
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-react'

export default function Footer() {
    return (
        <footer className="bg-[var(--blush)] text-gray-700 p-8">
            <div className="bg-[var(--light)]  grid grid-cols-1 md:grid-cols-4 gap-16 p-6 rounded-2xl">

                {/* Left Section - Brand */}
                <div className='space-y-12'>
                    <Image
                        src={logo}
                        alt="Logo"
                        width={280}
                        height={120}
                        color='black'
                        className="object-contain drop-shadow-xl "
                    />
                    <div>
                        <p className="text-sm font-medium">Find Us From Other Platform</p>
                        <div className="flex gap-3 mt-4">
                            <a href="https://www.facebook.com" className='bg-black p-1 text-white rounded-full' target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <IconBrandFacebook className="w-7 h-7 hover:opacity-70" />
                            </a>
                            <a href="https://www.tiktok.com" className='bg-black p-1 text-white rounded-full' target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                <IconBrandTiktok className="w-7 h-7 hover:opacity-70 " />
                            </a>
                            <a href="https://www.instagram.com" className='bg-black p-1 text-white rounded-full' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <IconBrandInstagram className="w-7 h-7 hover:opacity-70" />
                            </a>
                            <a href="https://www.whatsapp.com" className='bg-black p-1 px-1.5 text-white rounded-full' target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <WhatsApp className="w-7 h-7 hover:opacity-70" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between col-span-2'>
                    {/* Footer Links Sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h3 className="font-semibold text-[var(--pink)] text-sm mb-3">{section.title}</h3>
                            <ul >
                                {section.links.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.slug ? `/${link.slug}` : '/'}
                                            className="text-sm hover:text-gray-900 transition-colors duration-200 hover:underline"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Right Section - Contact Info */}
                <div className='px-6'>
                    <div className=' mb-4'>
                        <div className="flex items-center justify-end gap-4">
                            <div className='text-right'>
                                <h3 className="font-semibold text-gray-900 text-xs">Hotline 24/7</h3>
                                <span className="text-xs font-medium">+89.0780326279</span>
                            </div>
                            <div><Phone className="w-8 h-8" /></div>
                        </div>
                    </div>

                    <div className='mb-2'>
                        <div className="flex items-center justify-end gap-4">
                            <div className=' text-right'>
                                <p className="text-xs font-medium mb-2">
                                    বিন্দুবাসিনি স্কুলের পাশে, ডক্টরস ক্লিনিকের বিপরিত পাশে, সাফ শক্তি টাওয়ারের ২য় তলায়, 1900, Tangail
                                </p>
                            </div>
                            <div><LocationOnRounded className="w-10 h-10" /></div>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <div className="flex items-center justify-end gap-4">
                            <div className='text-right'>
                                <h3 className="font-semibold text-gray-900 text-xs">Any inqueries</h3>
                                <span className="text-xs font-medium">enamarzia@gmail.com</span>
                            </div>
                            <div><Mail className="w-8 h-8" /></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="pt-4 flex justify-between">
                <div className="text-xs text-gray-600 mb-2">
                    © 2025 Boolean Force. All rights reserved
                </div>
                <div className="flex justify-center gap-4 text-xs">
                    <Link href="/terms" className="text-gray-600 hover:text-gray-900 hover:underline">
                        Terms & Conditions
                    </Link>
                    <span className="text-gray-400">|</span>
                    <Link href="/privacy" className="text-gray-600 hover:text-gray-900 hover:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>
    )
}