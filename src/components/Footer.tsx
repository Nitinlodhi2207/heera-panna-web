import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="hidden md:block bg-[#FDF5E6] border-t-4 border-[#D4AF37] pt-20 pb-10">
      <div className="container">
        <div className="grid grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-4 space-y-8 pr-8">
            <Link href="/" className="block">
              <Image 
                src="/Heera-logo-svg.svg" 
                alt="Heera Panna Logo" 
                width={240} 
                height={80} 
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-[#2C1810]/80 leading-relaxed font-serif">
              Embodying the timeless elegance of Indian heritage. We craft sarees that are not just garments, but heirlooms passed down through generations.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#591C21] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#591C21] transition-all duration-300 shadow-md">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#591C21] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#591C21] transition-all duration-300 shadow-md">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          {/* Links Columns */}
          <div className="col-span-2">
            <h3 className="font-display font-bold text-xl text-[#591C21] mb-8 relative inline-block">
              Collections
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4 text-[#2C1810]/80">
              <li><Link href="/collections/maheshwari" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Maheshwari</Link></li>
              <li><Link href="/collections/silk" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Silk Sarees</Link></li>
              <li><Link href="/collections/cotton" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Cotton</Link></li>
              <li><Link href="/collections/wedding" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Wedding Edit</Link></li>
            </ul>
          </div>

          <div className="col-span-2">
            <h3 className="font-display font-bold text-xl text-[#591C21] mb-8 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <ul className="space-y-4 text-[#2C1810]/80">
              <li><Link href="/about" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Contact Us</Link></li>
              <li><Link href="/blog" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Our Journal</Link></li>
              <li><Link href="/terms" className="hover:text-[#591C21] hover:translate-x-1 transition-all inline-block">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-4 pl-8 border-l border-[#D4AF37]/20">
            <h3 className="font-display font-bold text-xl text-[#591C21] mb-8 relative inline-block">
              Visit Our Store
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-[#D4AF37]"></span>
            </h3>
            <address className="not-italic space-y-6 text-[#2C1810]/80">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-[#591C21] mt-1 flex-shrink-0" />
                <p>123, Rajwada Main Road,<br />Indore, Madhya Pradesh 452002</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[#591C21] flex-shrink-0" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-[#591C21] flex-shrink-0" />
                <p>hello@heerapannasaree.com</p>
              </div>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-[#591C21] font-medium border-b border-[#591C21] pb-0.5 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors mt-4"
              >
                Get Directions
              </Link>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D4AF37]/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#2C1810]/60">
          <p>&copy; {new Date().getFullYear()} Heera Panna Saree. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-[#591C21]">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#591C21]">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
