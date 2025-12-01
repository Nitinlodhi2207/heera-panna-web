import Image from 'next/image';
import Link from 'next/link';
import { Phone, Star, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import { getProductBySlug } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';

// Mock data for development
const MOCK_PRODUCT = {
  _id: '1',
  name: 'Royal Maheshwari Silk Saree',
  slug: 'royal-maheshwari-silk',
  description: 'Experience the grandeur of authentic Maheshwari silk. This saree features intricate zari work on the border and a rich, lustrous texture that drapes beautifully.',
  detailedDescription: 'Handwoven in the town of Maheshwar, this saree is a testament to centuries-old weaving traditions. The fabric is a blend of silk and cotton, known for its lightweight feel and glossy finish. Perfect for weddings, festivals, and special occasions.',
  price: 4500,
  category: { name: 'Maheshwari', slug: { current: 'maheshwari' } },
  fabric: 'Silk Cotton Blend',
  weave: 'Handloom',
  occasion: 'Wedding / Festive',
  imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop'
  ]
};

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  // Fallback to mock
  if (!product) {
    // In a real app, we might show 404, but for demo we show mock if slug matches mock
    product = { ...MOCK_PRODUCT, name: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') };
  }

  const whatsappMessage = `Hi, I am interested in the ${product.name}. Can you please share the price and availability?`;
  const whatsappLink = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-8">
        <Link href="/collections/all" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
        </Link>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {/* Image Gallery Section */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/20 border">
              {product.imageUrl ? (
                 <Image
                 src={typeof product.imageUrl === 'string' ? product.imageUrl : urlFor(product.imageUrl).url()}
                 alt={product.name}
                 fill
                 className="object-cover"
                 priority
               />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">No Image</div>
              )}
            </div>
            {/* Thumbnails (Mock logic for now if gallery missing) */}
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {(product.gallery || [product.imageUrl, product.imageUrl, product.imageUrl]).slice(0, 4).map((img: any, idx: number) => (
                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 cursor-pointer border hover:border-primary transition-colors">
                   {img && (
                      <Image
                      src={typeof img === 'string' ? img : urlFor(img).url()}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                   )}
                </div>
              ))}
            </div>
          </div>

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
            <div className="space-y-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-[#25D366] px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-bold text-white transition-transform hover:scale-[1.02] hover:bg-[#20bd5a] shadow-lg"
              >
                <Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Request Price on WhatsApp
              </a>
              <p className="text-[10px] md:text-xs text-center text-muted-foreground">
                Clicking this button will open WhatsApp with a pre-filled enquiry message.
              </p>
            </div>

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
