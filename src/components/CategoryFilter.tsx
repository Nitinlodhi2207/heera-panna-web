import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Maheshwari', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764663053/lkshf_bgrgtj.png' },
  { id: 2, name: 'Embroidered Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764592553/knn_hpirhw.png' },
  { id: 3, name: 'Designer Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764591768/khkdf_sozhuw.png' },
  { id: 4, name: 'Printed Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764591660/ygas_ozdixb.png' },
  { id: 5, name: 'Silk Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764591955/hjhj_rjriwz.png' },
  { id: 6, name: 'Wedding', image: 'https://res.cloudinary.com/dgs35slge/image/upload/v1764588481/45_wzgahp.png' }
];

export default function CategoryFilter() {
  return (
    <section className="py-6 md:py-8 bg-secondary/20">
      <div className="container px-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-4">
          Explore by Bestselling Category
        </h2>

        {/* Category Circles Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 mb-4">
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
