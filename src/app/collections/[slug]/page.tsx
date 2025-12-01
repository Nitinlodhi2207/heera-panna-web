import { getProductsByCategory } from '@/lib/sanity';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';

// Mock data for development if Sanity is empty
const MOCK_PRODUCTS = [
  {
    _id: '1',
    name: 'Royal Maheshwari Silk',
    slug: 'royal-maheshwari-silk',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    category: { name: 'Maheshwari', slug: { current: 'maheshwari' } }
  },
  {
    _id: '2',
    name: 'Traditional Handloom Cotton',
    slug: 'traditional-handloom-cotton',
    imageUrl: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=1000&auto=format&fit=crop',
    category: { name: 'Cotton', slug: { current: 'cotton' } }
  },
  {
    _id: '3',
    name: 'Banarasi Silk Wedding Saree',
    slug: 'banarasi-silk-wedding',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    category: { name: 'Silk', slug: { current: 'silk' } }
  },
  {
    _id: '4',
    name: 'Elegant Chanderi',
    slug: 'elegant-chanderi',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1000&auto=format&fit=crop',
    category: { name: 'Maheshwari', slug: { current: 'maheshwari' } }
  }
];

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to fetch from Sanity
  let products = [];
  try {
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Fallback to mock data if Sanity returns empty (for dev/demo purposes)
  if (!products || products.length === 0) {
    // Filter mock products by category slug roughly
    products = MOCK_PRODUCTS.filter(p => 
      slug === 'all' || 
      p.category.slug.current === slug || 
      p.category.name.toLowerCase().includes(slug)
    );
    
    // If still empty and it's a valid looking slug, just show all mock for demo
    if (products.length === 0 && ['maheshwari', 'silk', 'cotton', 'wedding'].includes(slug)) {
        products = MOCK_PRODUCTS;
    }
  }

  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="min-h-screen bg-background pb-10 md:pb-20">
      {/* Header Section */}
      <div className="bg-secondary/30 py-6 md:py-20">
        <div className="container px-4 text-center">
          <h1 className="font-display text-xl md:text-5xl font-bold mb-1 md:mb-4">{categoryName} Collection</h1>
          <p className="text-xs md:text-base text-muted-foreground max-w-2xl mx-auto">
            Explore our exclusive range of {categoryName} sarees, handpicked for their elegance and quality.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container px-4 py-6 md:py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-6 md:gap-y-10">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 md:py-20">
            <p className="text-sm md:text-lg text-muted-foreground">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
