'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    title: 'Timeless Elegance',
    subtitle: 'EXCLUSIVELY BY HEERA PANNA',
    description: 'UPTO 70% OFF',
    cta: 'Shop Now',
    bgColor: 'from-rose-900/20 to-amber-900/20'
  },
  {
    id: 2,
    title: 'Maheshwari Heritage',
    subtitle: 'HANDWOVEN TRADITION',
    description: 'NEW ARRIVALS',
    cta: 'Explore Collection',
    bgColor: 'from-blue-900/20 to-teal-900/20'
  },
  {
    id: 3,
    title: 'Wedding Grandeur',
    subtitle: 'BRIDAL COLLECTION',
    description: 'PREMIUM SILK SAREES',
    cta: 'View Bridal',
    bgColor: 'from-purple-900/20 to-pink-900/20'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100dvh] md:h-[100vh] overflow-hidden bg-gray-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background with gradient overlay */}
          <div className={`absolute inset-0 bg-linear-to-r ${slide.bgColor}`} />
          
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0 opacity-70">
            <Image
              src="https://res.cloudinary.com/dgs35slge/image/upload/v1764586311/cncakjae_adqirf.png"
              alt="Hero Desktop"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>

          {/* Mobile Image */}
          <div className="block md:hidden absolute inset-0 opacity-70">
            <Image
              src="https://res.cloudinary.com/dgs35slge/image/upload/v1764587164/hero%20home%20moblie.png"
              alt="Hero Mobile"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end justify-center pb-24 md:pb-32">
            <div className="container px-4 text-center text-white z-10">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-2 animate-fade-in leading-tight drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-2xl mb-1 tracking-widest animate-slide-up uppercase drop-shadow-md">
                {slide.subtitle}
              </p>
              <p className="text-xl md:text-4xl font-bold mb-6 animate-slide-up drop-shadow-md">
                {slide.description}
              </p>
              <Link
                href="/collections"
                className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
