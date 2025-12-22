import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Maheshwari', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764663053/lkshf_bgrgtj.png' },
  { id: 2, name: 'Embroidered Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764592553/knn_hpirhw.png' },
  { id: 3, name: 'Designer Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764591768/khkdf_sozhuw.png' },
  { id: 4, name: 'Printed Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764591660/ygas_ozdixb.png' },
  { id: 5, name: 'Silk Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764591955/hjhj_rjriwz.png' },
  { id: 7, name: 'Partywear Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1765536867/sdfdojf_n1yrl4.png' },
  { id: 8, name: 'Lehenga Choli', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764592566/jahj_qefgmz.png' },
  { id: 9, name: 'Bandhani Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764842647/fmkmf_gakb0h.png' },
  { id: 10, name: 'Banarasi Saree', image: 'https://res.cloudinary.com/dgs35slge/image/upload/f_auto,q_auto,w_200/v1764840753/hggjf_otdwyg.png' }
];

export default function CategoryFilter() {
  return (
    <section className="py-6 md:py-8 bg-secondary/20">
      <div className="container px-4">
        <h2 className="font-display text-xl md:text-2xl font-bold text-center mb-4">
          Explore by Bestselling Category
        </h2>

        {/* Category Circles - Mobile: 3 rows with 4 items, Desktop: Single row swipable */}
        <div className="mb-4">
          {/* Mobile View - 3 Rows */}
          <div className="grid grid-cols-4 gap-3 md:hidden">
            {categories.slice(0, 12).map((category) => (
              <Link
                key={category.id}
                href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center group"
              >
                {/* Circular Image with Border */}
                <div className="relative w-16 h-16 mb-2">
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
                <p className="text-[10px] font-medium text-center max-w-[80px] group-hover:text-primary transition-colors line-clamp-2">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Desktop View - Single Row Swipable */}
          <div className="hidden md:block relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex flex-col items-center group flex-shrink-0 snap-start"
                >
                  {/* Circular Image with Border */}
                  <div className="relative w-20 h-20 mb-2">
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
                  <p className="text-xs font-medium text-center max-w-[100px] group-hover:text-primary transition-colors">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
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
