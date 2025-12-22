import Link from 'next/link';
import Image from 'next/image';
import { getCategories, urlFor } from '@/lib/sanity';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Collections | Maheshwari, Silk & Cotton Sarees',
  description: 'Browse our extensive collection of authentic sarees including Maheshwari, Chanderi, Banarasi, and daily wear cotton sarees.',
  alternates: {
    canonical: 'https://www.heerapannasaree.com/collections',
  },
};

// Mock data for development
const MOCK_CATEGORIES = [
  {
    _id: '1',
    title: 'Maheshwari',
    slug: { current: 'maheshwari' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764663053/lkshf_bgrgtj.png'
  },
  {
    _id: '2',
    title: 'Embroidered Saree',
    slug: { current: 'embroidered-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764592553/knn_hpirhw.png'
  },
  {
    _id: '3',
    title: 'Designer Saree',
    slug: { current: 'designer-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764591768/khkdf_sozhuw.png'
  },
  {
    _id: '4',
    title: 'Printed Saree',
    slug: { current: 'printed-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764591660/ygas_ozdixb.png'
  },
  {
    _id: '5',
    title: 'Silk Saree',
    slug: { current: 'silk-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764591955/hjhj_rjriwz.png'
  },
  {
    _id: '6',
    title: 'Partywear Saree',
    slug: { current: 'partywear-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1765536867/sdfdojf_n1yrl4.png'
  },
  {
    _id: '7',
    title: 'Lehenga Choli',
    slug: { current: 'lehenga-choli' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764592566/jahj_qefgmz.png'
  },
  {
    _id: '8',
    title: 'Bandhani Saree',
    slug: { current: 'bandhani-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764842647/fmkmf_gakb0h.png'
  },
  {
    _id: '9',
    title: 'Banarasi Saree',
    slug: { current: 'banarasi-saree' },
    image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto/v1764840753/hggjf_otdwyg.png'
  }
];

export default async function CollectionsPage() {
  let categories = [];
  try {
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  // Fallback to mock data
  if (!categories || categories.length === 0) {
    categories = MOCK_CATEGORIES;
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-20">
      {/* Header Section */}
      <div className="bg-secondary/30 py-6 md:py-20">
        <div className="container px-4 text-center">
          <h1 className="font-display text-2xl md:text-5xl font-bold mb-2 md:mb-4">Our Collections</h1>
          <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
            Discover our wide range of authentic handloom sarees, each telling a unique story of tradition and craftsmanship.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container px-4 py-6 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {categories.map((category: any) => (
            <Link 
              key={category._id} 
              href={`/collections/${category.slug.current}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-lg md:rounded-2xl bg-secondary/20 block"
            >
              {/* Image */}
              {category.image ? (
                <Image
                  src={typeof category.image === 'string' ? category.image : urlFor(category.image).url()}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-200">
                  No Image
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2 md:p-6 text-center">
                <h2 className="font-display text-sm md:text-3xl font-bold mb-1 md:mb-2 transform translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {category.title}
                </h2>
                <span className="inline-flex items-center text-[10px] md:text-sm font-medium opacity-0 transform translate-y-2 md:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  Explore <ArrowRight className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
