'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Info, MapPin, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BottomNavigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-[#FFFAF0]/95 backdrop-blur supports-backdrop-filter:bg-[#FFFAF0]/90 border-t border-[#D4AF37]/30 px-2 pb-safe shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
      <div className="grid h-full grid-cols-5 items-center justify-items-center">
        <Link 
          href="/" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
            isActive('/') ? "text-[#591C21]" : "text-[#8B5E3C] hover:text-[#591C21]/70"
          )}
        >
          <Home className={cn("h-5 w-5 transition-transform duration-300", isActive('/') && "scale-110 fill-current")} />
          <span className={cn("text-[10px] font-medium", isActive('/') && "font-bold")}>Home</span>
        </Link>
        
        <Link 
          href="/collections" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
            isActive('/collections') ? "text-[#591C21]" : "text-[#8B5E3C] hover:text-[#591C21]/70"
          )}
        >
          <Grid className={cn("h-5 w-5 transition-transform duration-300", isActive('/collections') && "scale-110 fill-current")} />
          <span className={cn("text-[10px] font-medium", isActive('/collections') && "font-bold")}>Collections</span>
        </Link>

        <Link 
          href="/bridal-hub" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
            isActive('/bridal-hub') ? "text-[#D4AF37]" : "text-[#8B5E3C] hover:text-[#D4AF37]/70"
          )}
        >
          <Sparkles className={cn("h-5 w-5 transition-transform duration-300", isActive('/bridal-hub') && "scale-110 fill-current")} />
          <span className={cn("text-[10px] font-medium", isActive('/bridal-hub') && "font-bold")}>Bridal</span>
        </Link>
        
        <Link 
          href="/about" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
            isActive('/about') ? "text-[#591C21]" : "text-[#8B5E3C] hover:text-[#591C21]/70"
          )}
        >
          <Info className={cn("h-5 w-5 transition-transform duration-300", isActive('/about') && "scale-110 fill-current")} />
          <span className={cn("text-[10px] font-medium", isActive('/about') && "font-bold")}>About</span>
        </Link>
        
        <Link 
          href="/contact" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 w-full h-full transition-all duration-300",
            isActive('/contact') ? "text-[#591C21]" : "text-[#8B5E3C] hover:text-[#591C21]/70"
          )}
        >
          <MapPin className={cn("h-5 w-5 transition-transform duration-300", isActive('/contact') && "scale-110 fill-current")} />
          <span className={cn("text-[10px] font-medium", isActive('/contact') && "font-bold")}>Visit Us</span>
        </Link>
      </div>
    </nav>
  );
}
