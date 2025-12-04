import Link from 'next/link';
import Image from 'next/image';
import { getPosts, urlFor } from '@/lib/sanity';
import { Calendar } from 'lucide-react';

export const metadata = {
  title: 'Blog | Heera Panna Saree',
  description: 'Read our latest stories on Maheshwari sarees, silk traditions, and wedding fashion trends.',
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="bg-[#FFFAF0] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#591C21] mb-4">
            Our Journal
          </h1>
          <p className="text-[#2C1810]/80 text-lg">
            Stories of heritage, craftsmanship, and timeless elegance.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {posts.map((post: any) => (
              <Link 
                href={`/blogs/${post.slug.current}`} 
                key={post._id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#D4AF37]/20"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(750).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-medium uppercase tracking-wider mb-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <h2 className="font-display text-lg font-bold text-[#591C21] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-[#2C1810]/70 text-xs line-clamp-2 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                  <div className="inline-flex items-center text-[#591C21] font-medium text-xs group-hover:underline decoration-[#D4AF37] underline-offset-4">
                    Read Story
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#2C1810]/60 text-lg">No stories published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
