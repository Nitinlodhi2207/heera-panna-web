'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileHeader() {
  const pathname = usePathname();

  // Hide global header on Bridal Hub page
  if (pathname === '/bridal-hub') return null;

  return (
    <>
      {/* Top Bar Mobile */}
      <div className="md:hidden bg-[#591C21] text-[#D4AF37] py-1 text-center text-[10px] font-medium tracking-wider uppercase">
        Worldwide Shipping Available
      </div>
      
      <header className="md:hidden sticky top-0 left-0 right-0 z-50 h-16 bg-[#FFFAF0]/95 backdrop-blur supports-backdrop-filter:bg-[#FFFAF0]/80 border-b border-[#D4AF37]/20 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-[#2C1810]" aria-label="Open Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-label="Heera Panna Home">
          <Image 
            src="/Heera-logo-svg.svg" 
            alt="Heera Panna Logo" 
            width={140} 
            height={45} 
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-3">
          <button className="text-[#2C1810]" aria-label="Search">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </header>
    </>
  );
}
