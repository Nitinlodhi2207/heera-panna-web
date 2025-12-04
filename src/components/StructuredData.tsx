import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'blogPosting' | 'article' | 'product' | 'localBusiness' | 'breadcrumb' | 'collectionPage';
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
    case 'localBusiness':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Store",
        "name": data.name,
        "image": data.image,
        "@id": data.url,
        "url": data.url,
        "telephone": data.phone,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.address.street,
          "addressLocality": data.address.city,
          "addressRegion": data.address.region,
          "postalCode": data.address.postalCode,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": data.geo.latitude,
          "longitude": data.geo.longitude
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "10:00",
          "closes": "21:00"
        },
        "priceRange": "₹₹"
      };
      break;
    case 'product':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": data.name,
        "image": data.image,
        "description": data.description,
        "brand": {
          "@type": "Brand",
          "name": "Heera Panna Saree"
        },
        "offers": {
          "@type": "Offer",
          "url": data.url,
          "priceCurrency": "INR",
          "price": data.price || "0", // Use 0 or actual price if available
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        }
      };
      break;
    case 'breadcrumb':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": data.map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      break;
    case 'collectionPage':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": data.name,
        "description": data.description,
        "url": data.url,
        "image": data.image
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
