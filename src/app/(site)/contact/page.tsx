import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Heera Panna Saree',
  description: 'Visit Heera Panna Saree in Rajwada, Indore. Contact us for enquiries about Maheshwari, Silk, and Cotton sarees.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FFFAF0] min-h-screen">
      {/* Header */}
      <div className="bg-[#591C21] text-white py-8 md:py-24 text-center px-4">
        <h1 className="text-2xl md:text-5xl font-display font-bold mb-2 md:mb-4 text-[#D4AF37]">Contact Us</h1>
        <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto">
          We'd love to hear from you. Visit our store or reach out to us for any queries.
        </p>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
          {/* Contact Information */}
          <div className="space-y-6 md:space-y-10">
            <div>
              <h2 className="text-xl md:text-3xl font-display font-bold text-[#591C21] mb-4 md:mb-6">
                Get in Touch
              </h2>
              <p className="text-[#2C1810]/70 text-sm md:text-lg mb-6 md:mb-8">
                Whether you have a question about a specific saree, need help with shipping, or just want to say hello, our team is here to help.
              </p>
              
              <div className="space-y-3 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow rounded-sm">
                  <div className="bg-[#FFFAF0] p-2 md:p-3 rounded-full text-[#591C21]">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#591C21] mb-1 text-sm md:text-base">Visit Our Store</h3>
                    <p className="text-[#2C1810]/80 text-xs md:text-base">
                      123, Rajwada Main Road,<br />
                      Indore, Madhya Pradesh 452002
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow rounded-sm">
                  <div className="bg-[#FFFAF0] p-2 md:p-3 rounded-full text-[#591C21]">
                    <Phone className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#591C21] mb-1 text-sm md:text-base">Call / WhatsApp</h3>
                    <p className="text-[#2C1810]/80 mb-1 md:mb-2 text-xs md:text-base">+91 98765 43210</p>
                    <Link 
                      href="https://wa.me/919876543210" 
                      target="_blank"
                      className="text-xs md:text-sm font-medium text-[#D4AF37] hover:text-[#591C21] underline decoration-[#D4AF37]"
                    >
                      Chat on WhatsApp
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow rounded-sm">
                  <div className="bg-[#FFFAF0] p-2 md:p-3 rounded-full text-[#591C21]">
                    <Mail className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#591C21] mb-1 text-sm md:text-base">Email Us</h3>
                    <p className="text-[#2C1810]/80 text-xs md:text-base">hello@heerapannasaree.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 p-4 md:p-6 bg-white border border-[#D4AF37]/20 shadow-sm hover:shadow-md transition-shadow rounded-sm">
                  <div className="bg-[#FFFAF0] p-2 md:p-3 rounded-full text-[#591C21]">
                    <Clock className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#591C21] mb-1 text-sm md:text-base">Store Timings</h3>
                    <p className="text-[#2C1810]/80 text-xs md:text-base">Mon - Sat: 11:00 AM - 9:00 PM</p>
                    <p className="text-[#2C1810]/80 text-xs md:text-base">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <div className="h-[250px] md:h-[400px] w-full bg-[#E5E7EB] relative">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.086722663664!2d75.85516631496234!3d22.71956898510733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd10d5c5c5d5%3A0x4234234234234234!2sRajwada%2C%20Indore%2C%20Madhya%20Pradesh%20452002!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        ></iframe>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FFFAF0] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
