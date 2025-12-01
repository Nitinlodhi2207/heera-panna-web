# Midgrow Project Replication Guide: Technical & SEO Architecture

This guide serves as a comprehensive reference for replicating the high-performance technical stack, SEO architecture, and UI/UX standards of the Midgrow website for future projects.

## 1. Tech Stack Overview

*   **Framework**: Next.js 15+ (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **CMS**: Sanity.io (Headless CMS)
*   **Database**: Supabase (for backend features like form submissions and lead capture pupup)
*   **Icons**: Lucide React, React Icons, Heroicons
*   **Animations**: Custom Tailwind Animations (CSS-based for performance) & Framer Motion
*   **Email**: Nodemailer
*   **Analytics**: Google Analytics 4, Web Vitals
*  **Hosting**: Vercel
*  **Image Optimization**: Next.js Image Component
*  **Images and video of products**: Cloudinary ( All product images and videos are stored and delivered via Cloudinary for optimal performance and transformation capabilities.) 

---

## 2. Project Structure

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout with global SEO & fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles & Tailwind directives
│   ├── sitemap.ts          # Dynamic sitemap generation
│   └── robots.ts           # Robots.txt generation
├── components/             # React components
│   ├── StructuredData.tsx  # JSON-LD Schema generator
│   ├── Header.tsx          # Navigation
│   └── ...
├── lib/                    # Utility libraries
│   ├── sanity.ts           # Sanity client & queries
│   └── supabase.ts         # Supabase client
└── utils/                  # Helper functions
```

---

## 3. SEO Architecture (Critical)

The SEO strategy relies on three pillars: **Metadata**, **Structured Data (JSON-LD)**, and **Performance**.

### A. Root Layout Metadata (`src/app/layout.tsx`)

Every project must have a robust `layout.tsx` that defines the baseline metadata.

```typescript
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import StructuredData from "@/components/StructuredData";

// 1. Font Optimization
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

// 2. Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.example.com"),
  title: "Brand Name | Primary Keyword | Secondary Keyword",
  description: "Compelling description between 150-160 characters.",
  keywords: ["keyword 1", "keyword 2", "keyword 3"],
  openGraph: {
    title: "Brand Name | Primary Keyword",
    description: "Compelling description...",
    type: "website",
    locale: "en_US",
    url: "https://www.example.com",
    siteName: "Brand Name",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Brand Name" }],
  },
  twitter: {
    card: "summary_large_image",
    // ...
  },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnects for performance */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* JSON-LD Schema */}
        <StructuredData 
          type="organization" 
          data={{
            name: "Brand Name",
            url: "https://www.example.com",
            logo: "https://www.example.com/logo.png"
          }} 
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### B. Structured Data Component (`src/components/StructuredData.tsx`)

Create a reusable component to inject JSON-LD schema into pages.

```typescript
interface StructuredDataProps {
  type: 'organization' | 'website' | 'blogPosting' | 'article';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData = {};

  switch (type) {
    case 'organization':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": data.name,
        "url": data.url,
        "logo": data.logo,
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": data.phone,
          "contactType": "customer service"
        }
      };
      break;
    // Add cases for 'website', 'blogPosting', etc.
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

### C. Dynamic Sitemaps (`src/app/sitemap.ts`)

Use Next.js built-in sitemap generation to automatically include dynamic routes (like blog posts).

```typescript
import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/sanity'; // Fetch dynamic URLs

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.example.com';
  const posts = await getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...blogUrls,
  ];
}
```

---

## 4. Sanity CMS Setup

### A. Client Configuration (`src/lib/sanity.ts`)

Use a robust setup that handles image URLs and GROQ queries efficiently.

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true, // Important for performance
  apiVersion: '2024-01-01',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// GROQ Queries
export const blogPostsQuery = `
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    excerpt
  }
`;

// Fetch Helper
export async function getBlogPosts() {
  return client.fetch(blogPostsQuery);
}
```

---

## 5. UI/UX Guidance & Libraries

### A. Design System (`tailwind.config.js`)

Define a consistent design system with custom fonts and animations.

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'], // For headings
      },
      colors: {
        primary: '#1e40af', // Define brand colors
        secondary: '#...',
      },
      // Custom CSS Animations for better performance than JS animations
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
};
```

### B. Key Libraries

1.  **Framer Motion**: Use for complex, interactive animations (e.g., scroll reveals, layout transitions).
    *   *Best Practice*: Use `whileInView` for scroll triggers.
2.  **Lucide React**: For clean, consistent SVG icons.
3.  **Tailwind CSS**: For all styling. Avoid custom CSS files except for global resets.

### C. UX Principles

1.  **Mobile First**: Always design for mobile breakpoints (`< 768px`) first.
2.  **Visual Hierarchy**: Use font weights (400, 700, 900) and sizes to guide the eye.
3.  **Feedback**: Every interactive element (buttons, links) must have hover/active states.
4.  **Performance**: Use `next/image` for all images to prevent layout shift (CLS).

---

## 6. Performance Checklist

1.  **Fonts**: Use `next/font` with `display: 'optional'` or `swap`.
2.  **Images**: Always define `width` and `height` or use `fill` with `sizes` prop in `next/image`.
3.  **Scripts**: Use `next/script` with `strategy="afterInteractive"` or `lazyOnload` for third-party scripts (Analytics, Chat).
4.  **Preconnect**: Add `<link rel="preconnect">` for external domains (Google Fonts, Analytics) in `layout.tsx`.

## 7. Quick Start for New Projects

1.  Initialize: `npx create-next-app@latest my-project --typescript --tailwind --eslint`
2.  Install Core Deps: `npm install next-sanity @sanity/image-url framer-motion lucide-react`
3.  Copy `tailwind.config.js` configuration.
4.  Copy `src/lib/sanity.ts` and configure env variables.
5.  Set up `src/app/layout.tsx` with SEO metadata.
6.  Create `src/components/StructuredData.tsx`.
7.  Start building components!

---

## 8. Layout Dimensions & Viewport Standards

To maintain the exact look and feel of the Midgrow website, adhere to these specific dimensions for mobile and desktop views.

### A. Desktop View (min-width: 768px)

*   **Container Width**: `max-w-7xl` (1280px) centered with `mx-auto`.
*   **Horizontal Padding**: `px-4 sm:px-6 lg:px-8`.
*   **Section Padding**: `py-12 lg:py-16` (Vertical spacing between major sections).

#### Desktop Header (`src/components/Header.tsx`)
*   **Height**: `h-16` (64px).
*   **Logo Size**: `w-36 h-18` (approx 144px x 72px).
*   **Navigation Spacing**: `space-x-8` (32px gap between links).
*   **CTA Button**: `px-6 py-2.5` (24px horizontal, 10px vertical padding).

#### Desktop Footer (`src/components/Footer.tsx`)
*   **Logo Size**: `w-32 h-12` (128px x 48px).
*   **Social Icons**: `w-10 h-10` (40px x 40px) rounded squares.
*   **Grid Layout**: `grid-cols-5` (2 cols for info, 3 cols for links).

### B. Mobile View (max-width: 767px)

*   **Container Padding**: `px-4` (16px) generally, `px-2` for compact footers.
*   **Typography**: Use `text-sm` (14px) or `text-xs` (12px) for secondary text.

#### Mobile Header (`src/components/MobileHeader.tsx`)
*   **Height**: `h-14` (56px) fixed at top.
*   **Logo Size**: `h-14 w-auto max-w-[140px]` (Constrained by header height).
*   **Search/Action Button**: `w-12 h-12` (48px x 48px) circular touch target.

#### Mobile Bottom Navigation (`src/components/BottomNavigation.tsx`)
*   **Height**: `h-16` (64px) fixed at bottom.
*   **Grid**: `grid-cols-4` (Equal width for each tab).
*   **Icons**: `w-5 h-5` (20px x 20px).
*   **Active Indicator**: `h-1` top border on active tab.
*   **Z-Index**: `z-50` (Must be above all content).

#### Mobile Footer (`src/components/MobileFooter.tsx`)
*   **Logo Size**: `w-18 h-7` (72px x 28px).
*   **Social Icons**: `w-4 h-4` inside `p-1.5` container.
*   **Quick Links**: Horizontal scrollable list, `px-2 py-0.5` pills.
*   **Accordion Links**: Collapsible sections for Services/Solutions to save vertical space.

### C. Global Spacing Variables (`globals.css`)

*   **Section Padding**:
    *   Mobile: `py-16` (4rem).
    *   Desktop: `py-24` (6rem).
*   **Safe Areas**:
    *   `padding-bottom: env(safe-area-inset-bottom)` (Critical for iOS home bar).

### D. Page-Specific Mobile Dimensions (Critical)

To ensure pixel-perfect replication on mobile devices (`< 768px`), adhere to these container and component specifications.

#### 1. Home Page Mobile Layout (`src/app/page.tsx`)

*   **Hero Section**:
    *   **Container**: `min-h-screen` flex column layout.
    *   **Content Overlay**: `px-4 py-8` centered over the background image.
    *   **Main Headline**: `text-3xl sm:text-4xl` (approx 30-36px), `font-bold`, `leading-tight`.
    *   **Dynamic Text Height**: `h-12 sm:h-16` (48-64px) to prevent layout shift during word rotation.
    *   **Subheading**: `text-base` (16px), `mb-3`.
    *   **Feature Line**: `text-xs` (12px), `tracking-widest`.

*   **Services Showcase Section**:
    *   **Padding**: `py-12 px-4` (48px vertical, 16px horizontal).
    *   **Grid Layout**: `grid-cols-2` (Two columns on mobile).
    *   **Grid Gap**: `gap-4` (16px).
    *   **Card Padding**: `p-4` (16px).
    *   **Card Typography**: `text-sm` (14px) for titles, `text-xs` (12px) for descriptions.
    *   **Icon Size**: `w-10 h-10` (40px x 40px) container.

#### 2. Services Page Mobile Layout (`src/app/services/page.tsx`)

*   **Hero Section**:
    *   **Top Padding**: `pt-32` (128px) to clear the fixed header.
    *   **Bottom Padding**: `pb-4` (16px).
    *   **Headline**: `text-4xl` (36px).
    *   **Description**: `text-sm` (14px).

*   **Services Grid**:
    *   **Padding**: `py-8 px-4` (32px vertical, 16px horizontal).
    *   **Grid Layout**: `grid-cols-1` (Single column cards on mobile).
    *   **Card Style**: `p-4` padding, `rounded-xl` borders.

*   **Process Timeline**:
    *   **Padding**: `py-10 px-4`.
    *   **Timeline Line**: `left-3` (12px from left edge).
    *   **Step Content**: `pl-10` (40px left padding) to clear the timeline.
    *   **Step Indicator**: `w-6 h-6` (24px) circle.

#### 3. General Mobile Container Standards

*   **Standard Container Padding**: Always use `px-4` (16px) for the main content wrapper on mobile.
*   **Section Vertical Spacing**: Use `py-12` (48px) or `py-16` (64px) to separate major sections.
*   **Touch Targets**: Ensure interactive elements (buttons, icons) have a minimum hit area of `44x44px` (e.g., `w-12 h-12` or `p-3`).
*   **Font Sizes**:
    *   **H1**: `text-3xl` to `text-4xl` (30-36px).
    *   **H2**: `text-2xl` (24px).
    *   **Body**: `text-sm` (14px) or `text-base` (16px).
    *   **Meta/Caption**: `text-xs` (12px).
