import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFAF0]">
      <div className="relative">
        <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20"></div>
        <div className="h-12 w-12 rounded-full border-4 border-[#591C21] border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 font-display text-[#591C21] font-medium animate-pulse">Loading Heera Panna...</p>
    </div>
  );
}
