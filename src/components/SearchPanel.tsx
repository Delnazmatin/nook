"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { formatPrice } from "@/lib/formatPrice";
import { products, type Product } from "@/data/products";

const MAX_RESULTS = 6;

type SearchPanelProps = {
  autoFocus?: boolean;
  onClose: () => void;
};

function matchesQuery(product: Product, query: string): boolean {
  const haystack = [
    product.name,
    product.category,
    product.material,
    ...product.colors.map((color) => color.name),
  ];

  return haystack.some((value) => value.toLowerCase().includes(query));
}

export default function SearchPanel({
  autoFocus = false,
  onClose,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();
  const visibleQuery = query.trim();

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return products.filter((product) => matchesQuery(product, normalizedQuery));
  }, [normalizedQuery]);

  const shownResults = results.slice(0, MAX_RESULTS);
  const remainingCount = results.length - shownResults.length;

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  return (
    <div role="search" aria-label="Product search">
      <label className="sr-only" htmlFor="site-search">
        Search products
      </label>
      <div className="relative">
        <FiSearch
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
        />
        <input
          id="site-search"
          ref={inputRef}
          type="search"
          value={query}
          autoComplete="off"
          placeholder="Search products…"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
          className="h-11 w-full rounded-lg border border-zinc-200 bg-white pr-3 pl-9 text-sm text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500"
        />
      </div>

      <p role="status" className="sr-only">
        {normalizedQuery
          ? results.length > 0
            ? `${results.length} products found`
            : "No products found"
          : ""}
      </p>

      {!normalizedQuery ? (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Search sofas, tables, lighting…
        </p>
      ) : results.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          No products match “{visibleQuery}”.
        </p>
      ) : (
        <>
          <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800">
            {shownResults.map((product) => (
              <li key={product.id}>
                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="group hover:bg-linen flex items-center gap-3 rounded-md px-2 py-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 dark:hover:bg-zinc-800"
                >
                  <div className="relative size-14 shrink-0 overflow-hidden bg-zinc-100">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-950 dark:text-zinc-50">
                      {product.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {product.category}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                    {formatPrice(product.price)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          {remainingCount > 0 ? (
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Showing {shownResults.length} of {results.length} matches
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}
