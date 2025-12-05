import { PRODUCTS } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  const filteredProducts = query
    ? PRODUCTS.filter((product) => {
        const name = product.name.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.name.toLowerCase();
        const fabric = product.fabric?.toLowerCase() || "";
        
        return (
          name.includes(query) ||
          description.includes(query) ||
          category.includes(query) ||
          fabric.includes(query)
        );
      })
    : [];

  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="font-display text-2xl md:text-3xl font-bold mb-6 text-[#591C21]">
        Search Results for "{q}"
      </h1>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found matching your search.</p>
          <Link href="/collections" className="text-primary hover:underline">
            Browse all collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#D4AF37]/20"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                {product.imageUrl ? (
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
                  {product.category.name}
                </p>
                <h3 className="font-display text-sm font-bold text-[#2C1810] mb-1 group-hover:text-[#591C21] transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="flex items-center text-[10px] font-medium text-[#591C21] mt-2">
                  View Details <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
