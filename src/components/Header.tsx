'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide global header on Bridal Hub page
  if (pathname === '/bridal-hub') return null;

  return (
    <header 
      className={cn(
        "hidden md:block sticky top-0 z-50 w-full bg-[#FFFAF0]/95 backdrop-blur supports-backdrop-filter:bg-[#FFFAF0]/80 border-b border-[#D4AF37]/20 shadow-sm transition-all duration-300",
        isScrolled ? "py-1" : "py-2"
      )}
    >
      <div className={cn("container flex items-center justify-between transition-all duration-300", isScrolled ? "h-12" : "h-16")}>
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 duration-300">
          <Image 
            src="/Heera-logo-svg.svg" 
            alt="Heera Panna Logo" 
            width={180} 
            height={60} 
            className={cn("w-auto transition-all duration-300", isScrolled ? "h-8" : "h-10")}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-12">
          {['Maheshwari', 'Silk', 'Cotton', 'Bridal Hub', 'Blog', 'About', 'Contact'].map((item) => (
            <Link 
              key={item}
              href={
                item === 'About' ? '/about' : 
                item === 'Contact' ? '/contact' : 
                item === 'Blog' ? '/blogs' :
                item === 'Bridal Hub' ? '/bridal-hub' :
                `/collections/${item.toLowerCase()}`
              }
              className={cn(
                "group relative py-1 text-xs font-display font-medium tracking-wide text-[#2C1810] transition-colors hover:text-[#591C21]",
                item === 'Bridal Hub' && "text-[#D4AF37] font-bold"
              )}
            >
              {item}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-[#2C1810] hover:text-[#591C21] transition-colors" aria-label="Search">
            <Search className="h-4 w-4" />
          </button>
          <Link 
            href="https://wa.me/919876543210" 
            target="_blank"
            aria-label="Enquire on WhatsApp"
            className={cn(
              "inline-flex items-center justify-center rounded-sm bg-[#591C21] px-5 text-xs font-display font-medium text-white shadow-md transition-all hover:bg-[#4A151A] hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]",
              isScrolled ? "py-1.5" : "py-2"
            )}
          >
            <Phone className="mr-2 h-3 w-3 text-[#D4AF37]" />
            Enquire
          </Link>
        </div>
      </div>
    </header>
  );
}
