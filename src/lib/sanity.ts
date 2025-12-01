import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = projectId 
  ? createClient({
      projectId,
      dataset,
      useCdn: true, // Important for performance
      apiVersion: '2024-01-01',
    })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: any) {
  if (!builder) return { width: () => ({ height: () => ({ url: () => source }) }), url: () => source } as any;
  return builder.image(source);
}

// GROQ Queries
export const productsQuery = `
  *[_type == "product"] | order(_createdAt desc) {
    _id,
    name,
    slug,
    images,
    price,
    category->{name, slug},
    fabric,
    "imageUrl": images[0]
  }
`;

export const productsByCategoryQuery = `
  *[_type == "product" && category->slug.current == $slug] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    images,
    price,
    category->{name, slug},
    fabric,
    "imageUrl": images[0]
  }
`;

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    images,
    description,
    detailedDescription,
    price,
    category->{name, slug},
    fabric,
    weave,
    occasion,
    "imageUrl": images[0],
    "gallery": images
  }
`;

export const categoriesQuery = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    image
  }
`;

// Fetch Helper
export async function getProducts() {
  if (!client) return [];
  return client.fetch(productsQuery);
}

export async function getProductsByCategory(slug: string) {
  if (!client) return [];
  return client.fetch(productsByCategoryQuery, { slug });
}

export async function getProductBySlug(slug: string) {
  if (!client) return null;
  return client.fetch(productBySlugQuery, { slug });
}

export async function getCategories() {
  if (!client) return [];
  return client.fetch(categoriesQuery);
}
