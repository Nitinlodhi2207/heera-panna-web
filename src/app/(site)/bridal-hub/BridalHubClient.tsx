'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const videos = [
  {
    id: 1,
    title: "The Royal Heritage",
    subtitle: "Timeless Elegance for Your Special Day",
    src: "https://videos.pexels.com/video-files/4057322/4057322-uhd_2160_3840_25fps.mp4", // Indian Bride
    poster: "https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Silk & Grace",
    subtitle: "Handwoven Masterpieces",
    src: "https://videos.pexels.com/video-files/6394054/6394054-uhd_2160_3840_25fps.mp4", // Fashion Walk
    poster: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Golden Threads",
    subtitle: "Weaving Dreams into Reality",
    src: "https://videos.pexels.com/video-files/3753633/3753633-hd_1080_1920_25fps.mp4", // Fabric Texture
    poster: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "The Bridal Glow",
    subtitle: "Radiate Beauty in Every Drape",
    src: "https://videos.pexels.com/video-files/5380876/5380876-hd_1080_1920_30fps.mp4", // Jewelry/Details
    poster: "https://images.unsplash.com/photo-1583391733958-e023765f350a?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Eternal Love",
    subtitle: "Celebrate Your Union with Heera Panna",
    src: "https://videos.pexels.com/video-files/3205809/3205809-hd_1920_1080_25fps.mp4", // Celebration
    poster: "https://images.unsplash.com/photo-1566221704285-2d188422960d?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function BridalHubClient() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6 // Video must be 60% visible to play
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          video.play().catch(e => console.log("Autoplay prevented", e));
        } else {
          video.pause();
        }
      });
    }, observerOptions);

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <div className="bg-black text-white h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
      {/* Floating Header */}
      <div className="fixed top-0 left-0 w-full z-50 p-2 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto flex items-center gap-2 text-white/80 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5 drop-shadow-md" />
        </Link>
        {/* Minimalist Logo or Empty Space */}
        <div className="w-5"></div> 
      </div>

      {videos.map((video, index) => (
        <section key={video.id} className="relative h-screen w-full snap-start snap-always flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              ref={(el) => { videoRefs.current[index] = el }}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
          </div>

          {/* Content - Compact Left/Right Style */}
          <div className="absolute bottom-20 left-0 right-0 px-4 md:px-8 flex flex-col md:flex-row items-end justify-between gap-4 z-10 w-full">
            
            {/* Left Side: Title & Subtitle */}
            <div className="text-left max-w-lg animate-fade-in-up">
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg tracking-wide leading-tight">
                {video.title}
              </h2>
              <p className="text-sm md:text-lg text-white/90 font-light tracking-widest drop-shadow-md">
                {video.subtitle}
              </p>
            </div>

            {/* Right Side: CTA Button */}
            <div className="w-full md:w-auto flex justify-start md:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link 
                href="/collections/wedding"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#D4AF37]/90 backdrop-blur-sm text-[#591C21] font-bold text-xs md:text-sm tracking-widest uppercase rounded-sm hover:bg-[#D4AF37] transition-all duration-300 shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Scroll Indicator (only for first few slides) */}
          {index < videos.length - 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-60">
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
