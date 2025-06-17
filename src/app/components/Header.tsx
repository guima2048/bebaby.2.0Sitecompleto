"use client";

/**
 * Header Component
 * Based on Figma Frame: "Header/Navigation"
 */

import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/#pricing" },
  { name: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-100 font-sans">
      <nav className="max-w-screen-xl mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="text-2xl font-extrabold text-black select-none">YourBrand</div>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-base text-gray-700 font-medium hover:text-black transition-colors">
              {link.name}
            </Link>
          ))}
          <Link href="#" className="ml-4 px-6 py-2 bg-[#2563eb] text-white rounded-md font-semibold text-base shadow-sm hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Open menu">
          <Menu className="w-7 h-7 text-black" />
        </button>
        {/* Mobile Menu */}
        {open && (
          <div className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 z-50 flex flex-col items-center gap-6 py-6 md:hidden animate-fade-in">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="text-base text-gray-700 font-medium hover:text-black transition-colors" onClick={() => setOpen(false)}>
                {link.name}
              </Link>
            ))}
            <Link href="#" className="px-6 py-2 bg-[#2563eb] text-white rounded-md font-semibold text-base shadow-sm hover:bg-blue-700 transition-colors" onClick={() => setOpen(false)}>
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
} 