import HeroCarousel from "@/components/HeroCarousel";
import GramWorthyLooks from "@/components/GramWorthyLooks";
import CategoryFilter from "@/components/CategoryFilter";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { getRecentPosts, urlFor } from "@/lib/sanity";
import { Calendar } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Heera Panna Saree | Premium Maheshwari & Silk Sarees in Indore",
  description: "Discover the finest collection of Maheshwari, Silk, and Cotton sarees at Heera Panna Saree, Rajwada, Indore. Trusted heritage brand for wedding and daily wear.",
  alternates: {
    canonical: "https://www.heerapannasaree.com",
  },
};

export default async function Home() {
  const recentPosts = await getRecentPosts();

  const getCategoryThumbnail = (categoryName: string) => {
    const product = PRODUCTS.find(p => p.category.name === categoryName);
    return product?.imageUrl;
  };

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
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {['Maheshwari', 'Embroidered Saree', 'Designer Saree', 'Printed Saree', 'Silk Saree', 'Lehenga', 'Partywear Saree', 'Lehenga Choli', 'Bandhani Saree', 'Banarasi Saree'].map((category) => {
              const thumbnail = getCategoryThumbnail(category);
              return (
                <Link key={category} href={`/collections/${category.toLowerCase().replace(/\s+/g, '-')}`} className="group relative aspect-3/4 overflow-hidden rounded-lg bg-secondary/20">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10" />
                  {/* Category Image */}
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={category}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-300" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-20 text-white">
                    <h3 className="font-display text-lg font-bold">{category}</h3>
                    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center mt-1">
                      View All <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
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
            <div className="order-1 md:order-2 aspect-[9/16] bg-gray-200 rounded-xl overflow-hidden relative w-full max-w-[350px] md:max-w-[400px] mx-auto shadow-lg">
               <Image
                 src="https://res.cloudinary.com/dgs35slge/image/upload/v1764938444/hg_tiaqkd.png"
                 alt="Heera Panna Store"
                 fill
                 className="object-cover"
               />
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
              src="https://maps.google.com/maps?q=22.7189120,75.8554697&t=&z=15&ie=UTF8&iwloc=&output=embed"
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

      {/* Latest Blog Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-[#FFFAF0]">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
              <div className="text-center md:text-left w-full md:w-auto">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#591C21] mb-2">From Our Journal</h2>
                <p className="text-sm text-[#2C1810]/70 max-w-md">Stories of heritage, craftsmanship, and the timeless elegance of Indian sarees.</p>
              </div>
              <Link href="/blogs" className="hidden md:flex items-center text-[#591C21] font-medium hover:text-[#D4AF37] transition-colors group">
                View All Stories <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosts.map((post: any) => (
                <Link href={`/blogs/${post.slug.current}`} key={post._id} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#D4AF37]/20">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).width(600).height(750).url()}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">No Image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-[10px] text-[#D4AF37] font-bold mb-2 uppercase tracking-wider">
                      <Calendar className="w-3 h-3 mr-1.5" />
                      {new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="font-display text-base font-bold text-[#2C1810] mb-1 group-hover:text-[#591C21] transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-[10px] text-[#2C1810]/70 line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <span className="text-[10px] font-medium text-[#591C21] underline decoration-[#D4AF37] underline-offset-2">Read More</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/blogs" className="inline-flex items-center text-[#591C21] font-medium hover:text-[#D4AF37] transition-colors">
                View All Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  );
}
