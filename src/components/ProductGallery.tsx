'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/thumbs';

interface ProductGalleryProps {
  images: any[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Ensure we have at least one image or a placeholder if empty
  const displayImages = images && images.length > 0 ? images : [null];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/20 border">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[Thumbs]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="h-full w-full"
        >
          {displayImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                {img ? (
                  <Image
                    src={typeof img === 'string' ? img : urlFor(img).url()}
                    alt={`${productName} - Image ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="mt-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[Thumbs]}
            className="thumbs-swiper"
          >
            {displayImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`relative aspect-square rounded-lg overflow-hidden bg-secondary/20 cursor-pointer border transition-all ${
                    activeIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary'
                  }`}
                >
                  {img && (
                    <Image
                      src={typeof img === 'string' ? img : urlFor(img).url()}
                      alt={`${productName} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
