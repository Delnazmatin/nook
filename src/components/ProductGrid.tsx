import type { ReactNode } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

type ProductGridProps = {
  products: Product[];
  renderOverlay?: (product: Product) => ReactNode;
};

export default function ProductGrid({
  products,
  renderOverlay,
}: ProductGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
      {products.map((product) => (
        <li key={product.id} className="relative">
          <ProductCard product={product} />
          {renderOverlay ? (
            <div className="absolute top-3 right-3 z-10">
              {renderOverlay(product)}
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
