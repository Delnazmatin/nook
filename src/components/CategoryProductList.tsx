import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory, type ProductCategory } from "@/data/products";

type CategoryProductListProps = {
  category: ProductCategory;
  title: string;
  description: string;
};

export default function CategoryProductList({
  category,
  title,
  description,
}: CategoryProductListProps) {
  const products = getProductsByCategory(category);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/product" },
          { label: title },
        ]}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
          {description}
        </p>
        <div className="mt-12">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p className="text-base leading-7 text-zinc-600">
              No products in this category yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
