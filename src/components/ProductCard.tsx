import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article>
      <Link
        href={`/product/${product.id}`}
        className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        </div>
        <div className="space-y-1 bg-linen px-4 py-4 text-left dark:bg-zinc-800">
          <h3 className="text-base font-medium tracking-wide text-zinc-950 dark:text-zinc-50">
            {product.name}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {product.category}
          </p>
          <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}
