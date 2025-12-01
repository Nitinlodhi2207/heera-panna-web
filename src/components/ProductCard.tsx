import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: string;
    imageUrl?: any;
    price?: number;
    category?: {
      name: string;
      slug: { current: string };
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md md:rounded-lg bg-secondary/20">
        {product.imageUrl ? (
          <Image
            src={typeof product.imageUrl === 'string' ? product.imageUrl : urlFor(product.imageUrl).width(500).height(667).url()}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-muted-foreground text-xs">
            No Image
          </div>
        )}
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        
        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-white shadow-lg">
            <ArrowRight className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="mt-2 md:mt-3 space-y-0.5 md:space-y-1">
        <h3 className="font-display text-xs md:text-lg font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {product.name}
        </h3>
        {product.category && (
          <p className="text-[8px] md:text-xs text-muted-foreground uppercase tracking-wider">
            {product.category.name}
          </p>
        )}
        {/* Price is optional/hidden as per brief, but if available: */}
        {/* <p className="text-xs md:text-sm font-medium">₹{product.price}</p> */}
      </div>
    </Link>
  );
}
