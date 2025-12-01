import React from 'react';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'blogPosting' | 'article' | 'product' | 'localBusiness';
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
        }
      };
      break;
    // Add other cases as needed
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
