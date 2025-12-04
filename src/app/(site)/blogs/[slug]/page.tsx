import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from 'next-sanity';
import { getPostBySlug, urlFor } from '@/lib/sanity';
import { ArrowLeft, Calendar, Share2 } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-[#FFFAF0] min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] w-full bg-[#2C1810]">
        {post.mainImage && (
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20">
          <div className="container mx-auto max-w-4xl">
            <Link 
              href="/blogs" 
              className="inline-flex items-center text-white/80 hover:text-[#D4AF37] transition-colors mb-6 text-sm font-medium tracking-wide"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Journal
            </Link>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                  <span>By {post.author}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-12 lg:p-16 border-t-4 border-[#D4AF37]">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-[#591C21] prose-p:text-[#2C1810]/80 prose-a:text-[#D4AF37] hover:prose-a:text-[#591C21] max-w-none">
            <PortableText 
              value={post.body} 
              components={{
                types: {
                  image: ({ value }) => (
                    <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ),
                },
              }}
            />
          </div>

          {/* Share / Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Share this story
            </div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-gray-50 hover:bg-[#FFFAF0] text-[#591C21] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
