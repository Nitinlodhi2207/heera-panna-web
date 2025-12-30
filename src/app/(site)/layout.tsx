import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import StructuredData from "@/components/StructuredData";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import BottomNavigation from "@/components/BottomNavigation";
import Footer from "@/components/Footer";
import MobileFooter from "@/components/MobileFooter";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.heerapannasaree.com"),
  title: "Heera Panna Saree | Premium Maheshwari & Silk Sarees in Indore",
  description: "Discover the finest collection of Maheshwari, Silk, and Cotton sarees at Heera Panna Saree, Rajwada, Indore. Trusted heritage brand for wedding and daily wear.",
  keywords: ["Maheshwari sarees", "Silk sarees Indore", "Rajwada saree shop", "Heera Panna Saree", "Wedding sarees Indore", "Cotton sarees", "Handloom sarees", "Chanderi sarees", "Banarasi sarees"],
  authors: [{ name: "Heera Panna Saree" }],
  creator: "Heera Panna Saree",
  publisher: "Heera Panna Saree",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Heera Panna Saree | Premium Maheshwari & Silk Sarees",
    description: "Trusted heritage brand for wedding and daily wear in Indore. Shop our exclusive collection of Maheshwari, Chanderi, and Silk sarees.",
    type: "website",
    locale: "en_IN",
    url: "https://www.heerapannasaree.com",
    siteName: "Heera Panna Saree",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Heera Panna Saree Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heera Panna Saree | Premium Maheshwari & Silk Sarees",
    description: "Discover the finest collection of Maheshwari, Silk, and Cotton sarees at Heera Panna Saree, Rajwada, Indore.",
    images: ["/logo.png"],
    creator: "@heerapannasaree",
  },
  verification: {
    google: "google-site-verification-code", // Replace with actual code
  },
  category: "clothing",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
        {/* Organization Schema - Critical for Google Search Logo */}
        <StructuredData 
          type="organization" 
          data={{
            name: "Heera Panna Saree",
            url: "https://www.heerapannasaree.com",
            logo: "https://www.heerapannasaree.com/logo.png",
            phone: "+918982826000"
          }} 
        />
        {/* Local Business Schema */}
        <StructuredData 
          type="localBusiness" 
          data={{
            name: "Heera Panna Saree",
            url: "https://www.heerapannasaree.com",
            image: "https://www.heerapannasaree.com/logo.png",
            logo: "https://www.heerapannasaree.com/logo.png",
            phone: "+918982826000",
            address: {
              street: "Rajwada",
              city: "Indore",
              region: "Madhya Pradesh",
              postalCode: "452002"
            },
            geo: {
              latitude: "22.7196",
              longitude: "75.8577"
            }
          }} 
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased font-sans bg-background text-foreground`}
      >
        <Header />
        <MobileHeader />
        <main className="min-h-screen pt-14 md:pt-0 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileFooter />
        <BottomNavigation />
      </body>
    </html>
  );
}
