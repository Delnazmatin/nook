import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import Breadcrumbs from "@/components/Breadcrumbs";
import FavoriteButton from "@/components/FavoriteButton";
import ProductGallery from "@/components/ProductGallery";
import ProductOptions from "@/components/ProductOptions";
import { categoryRoutes, getProductById, productIds } from "@/data/products";
import { formatPrice } from "@/lib/formatPrice";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams(): { id: string }[] {
  return productIds.map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} — Cataloge`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/product" },
          {
            label: product.category,
            href: categoryRoutes[product.category] ?? "/product",
          },
          { label: product.name },
        ]}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Link
          href="/product"
          className="inline-flex w-fit items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        >
          <FiChevronLeft aria-hidden className="size-4" />
          All products
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery gallery={product.gallery} alt={product.alt} />

          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-amber-800 uppercase">
                {product.category}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center justify-between gap-4">
                <p className="text-lg font-medium text-zinc-950">
                  {formatPrice(product.price)}
                </p>
                <FavoriteButton
                  productId={product.id}
                  productName={product.name}
                />
              </div>
            </div>

            <p className="max-w-prose text-base leading-7 text-zinc-600">
              {product.description}
            </p>

            <ProductOptions sizes={product.sizes} colors={product.colors} />

            <dl className="grid grid-cols-1 gap-4 border-t border-zinc-200 pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-zinc-500">Material</dt>
                <dd className="mt-1 font-medium text-zinc-950">
                  {product.material}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Availability</dt>
                <dd className="mt-1 font-medium text-zinc-950">
                  {product.inStock ? "In stock" : "Made to order"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
