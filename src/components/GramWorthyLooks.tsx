'use client';

import { useState } from 'react';
import { Eye, X, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const products = [
	{
		id: 1,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764844684/1204_3_kfqdjr.mp4',
		views: '1.2k',
		label: 'TRENDING'
	},
	{
		id: 2,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843542/1204_rte4wb.mp4',
		views: '856',
		label: 'NEW'
	},
	{
		id: 3,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843645/1203_1_anhqwu.mp4',
		views: '2.1k',
		label: 'POPULAR'
	},
	{
		id: 4,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843709/1203_sipbrs.mp4',
		views: '3.5k',
		label: 'BESTSELLER'
	},
	{
		id: 5,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764843873/1204_1_idw9jv.mp4',
		views: '942',
		label: 'LATEST'
	},
	{
		id: 6,
		video: 'https://res.cloudinary.com/dgs35slge/video/upload/v1764844048/1204_2_aporsf.mp4',
		views: '1.5k',
		label: 'FEATURED'
	}
];

export default function GramWorthyLooks() {
	const [selectedVideo, setSelectedVideo] = useState<typeof products[0] | null>(null);

	return (
		<section className="py-8 bg-background">
			<div className="container px-4">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-6">
					Gram-Worthy Looks
				</h2>

				{/* Scrollable Grid */}
				<div className="relative">
					<div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
						{products.map((product) => (
							<div
								key={product.id}
								onClick={() => setSelectedVideo(product)}
								className="group relative flex-shrink-0 w-[140px] md:w-auto snap-start cursor-pointer"
							>
								{/* Product Card */}
								<div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
									<video
										src={product.video}
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

			{/* Video Modal */}
			{selectedVideo && (
				<div 
					className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200" 
					onClick={() => setSelectedVideo(null)}
				>
					<button 
						onClick={() => setSelectedVideo(null)}
						className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-2 bg-black/20 rounded-full backdrop-blur-md z-50"
					>
						<X className="h-8 w-8" />
					</button>
					
					<div 
						className="relative w-full max-w-[350px] aspect-[9/16] bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 ring-1 ring-white/10" 
						onClick={e => e.stopPropagation()}
					>
						<video 
							src={selectedVideo.video} 
							autoPlay 
							controls 
							playsInline
							className="w-full h-full object-cover"
						/>
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
