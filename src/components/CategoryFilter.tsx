import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Exclusive Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
  { id: 2, name: 'Garbha Reshami', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200' },
  { id: 3, name: 'Tissue Sarees', image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?w=200' },
  { id: 4, name: 'Zari Butti', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
  { id: 5, name: 'Zari Checks', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200' },
  { id: 6, name: '75% Silk Sarees', image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?w=200' },
  { id: 7, name: 'Ganga Jamuna Border', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' },
  { id: 8, name: 'Chanderi Saree', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200' },
  { id: 9, name: 'Butta Pallu Saree', image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?w=200' },
  { id: 10, name: 'Indonesian Print', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200' }
];

export default function CategoryFilter() {
  return (
    <section className="py-6 md:py-8 bg-secondary/20">
      <div className="container px-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-4">
          Explore by Bestselling Category
        </h2>

        {/* Category Circles Grid */}
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4 md:gap-6 mb-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col items-center group"
            >
              {/* Circular Image with Border */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 mb-2">
                {/* Decorative border */}
                <div className="absolute inset-0 rounded-full border-4 border-primary/30 group-hover:border-primary transition-colors" />
                <div className="absolute inset-1 rounded-full overflow-hidden bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
              
              {/* Category Name */}
              <p className="text-[10px] md:text-xs font-medium text-center max-w-[80px] group-hover:text-primary transition-colors">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          <button className="px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors">
            AVAILABILITY
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors">
            PRICE
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors">
            SHOW ALL
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-colors">
            SORT BY
          </button>
        </div>
      </div>
    </section>
  );
}
