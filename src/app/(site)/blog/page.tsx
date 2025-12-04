import Link from 'next/link';
import Image from 'next/image';
import { getPosts, urlFor } from '@/lib/sanity';
import { Calendar } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Heera Panna Saree',
  description: 'Read our latest stories about Maheshwari sarees, silk traditions, and wedding fashion trends.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-[#FFFAF0] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#591C21] mb-4">Our Journal</h1>
          <p className="text-[#2C1810]/80 max-w-2xl mx-auto font-light text-lg">
            Stories of heritage, craftsmanship, and the timeless elegance of Indian sarees.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link 
                href={`/blog/${post.slug.current}`} 
                key={post._id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  {post.mainImage ? (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(500).url()}
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
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-[#D4AF37] font-medium mb-3 uppercase tracking-wider">
                    <Calendar className="w-3 h-3 mr-1.5" />
                    {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <h2 className="font-display text-xl font-bold text-[#2C1810] mb-3 group-hover:text-[#591C21] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-[#2C1810]/70 text-sm line-clamp-3 mb-4 flex-grow">
                    {post.excerpt || post.seoDescription}
                  </p>
                  
                  <span className="inline-block text-[#591C21] font-medium text-sm underline decoration-[#D4AF37] underline-offset-4 group-hover:decoration-[#591C21] transition-all">
                    Read Story
                  </span>
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
