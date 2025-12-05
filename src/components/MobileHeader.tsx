'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Hide global header on Bridal Hub page
  if (pathname === '/bridal-hub') return null;

  return (
    <>
      <header className="md:hidden sticky top-0 left-0 right-0 z-50 h-16 bg-[#FFFAF0]/95 backdrop-blur supports-backdrop-filter:bg-[#FFFAF0]/80 border-b border-[#D4AF37]/20 px-3 flex items-center gap-3 shadow-sm">
        {/* Logo - Left */}
        <Link href="/" className="flex-shrink-0" aria-label="Heera Panna Home">
          <Image 
            src="/Heera-logo-svg.svg" 
            alt="Heera Panna Logo" 
            width={140} 
            height={45} 
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Search Bar - Middle */}
        <div className="flex-1 relative">
           <input 
             type="text" 
             placeholder="Search..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             onKeyDown={handleSearch}
             className="w-full pl-8 pr-2 py-1.5 text-xs rounded-full border border-[#D4AF37]/30 bg-white/50 focus:outline-none focus:border-[#D4AF37] focus:bg-white transition-colors placeholder:text-[#2C1810]/40 text-[#2C1810]"
           />
           <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#2C1810]/50" />
        </div>

        {/* Visit Us - Right */}
        <Link 
          href="https://maps.google.com/maps?q=22.7189120,75.8554697" 
          target="_blank"
          className="flex flex-col items-center justify-center text-[#591C21] flex-shrink-0"
        >
          <div className="bg-[#591C21]/10 p-1.5 rounded-full mb-0.5">
              <MapPin className="h-4 w-4" />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-wide">Visit</span>
        </Link>
      </header>
    </>
  );
}
