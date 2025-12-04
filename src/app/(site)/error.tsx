'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFAF0] px-4 text-center">
      <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-[#591C21] mb-2">Something went wrong!</h2>
      <p className="text-[#2C1810]/70 max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center justify-center px-8 py-3 bg-[#591C21] text-white font-medium rounded-sm hover:bg-[#4A151A] transition-colors shadow-md"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Try again
      </button>
    </div>
  );
}
