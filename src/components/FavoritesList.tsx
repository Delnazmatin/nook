"use client";

import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import FavoriteButton from "@/components/FavoriteButton";
import ProductGrid from "@/components/ProductGrid";
import { useFavorites } from "@/context/FavoritesContext";
import { getProductById, type Product } from "@/data/products";

export default function FavoritesList() {
  const { favorites, isReady, clearFavorites } = useFavorites();

  const products: Product[] = favorites
    .map((id) => getProductById(id))
    .filter((product): product is Product => product !== undefined);

  const hasProducts = isReady && products.length > 0;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Favorites
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
            {hasProducts
              ? `${products.length} saved ${products.length === 1 ? "piece" : "pieces"}. They stay here on this device until you remove them.`
              : "The pieces you like are kept here on this device."}
          </p>
        </div>

        {hasProducts ? (
          <button
            type="button"
            aria-label="Remove all saved products from favorites"
            onClick={clearFavorites}
            className="text-sm font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            Clear all
          </button>
        ) : null}
      </div>

      {!isReady ? (
        <div className="mt-12 min-h-40" aria-hidden />
      ) : hasProducts ? (
        <div className="mt-12">
          <ProductGrid
            products={products}
            renderOverlay={(product) => (
              <FavoriteButton
                productId={product.id}
                productName={product.name}
              />
            )}
          />
        </div>
      ) : (
        <div className="mx-auto mt-16 flex max-w-xl flex-col items-center text-center">
          <span className="bg-sand text-gold flex size-14 items-center justify-center rounded-full">
            <FiHeart aria-hidden className="size-6" />
          </span>
          <h2 className="mt-6 text-xl font-semibold tracking-tight text-zinc-950">
            No favorites yet
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-600">
            Open any product and tap the heart to save it here for later.
          </p>
          <Link
            href="/product"
            className="mt-8 inline-flex items-center justify-center border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            Browse products
          </Link>
        </div>
      )}
    </div>
  );
}
