import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFAF0] px-4 text-center">
      <h1 className="font-display text-6xl md:text-9xl font-bold text-[#591C21] mb-4">404</h1>
      <h2 className="font-display text-2xl md:text-4xl font-bold text-[#2C1810] mb-4">Page Not Found</h2>
      <p className="text-[#2C1810]/70 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center justify-center px-8 py-3 bg-[#591C21] text-white font-medium rounded-sm hover:bg-[#4A151A] transition-colors shadow-md"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
