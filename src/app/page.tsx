import HeroCarousel from "@/components/HeroCarousel";
import GramWorthyLooks from "@/components/GramWorthyLooks";
import CategoryFilter from "@/components/CategoryFilter";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Gram-Worthy Looks Section */}
      <GramWorthyLooks />

      {/* Promotional Banner */}
      <section className="py-4 bg-secondary/20">
        <div className="container px-4">
          <div className="bg-white rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                Wedding Edit Glitz
              </h3>
              <p className="text-sm text-muted-foreground">Find Every Look That Flatters</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-base mb-1">
                Shop for <span className="font-bold">INR 11,999</span> get 7% off* | Use Code: <span className="font-bold text-primary">GLAM7</span>
              </p>
              <Link href="/terms" className="text-[10px] text-muted-foreground underline">
                *T&C
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <CategoryFilter />

      {/* Categories Grid Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container px-4">
          <div className="text-center mb-6">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Our Collections</h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Handpicked sarees for every occasion, from daily elegance to wedding grandeur.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {['Maheshwari', 'Silk', 'Cotton', 'Wedding'].map((category) => (
              <Link key={category} href={`/collections/${category.toLowerCase()}`} className="group relative aspect-3/4 overflow-hidden rounded-lg bg-secondary/20">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                {/* Placeholder Image */}
                <div className="absolute inset-0 bg-gray-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
                  <h3 className="font-display text-lg font-bold">{category}</h3>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center mt-1">
                    View All <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <TestimonialsCarousel />

      {/* Trust/About Section */}
      <section className="py-8 bg-secondary/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">A Legacy of Trust in Rajwada</h2>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                For over 20 years, Heera Panna Saree has been the destination for authentic Maheshwari and traditional sarees in Indore. We believe in offering only the finest fabrics and designs that celebrate our rich cultural heritage.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-sm text-foreground font-medium">
                  <Star className="h-4 w-4 text-primary mr-2" /> Authentic Handloom Quality
                </li>
                <li className="flex items-center text-sm text-foreground font-medium">
                  <Star className="h-4 w-4 text-primary mr-2" /> Trusted by Thousands of Families
                </li>
                <li className="flex items-center text-sm text-foreground font-medium">
                  <Star className="h-4 w-4 text-primary mr-2" /> Exclusive Wedding Collections
                </li>
              </ul>
              <Link href="/about" className="text-sm text-primary font-medium hover:underline">
                Read Our Story &rarr;
              </Link>
            </div>
            <div className="order-1 md:order-2 aspect-square bg-gray-200 rounded-xl overflow-hidden relative">
               {/* Placeholder for Shop Image */}
               <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">Store Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-8 md:py-12 bg-background">
        <div className="container px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Visit Our Store</h2>
          <div className="w-full h-[200px] md:h-[350px] rounded-lg overflow-hidden shadow-md">
            <iframe 
              src="https://maps.google.com/maps?q=22.7417085,75.8424378&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
