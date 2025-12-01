'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const products = [
	{
		id: 1,
		name: 'Cream Georgette Hand Embroidered Beads Work Pre...',
		views: 53,
		image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?w=400',
		label: '1 CINEMAS NOVEMBER 14'
	},
	{
		id: 2,
		name: 'Cream Georgette Hand Embroidered Beads Work Pre...',
		views: 80,
		image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400',
		label: 'RAIR'
	},
	{
		id: 3,
		name: 'Red Silk Zardosi Hand Embroidered Sharara Suit',
		views: 81,
		image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
		label: 'RAIR'
	},
	{
		id: 4,
		name: 'Blue Faux Georgette Sequins Lehenga',
		views: 357,
		image: 'https://images.unsplash.com/photo-1583391733958-e023765f350a?w=400',
		label: 'RAIR'
	},
	{
		id: 5,
		name: 'Light Pink Organza Digital Print Hand Embroidered...',
		views: 229,
		image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400',
		label: 'RAIR'
	},
	{
		id: 6,
		name: 'Pink Organza Zari Hand Embroidered Sequins With Mirro...',
		views: 184,
		image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
		label: 'RAIR'
	}
];

export default function GramWorthyLooks() {
	return (
		<section className="py-6 md:py-8 bg-background">
			<div className="container px-4">
				<h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-6">
					Gram-Worthy Looks
				</h2>

				{/* Scrollable Grid */}
				<div className="relative">
					<div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
						{products.map((product) => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								className="group relative flex-shrink-0 w-[160px] md:w-auto snap-start"
							>
								{/* Product Card */}
								<div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
									<Image
										src={product.image}
										alt={product.name}
										fill
										className="object-cover group-hover:scale-105 transition-transform duration-300"
									/>

									{/* View Count Badge */}
									<div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-[10px] font-medium">
										<Eye className="h-2.5 w-2.5" />
										{product.views}
									</div>

									{/* Label Badge */}
									<div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-medium">
										{product.label}
									</div>

									{/* Product Name Overlay */}
									<div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-2">
										<p className="text-white text-xs font-medium line-clamp-2">
											{product.name}
										</p>
									</div>
								</div>
							</Link>
						))}
					</div>

					{/* Scroll Arrow (Mobile Only) */}
					<button
						className="md:hidden absolute -right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center"
						aria-label="Scroll right"
					>
						<ChevronRight className="h-4 w-4 text-foreground" />
					</button>
				</div>
			</div>

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
