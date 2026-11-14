import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

export default function ProductPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        Products
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
        Browse the full collection of furniture and lighting for every room.
      </p>
      <div className="mt-12">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
