import Link from 'next/link';
import Image from 'next/image';
import { getCategories, urlFor } from '@/lib/sanity';
import { ArrowRight } from 'lucide-react';

// Mock data for development
const MOCK_CATEGORIES = [
  {
    _id: '1',
    title: 'Maheshwari Sarees',
    slug: { current: 'maheshwari' },
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    _id: '2',
    title: 'Silk Sarees',
    slug: { current: 'silk' },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop'
  },
  {
    _id: '3',
    title: 'Cotton & Daily Wear',
    slug: { current: 'cotton' },
    image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    _id: '4',
    title: 'Wedding Collection',
    slug: { current: 'wedding' },
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1000&auto=format&fit=crop'
  },
  {
    _id: '5',
    title: 'Chanderi Sarees',
    slug: { current: 'chanderi' },
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    _id: '6',
    title: 'Banarasi',
    slug: { current: 'banarasi' },
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop'
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
    <div className="min-h-screen bg-background pb-10 md:pb-20">
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
              className="group relative aspect-[4/3] overflow-hidden rounded-lg md:rounded-2xl bg-secondary/20 block"
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
