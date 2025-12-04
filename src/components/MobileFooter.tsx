'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, ChevronDown, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function MobileFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="md:hidden bg-[#FDF5E6] pt-10 pb-24 px-5 border-t-4 border-[#D4AF37]">
      <div className="space-y-8">
        {/* Brand & Social */}
        <div className="flex flex-col items-center text-center space-y-6">
          <Link href="/">
            <Image 
              src="/Heera-logo-svg.svg" 
              alt="Heera Panna Logo" 
              width={180} 
              height={60} 
              className="h-14 w-auto"
            />
          </Link>
          <p className="text-sm text-[#2C1810]/80 leading-relaxed font-serif max-w-xs">
            Timeless elegance of Indian heritage. Crafting heirlooms for generations.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#591C21] text-[#D4AF37] shadow-md hover:scale-105 transition-transform" aria-label="Follow us on Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#591C21] text-[#D4AF37] shadow-md hover:scale-105 transition-transform" aria-label="Follow us on Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Quick Links Chips */}
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5">
          {['Maheshwari', 'Silk', 'Cotton', 'Wedding', 'New Arrivals'].map((item) => (
            <Link 
              key={item} 
              href={`/collections/${item.toLowerCase()}`}
              className="whitespace-nowrap rounded-full bg-white border border-[#D4AF37]/30 px-5 py-2 text-xs font-medium text-[#591C21] shadow-sm hover:bg-[#591C21] hover:text-[#D4AF37] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          <div className="border-b border-[#D4AF37]/20">
            <button 
              onClick={() => toggleSection('collections')}
              className="flex w-full items-center justify-between py-4 text-base font-display font-bold text-[#591C21]"
            >
              Collections
              <ChevronDown className={cn("h-5 w-5 text-[#D4AF37] transition-transform duration-300", openSection === 'collections' && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openSection === 'collections' ? "max-h-48 opacity-100" : "max-h-0 opacity-0")}>
              <ul className="space-y-3 pb-4 text-sm text-[#2C1810]/80 pl-2">
                <li><Link href="/collections/maheshwari" className="block py-1">Maheshwari Sarees</Link></li>
                <li><Link href="/collections/silk" className="block py-1">Silk Sarees</Link></li>
                <li><Link href="/collections/cotton" className="block py-1">Cotton & Daily Wear</Link></li>
                <li><Link href="/collections/wedding" className="block py-1">Wedding Collection</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-b border-[#D4AF37]/20">
            <button 
              onClick={() => toggleSection('company')}
              className="flex w-full items-center justify-between py-4 text-base font-display font-bold text-[#591C21]"
            >
              Company & Contact
              <ChevronDown className={cn("h-5 w-5 text-[#D4AF37] transition-transform duration-300", openSection === 'company' && "rotate-180")} />
            </button>
            <div className={cn("overflow-hidden transition-all duration-300 ease-in-out", openSection === 'company' ? "max-h-64 opacity-100" : "max-h-0 opacity-0")}>
              <ul className="space-y-4 pb-4 text-sm text-[#2C1810]/80 pl-2">
                <li><Link href="/about" className="block py-1">About Us</Link></li>
                <li><Link href="/blog" className="block py-1">Our Journal</Link></li>
                <li><Link href="/contact" className="block py-1">Contact Us</Link></li>
                <li className="flex items-start gap-3 pt-2">
                  <MapPin className="h-4 w-4 text-[#591C21] mt-1 flex-shrink-0" />
                  <span>Rajwada, Indore<br/>Madhya Pradesh</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#591C21] flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#2C1810]/50 pt-6 border-t border-[#D4AF37]/10">
          &copy; {new Date().getFullYear()} Heera Panna Saree.
        </div>
      </div>
    </footer>
  );
}
