'use client';

import Link from 'next/link';

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/918982826000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 h-14 w-14 rounded-full bg-[#591C21] shadow-2xl flex items-center justify-center hover:scale-105 transition-all group"
      aria-label="Chat on WhatsApp"
    >
      {/* Inline beautiful girl avatar SVG */}
      <svg viewBox="0 0 64 64" width="36" height="36" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#F5E6D3" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#g1)" />
        <path d="M14 44c0-9 9-18 18-18s18 9 18 18v4H14v-4z" fill="#591C21" />
        <path d="M20 28c0-6 5-10 12-10s12 4 12 10v2H20v-2z" fill="#3b2a25" />
        <circle cx="32" cy="26" r="2" fill="#D4AF37" />
        <path d="M24 36c1.5-1 3.5-1 5 0" stroke="#F5E6D3" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>

      {/* Tooltip */}
      <span className="absolute right-16 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Chat with us on WhatsApp
      </span>

      {/* Subtle halo */}
      <span className="absolute inset-0 rounded-full bg-[#591C21] opacity-20 animate-pulse" />
    </Link>
  );
}
