'use client';

import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface ProductGalleryProps {
  images: any[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Ensure we have at least one image or a placeholder if empty
  const displayImages = images && images.length > 0 ? images : [null];
  const currentImage = displayImages[selectedImageIndex];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/20 border">
        {currentImage ? (
          <Image
            src={typeof currentImage === 'string' ? currentImage : urlFor(currentImage).url()}
            alt={productName}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative aspect-square rounded-lg overflow-hidden bg-secondary/20 cursor-pointer border transition-all ${
                selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary'
              }`}
            >
              {img && (
                <Image
                  src={typeof img === 'string' ? img : urlFor(img).url()}
                  alt={`${productName} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
