import type { Metadata } from "next";
import CategoryProductList from "@/components/CategoryProductList";
import { getCategoryByLabel } from "@/data/categories";

const category = getCategoryByLabel("Bedroom");

export const metadata: Metadata = {
  title: `${category.title} — Cataloge`,
  description: category.description,
};

export default function BedroomPage() {
  return (
    <CategoryProductList
      category={category.label}
      title={category.title}
      description={category.description}
    />
  );
}
