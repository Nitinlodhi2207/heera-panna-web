import { getProductsByCategory } from '@/lib/sanity';
import ProductCard from '@/components/ProductCard';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/lib/products';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return {
    title: `${categoryName} Sarees | Heera Panna Saree Collection`,
    description: `Shop exclusive ${categoryName} sarees at Heera Panna Saree. Authentic handloom quality, perfect for weddings and festivals.`,
    alternates: {
      canonical: `https://heerapannasaree.com/collections/${slug}`,
    },
    openGraph: {
      title: `${categoryName} Sarees | Heera Panna Saree`,
      description: `Shop exclusive ${categoryName} sarees at Heera Panna Saree.`,
      // images: [], // Ideally fetch a category image here
    }
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  
  // Try to fetch from Sanity
  let products = [];
  try {
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Fallback to local data if Sanity returns empty (for dev/demo purposes)
  if (!products || products.length === 0) {
    // Filter local products by category slug roughly
    products = PRODUCTS.filter(p => 
      slug === 'all' || 
      p.category.slug.current === slug || 
      p.category.name.toLowerCase().replace(/\s+/g, '-').includes(slug)
    );
  }

  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="min-h-screen bg-background pb-10 md:pb-20">
      <StructuredData 
        type="collectionPage"
        data={{
          name: `${categoryName} Collection`,
          description: `Shop exclusive ${categoryName} sarees at Heera Panna Saree.`,
          url: `https://heerapannasaree.com/collections/${slug}`,
          image: products[0]?.imageUrl || ''
        }}
      />
      <StructuredData 
        type="breadcrumb"
        data={[
          { name: "Home", url: "https://heerapannasaree.com" },
          { name: "Collections", url: "https://heerapannasaree.com/collections" },
          { name: categoryName, url: `https://heerapannasaree.com/collections/${slug}` }
        ]}
      />
      
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
