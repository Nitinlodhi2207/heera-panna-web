'use client';

import { useState, useRef, useEffect } from 'react';
import { Eye, X, Play, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const products = [
	{
		id: 1,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764844684/1204_3_kfqdjr.mp4',
		views: '1.2k',
		likes: '234',
		label: 'TRENDING'
	},
	{
		id: 2,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843542/1204_rte4wb.mp4',
		views: '856',
		likes: '189',
		label: 'NEW'
	},
	{
		id: 3,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843645/1203_1_anhqwu.mp4',
		views: '2.1k',
		likes: '456',
		label: 'POPULAR'
	},
	{
		id: 4,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843709/1203_sipbrs.mp4',
		views: '3.5k',
		likes: '678',
		label: 'BESTSELLER'
	},
	{
		id: 5,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843873/1204_1_idw9jv.mp4',
		views: '942',
		likes: '167',
		label: 'LATEST'
	},
	{
		id: 6,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764844048/1204_2_aporsf.mp4',
		views: '1.5k',
		likes: '289',
		label: 'FEATURED'
	}
];

type NetworkQuality = 'high' | 'medium' | 'low';

export default function GramWorthyLooks() {
	const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);
	const [networkQuality, setNetworkQuality] = useState<NetworkQuality>('high');
	const videoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Detect network quality
	useEffect(() => {
		const detectNetworkQuality = () => {
			// @ts-ignore - Network Information API
			const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
			
			if (connection) {
				const effectiveType = connection.effectiveType;
				
				if (effectiveType === '4g') {
					setNetworkQuality('high');
				} else if (effectiveType === '3g') {
					setNetworkQuality('medium');
				} else {
					setNetworkQuality('low');
				}
				
				// Listen for network changes
				connection.addEventListener('change', detectNetworkQuality);
			}
		};

		detectNetworkQuality();

		// Fallback: Detect based on device memory and hardware concurrency
		// @ts-ignore
		if (navigator.deviceMemory && navigator.deviceMemory < 4) {
			setNetworkQuality('medium');
		}
		// @ts-ignore
		if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
			setNetworkQuality('low');
		}

		return () => {
			// @ts-ignore
			const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
			if (connection) {
				connection.removeEventListener('change', detectNetworkQuality);
			}
		};
	}, []);

	const getOptimizedVideoUrl = (url: string, quality: NetworkQuality = networkQuality) => {
		// Adaptive quality based on network
		let transformations = '';
		
		switch (quality) {
			case 'high':
				transformations = 'w_720,q_auto:good,f_auto,br_2000k/';
				break;
			case 'medium':
				transformations = 'w_480,q_auto:low,f_auto,br_800k/';
				break;
			case 'low':
				transformations = 'w_360,q_50,f_auto,br_400k/';
				break;
		}
		
		return url.replace('/upload/', `/upload/${transformations}`);
	};

	const getPosterUrl = (url: string) => {
		return url.replace('/upload/', '/upload/w_400,q_auto,f_auto,so_0/').replace('.mp4', '.jpg');
	};

	const openReels = (index: number) => {
		setSelectedVideoIndex(index);
		setCurrentIndex(index);
	};

	const closeReels = () => {
		setSelectedVideoIndex(null);
		if (videoRef.current) {
			videoRef.current.pause();
		}
	};

	const goToNext = () => {
		if (currentIndex < products.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const goToPrevious = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const toggleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		setLiked(prev => ({ ...prev, [currentIndex]: !prev[currentIndex] }));
	};

	// Handle touch swipe
	const handleTouchStart = (e: React.TouchEvent) => {
		setTouchStart(e.targetTouches[0].clientY);
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		setTouchEnd(e.targetTouches[0].clientY);
	};

	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		
		const distance = touchStart - touchEnd;
		const isSwipeUp = distance > 50;
		const isSwipeDown = distance < -50;

		if (isSwipeUp && currentIndex < products.length - 1) {
			goToNext();
		}
		if (isSwipeDown && currentIndex > 0) {
			goToPrevious();
		}

		setTouchStart(0);
		setTouchEnd(0);
	};

	// Handle keyboard navigation
	useEffect(() => {
		if (selectedVideoIndex === null) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowUp') {
				e.preventDefault();
				goToPrevious();
			} else if (e.key === 'ArrowDown') {
				e.preventDefault();
				goToNext();
			} else if (e.key === 'Escape') {
				closeReels();
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [selectedVideoIndex, currentIndex]);

	// Auto-play current video
	useEffect(() => {
		if (selectedVideoIndex !== null && videoRef.current) {
			videoRef.current.play();
		}
	}, [currentIndex, selectedVideoIndex]);

	const currentProduct = selectedVideoIndex !== null ? products[currentIndex] : null;

	return (
		<section className="py-8 bg-background">
			<div className="container px-4">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-6">
					Gram-Worthy Looks
				</h2>

				{/* Scrollable Grid */}
				<div className="relative">
					<div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
						{products.map((product, index) => (
							<div
								key={product.id}
								onClick={() => openReels(index)}
								className="group relative flex-shrink-0 w-[140px] md:w-auto snap-start cursor-pointer"
							>
								{/* Product Card */}
								<div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
									<video
										src={getOptimizedVideoUrl(product.video)}
										poster={getPosterUrl(product.video)}
										autoPlay
										muted
										loop
										playsInline
										className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
									/>

									{/* Overlay Gradient */}
									<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />

									{/* Play Icon Overlay */}
									<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
										<div className="bg-white/30 backdrop-blur-sm p-3 rounded-full">
											<Play className="h-6 w-6 text-white fill-white" />
										</div>
									</div>

									{/* View Count Badge */}
									<div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium z-10">
										<Eye className="h-3.5 w-3.5" />
										{product.views}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Reels Viewer */}
			{selectedVideoIndex !== null && currentProduct && (
				<div 
					ref={containerRef}
					className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
				>
					{/* Close Button */}
					<button 
						onClick={closeReels}
						className="absolute top-4 left-4 text-white/80 hover:text-white transition-colors p-2 z-50"
					>
						<X className="h-6 w-6" />
					</button>
					
					{/* Video Container */}
					<div className="relative w-full h-full max-w-[500px] flex items-center justify-center">
						<video 
							ref={videoRef}
							key={currentIndex}
							src={getOptimizedVideoUrl(currentProduct.video)}
							poster={getPosterUrl(currentProduct.video)}
							autoPlay
							loop
							playsInline
							preload="auto"
							className="w-full h-full object-contain"
							onClick={(e) => {
								e.stopPropagation();
								if (videoRef.current) {
									if (videoRef.current.paused) {
										videoRef.current.play();
									} else {
										videoRef.current.pause();
									}
								}
							}}
						/>

						{/* Right Side Actions */}
						<div className="absolute right-4 bottom-20 flex flex-col gap-5 z-50">
							{/* Like Button */}
							<button 
								onClick={toggleLike}
								className="flex flex-col items-center gap-1 transition-transform active:scale-90"
							>
								<div className={cn(
									"p-2.5 rounded-full backdrop-blur-md transition-colors",
									liked[currentIndex] ? "bg-red-500/20" : "bg-black/30"
								)}>
									<Heart 
										className={cn(
											"h-6 w-6 transition-all",
											liked[currentIndex] 
												? "fill-red-500 text-red-500" 
												: "text-white"
										)} 
									/>
								</div>
								<span className="text-white text-xs font-medium drop-shadow-lg">
									{parseInt(currentProduct.likes) + (liked[currentIndex] ? 1 : 0)}
								</span>
							</button>

							{/* Views */}
							<div className="flex flex-col items-center gap-1">
								<div className="p-2.5 bg-black/30 rounded-full backdrop-blur-md">
									<Eye className="h-6 w-6 text-white" />
								</div>
								<span className="text-white text-xs font-medium drop-shadow-lg">
									{currentProduct.views}
								</span>
							</div>
						</div>

						{/* Progress Indicator */}
						<div className="absolute top-4 right-4 flex flex-col gap-1 z-50">
							{products.map((_, index) => (
								<div
									key={index}
									className={cn(
										"w-1 h-6 rounded-full transition-all",
										index === currentIndex 
											? "bg-white" 
											: "bg-white/30"
									)}
								/>
							))}
						</div>

						{/* Label */}
						{currentProduct.label && (
							<div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-md rounded-full z-50">
								<span className="text-white text-xs font-bold">
									{currentProduct.label}
								</span>
							</div>
						)}
					</div>
				</div>
			)}

			<style jsx global>{`
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
			`}</style>
		</section>
	);
}
