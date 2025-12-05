'use client';

import { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764846114/KLKCVLNN_kw23cx.png',
    rating: 5,
    title: 'Beautiful saree!',
    review: 'Beautiful saree! The fabric is soft and comfortable, and the colors look elegant. Exactly as shown in the picture. Loved it!'
  },
  {
    id: 2,
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764846337/khadi_tkojej.png',
    rating: 5,
    title: 'Great quality and lovely design',
    review: 'Great quality and lovely design. It gives a very elegant look. Highly recommended!'
  },
  {
    id: 3,
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764846912/gfhg_ed1ahd.png',
    rating: 5,
    title: 'I absolutely loved this lehenga!',
    review: 'I absolutely loved this lehenga! The pink color is vibrant and feminine, and the embroidery looks stunning. It fits comfortably and made me feel really confident and elegant. Perfect for any special occasion!'
  },
  {
    id: 4,
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764846505/Gemini_Generated_Image_48syom48syom48sy_wcluus.jpg',
    rating: 5,
    title: 'Loved the saree!',
    review: 'Loved the saree! The color is gorgeous, the fabric feels great, and the embroidery looks very elegant. Totally worth it!'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400',
    rating: 5,
    title: 'The saree looks beautiful',
    review: 'The saree looks beautiful and the design is very elegant. The fabric feels comfortable and the color is perfect. Really happy with this purchase!'
  },
  {
    id: 6,
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764846698/AAH_ajdlao.png',
    rating: 5,
    title: 'Simply stunning!',
    review: 'Simply stunning! The intricate details and the quality of the fabric are unmatched. It fits perfectly and looks even better in person. A truly royal addition to my wardrobe!'
  }
];

export default function TestimonialsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      const card = scrollContainer.firstElementChild as HTMLElement;
      const cardWidth = card?.offsetWidth || 0;
      const gap = 16; // gap-4 is 1rem = 16px
      const itemWidth = cardWidth + gap;
      
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollContainer.scrollLeft >= maxScroll - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: itemWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="container px-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Let customers speak for us
          </h2>
          <div className="flex items-center justify-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            from 34 reviews ✓
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-none w-[120px] md:w-[200px] snap-start bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-gray-100">
                <Image
                  src={testimonial.image}
                  alt={testimonial.title}
                  fill
                  className="object-cover"
                />
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-[8px] md:text-[10px] font-medium transform -rotate-45">
                    REWA HANDLOOM
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-2 md:p-3">
                {/* Stars */}
                <div className="flex gap-0.5 mb-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-2 w-2 md:h-2.5 md:w-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                {/* Review */}
                <p className="text-[9px] md:text-[11px] font-medium text-foreground line-clamp-3">
                  {testimonial.review}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
