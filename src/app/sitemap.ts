import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.heerapannasaree.com';

  // Fetch dynamic data
  const products = await getProducts();
  const categories = await getCategories();

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/bridal-hub',
    '/collections',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic Product routes
  const productRoutes = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug.current || product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Dynamic Category/Collection routes
  const categoryRoutes = categories.map((category: any) => ({
    url: `${baseUrl}/collections/${category.slug.current || category.slug}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...productRoutes];
}
