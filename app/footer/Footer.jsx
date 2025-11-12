'use client'
import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'
import { footerLinks } from './FooterData'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="bg-[#f6f0e8] text-gray-700 py-12 px-8">
            <div className=" grid grid-cols-1 md:grid-cols-4 gap-10 text-center px-10">

                {/* Logo & Description */}
                <div className='text-left pl-5'>
                    <h2 className="text-3xl italic font-semibold mb-4">LILAC</h2>
                    <p className="text-sm mb-2">
                        Sed viverra tellus in hac habitasse platea dictumst vestibulum.
                    </p>
                    <p className="text-sm">
                        Mauris augue neque gravida in. In cursus turpis massa tincidunt.
                    </p>
                    <div className="flex gap-3 mt-4">
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5 hover:opacity-70" />
                        </a>
                        <a href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"><Twitter className="w-5 h-5 hover:opacity-70" /></a>
                        <a href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"><Instagram className="w-5 h-5 hover:opacity-70" /></a>
                    </div>
                </div>

                {/* Footer Links */}
                {footerLinks.map((section) => (
                    <div key={section.title}>
                        <h3 className="font-semibold mb-3">{section.title}</h3>
                        <ul className="space-y-2">
                            {section.links.map((link) => (
                                <li key={link.slug}>
                                    <Link
                                        href={`/footer/${link.slug}`}
                                        className="hover:text-gray-900 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="border-t mt-10 pt-5 text-center text-sm text-gray-500">
                © {year} Lilac, Wedesign Tech.
            </div>
        </footer>
    )
}
