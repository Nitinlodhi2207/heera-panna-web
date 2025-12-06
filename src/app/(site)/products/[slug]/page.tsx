import Image from 'next/image';
import Link from 'next/link';
import { Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getProductBySlug } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PRODUCTS } from '@/lib/products';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import ProductGallery from '@/components/ProductGallery';
import ProductActions from '@/components/ProductActions';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  
  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product for metadata:", error);
  }

  if (!product) {
    product = PRODUCTS.find(p => p.slug === slug);
  }

  if (!product) {
    return {
      title: 'Product Not Found',
    }
  }

  const imageUrl = product.imageUrl 
    ? (typeof product.imageUrl === 'string' ? product.imageUrl : urlFor(product.imageUrl).url())
    : '/og-image.jpg';

  return {
    title: `${product.name} | Heera Panna Saree`,
    description: product.description?.slice(0, 160) || `Buy ${product.name} online at Heera Panna Saree. Premium quality ${product.fabric} saree.`,
    alternates: {
      canonical: `https://www.heerapannasaree.com/products/${slug}`,
    },
    openGraph: {
      title: product.name,
      description: product.description?.slice(0, 160),
      images: [imageUrl],
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  // Fallback to local data
  if (!product) {
    product = PRODUCTS.find(p => p.slug === slug);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/collections/all" className="text-primary hover:underline">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = product.imageUrl 
    ? (typeof product.imageUrl === 'string' ? product.imageUrl : urlFor(product.imageUrl).url())
    : '';

  const productUrl = `https://www.heerapannasaree.com/products/${slug}`;
  const whatsappMessage = `Hi, I am interested in the ${product.name}. Can you please share the price and availability? Product Link: ${productUrl}`;
  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  // Ensure we have an array of images for the gallery
  const galleryImages = product.gallery || (product.imageUrl ? [product.imageUrl] : []);

  return (
    <div className="min-h-screen bg-background pb-20">
      <StructuredData 
        type="product"
        data={{
          name: product.name,
          image: imageUrl,
          description: product.description,
          url: productUrl,
          price: product.price
        }}
      />
      <StructuredData 
        type="breadcrumb"
        data={[
          { name: "Home", url: "https://www.heerapannasaree.com" },
          { name: "Collections", url: "https://www.heerapannasaree.com/collections" },
          { name: product.category?.name || "Sarees", url: `https://www.heerapannasaree.com/collections/${product.category?.slug?.current || 'all'}` },
          { name: product.name, url: `https://www.heerapannasaree.com/products/${slug}` }
        ]}
      />

      <div className="container px-4 py-8">
        <Link href="/collections/all" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
        </Link>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {/* Image Gallery Section */}
          <ProductGallery images={galleryImages} productName={product.name} />

          {/* Product Details Section */}
          <div className="md:sticky md:top-24 h-fit">
            <div className="mb-2">
              <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[10px] md:text-xs font-medium text-primary uppercase tracking-wider">
                {product.category?.name || 'Saree'}
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
            
            {/* Price Placeholder - Hidden as per brief, but structure exists */}
            {/* <p className="text-2xl font-medium text-primary mb-6">₹{product.price}</p> */}

            <div className="prose prose-sm text-muted-foreground mb-8">
              <p>{product.description}</p>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-4 mb-8 border-y py-6">
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">Fabric</p>
                <p className="text-sm md:text-base font-medium">{product.fabric || 'Pure Silk'}</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">Weave</p>
                <p className="text-sm md:text-base font-medium">{product.weave || 'Handloom'}</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">Occasion</p>
                <p className="text-sm md:text-base font-medium">{product.occasion || 'Wedding / Festive'}</p>
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider mb-1">Availability</p>
                <p className="text-sm md:text-base font-medium text-green-600">In Stock</p>
              </div>
            </div>

            {/* Actions */}
            <ProductActions 
              productName={product.name} 
              productUrl={productUrl} 
              whatsappLink={whatsappLink} 
            />

            {/* Trust Badges */}
            <div className="mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-secondary/30 text-primary">
                  <Star className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Authentic Quality</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-secondary/30 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Pan-India Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 rounded-full bg-secondary/30 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium">Trusted Seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
