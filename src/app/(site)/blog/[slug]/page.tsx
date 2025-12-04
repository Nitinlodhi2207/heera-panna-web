import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Calendar } from 'lucide-react';
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
    title: `${post.seoTitle || post.title} | Heera Panna Blog`,
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

  const components = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <div className="relative w-full aspect-[16/9] my-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(value).width(1200).height(675).fit('max').auto('format').url()}
              alt={value.alt || 'Blog Image'}
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="font-display text-2xl md:text-3xl font-bold text-[#591C21] mt-10 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="font-display text-xl md:text-2xl font-bold text-[#2C1810] mt-8 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="text-[#2C1810]/80 leading-relaxed mb-4 text-lg">{children}</p>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-[#D4AF37] pl-4 italic text-[#591C21] my-6 text-xl font-serif bg-[#D4AF37]/10 py-4 pr-4 rounded-r-md">
          {children}
        </blockquote>
      ),
    },
  };

  return (
    <article className="bg-[#FFFAF0] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        {post.mainImage ? (
          <Image
            src={urlFor(post.mainImage).width(1920).height(1080).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#591C21]" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-20 container mx-auto px-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Link>
          
          <div className="flex items-center text-[#D4AF37] font-medium mb-4 uppercase tracking-wider text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(post.publishedAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-12 rounded-xl shadow-sm -mt-20 relative z-10">
          <div className="prose prose-lg prose-headings:font-display prose-headings:text-[#591C21] prose-p:text-[#2C1810]/80 prose-a:text-[#D4AF37] max-w-none">
            <PortableText value={post.body} components={components} />
          </div>
        </div>
      </div>
    </article>
  );
}
