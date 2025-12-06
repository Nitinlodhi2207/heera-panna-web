import Image from 'next/image';
import Link from 'next/link';
import { Award, Heart, History, MapPin } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Heritage of Heera Panna Saree Indore',
  description: 'Discover the 20+ year legacy of Heera Panna Saree in Rajwada, Indore. We specialize in authentic Maheshwari, Chanderi, and Silk sarees.',
  alternates: {
    canonical: 'https://www.heerapannasaree.com/about',
  },
  openGraph: {
    title: 'About Us | Heritage of Heera Panna Saree Indore',
    description: 'Discover the 20+ year legacy of Heera Panna Saree in Rajwada, Indore.',
    images: ['https://images.unsplash.com/photo-1583391726247-12b52ce0645d?q=80&w=1974&auto=format&fit=crop'],
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFFAF0]">
      {/* Hero Section */}
      <section className="relative h-[30vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#591C21]/90 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610189012906-4783fdae2b2b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40 z-0" />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <span className="text-[#D4AF37] text-xs md:text-base font-medium tracking-[0.2em] uppercase mb-2 md:mb-4 block">
            Our Heritage
          </span>
          <h1 className="text-2xl md:text-6xl font-display font-bold text-white mb-3 md:mb-6">
            Weaving Traditions, <br /> Draping Elegance
          </h1>
          <p className="text-white/80 text-sm md:text-xl font-light max-w-2xl mx-auto">
            A journey of authenticity, craftsmanship, and timeless beauty in the heart of Indore.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-8 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-full h-full border-2 border-[#D4AF37] rounded-sm z-0" />
            <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1583391726247-12b52ce0645d?q=80&w=1974&auto=format&fit=crop"
                alt="Saree Craftsmanship"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-xl md:text-4xl font-display font-bold text-[#591C21]">
              The Story of Heera Panna
            </h2>
            <div className="w-12 md:w-20 h-1 bg-[#D4AF37]" />
            <div className="space-y-3 md:space-y-4 text-[#2C1810]/80 text-sm md:text-lg leading-relaxed font-serif">
              <p>
                Located in the historic Rajwada of Indore, Heera Panna Saree has been a trusted name for generations. What started as a humble passion for Indian textiles has grown into a destination for saree connoisseurs.
              </p>
              <p>
                For over two decades, we have dedicated ourselves to preserving the art of the Maheshwari weave, while also curating the finest Silks and Cottons from across India. We believe that a saree is not just a garment; it is a piece of art, a memory, and an heirloom passed down through generations.
              </p>
              <p>
                Our mission is simple: to bring you authentic, high-quality sarees that make you feel regal on your special occasions and comfortable in your daily life.
              </p>
            </div>
            <div className="pt-2 md:pt-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 border border-[#591C21] text-[#591C21] text-sm md:text-base font-medium hover:bg-[#591C21] hover:text-[#D4AF37] transition-colors duration-300"
              >
                Visit Our Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[#FDF5E6] py-8 md:py-24 border-y border-[#D4AF37]/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-xl md:text-4xl font-display font-bold text-[#591C21] mb-2 md:mb-4">Why Choose Us</h2>
            <p className="text-[#2C1810]/70 text-sm md:text-base">We take pride in our commitment to quality and customer satisfaction.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              {
                icon: History,
                title: "Rich Heritage",
                description: "Deeply rooted in the traditions of Indore, bringing you the authentic essence of Maheshwari craftsmanship."
              },
              {
                icon: Award,
                title: "Premium Quality",
                description: "Every saree in our collection is handpicked for its fabric quality, weave intricacy, and design uniqueness."
              },
              {
                icon: Heart,
                title: "Customer Trust",
                description: "Serving thousands of happy customers who trust us for their wedding trousseaus and daily wardrobes."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-5 md:p-8 text-center shadow-sm hover:shadow-md transition-shadow border border-[#D4AF37]/10 group">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#FFFAF0] text-[#591C21] mb-4 md:mb-6 group-hover:bg-[#591C21] group-hover:text-[#D4AF37] transition-colors duration-300">
                  <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-display font-bold text-[#591C21] mb-2 md:mb-3">{item.title}</h3>
                <p className="text-[#2C1810]/70 leading-relaxed text-xs md:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Highlight */}
      <section className="py-8 md:py-24 container mx-auto px-4">
        <div className="bg-[#591C21] rounded-sm overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-16 flex flex-col justify-center text-white">
              <h2 className="text-xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-[#D4AF37]">
                Experience the Elegance In-Store
              </h2>
              <p className="text-white/80 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                While our digital showroom offers a glimpse, the true beauty of our sarees is best experienced in person. Feel the texture, see the vibrant colors, and let our experts guide you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 bg-[#D4AF37] text-[#591C21] font-bold hover:bg-white transition-colors duration-300 text-sm md:text-base"
                >
                  <MapPin className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Locate Store
                </Link>
                <Link 
                  href="/collections" 
                  className="inline-flex items-center justify-center px-6 py-2 md:px-8 md:py-3 border border-[#D4AF37] text-[#D4AF37] font-medium hover:bg-[#D4AF37]/10 transition-colors duration-300 text-sm md:text-base"
                >
                  Browse Online
                </Link>
              </div>
            </div>
            <div className="relative h-48 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1566221704285-2d188422960d?q=80&w=2070&auto=format&fit=crop"
                alt="Heera Panna Store Ambience"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
