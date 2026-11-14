import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { featuredProducts } from "@/data/products";

export default function FeaturedProducts() {
  return (
    <section
      className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-label="Items for sale"
    >
      <div className="mx-auto w-full max-w-6xl">
        <ProductGrid products={featuredProducts} />
        <div className="mt-12 flex justify-center">
          <Link
            href="/product"
            className="inline-flex items-center justify-center border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            Show more
          </Link>
        </div>
      </div>
    </section>
  );
}
