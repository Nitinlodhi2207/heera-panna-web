import { MetadataRoute } from 'next';
import { getProducts, getCategories, getPosts } from '@/lib/sanity';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.heerapannasaree.com';

  // Fetch dynamic data
  const products = await getProducts();
  const categories = await getCategories();
  const posts = await getPosts();

  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  const addRoute = (route: MetadataRoute.Sitemap[number]) => {
    if (!unique.has(route.url)) unique.set(route.url, route);
  };
  const toDate = (value?: string) => (value ? new Date(value) : new Date());

  // Static routes
  [
    '',
    '/about',
    '/contact',
    '/bridal-hub',
    '/collections',
    '/blog',
    '/blogs',
    '/search',
  ].forEach((route) =>
    addRoute({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1 : 0.8,
    })
  );

  // Dynamic Product routes
  products.forEach((product: any) =>
    addRoute({
      url: `${baseUrl}/products/${product.slug?.current || product.slug}`,
      lastModified: toDate(product._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  );

  // Dynamic Category/Collection routes
  categories.forEach((category: any) =>
    addRoute({
      url: `${baseUrl}/collections/${category.slug?.current || category.slug}`,
      lastModified: toDate(category._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  );

  // Dynamic Blog routes (cover both /blog and /blogs namespaces)
  posts.forEach((post: any) => {
    const slug = post.slug?.current || post.slug;
    const lastModified = toDate(post.publishedAt || post._updatedAt);
    addRoute({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
    addRoute({
      url: `${baseUrl}/blogs/${slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return Array.from(unique.values());
}
