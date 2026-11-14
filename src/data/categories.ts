import type { StaticImageData } from "next/image";
import { roomImages } from "@/data/images";
import type { ProductCategory } from "@/data/products";

export type CategorySlug = "living" | "dining" | "bedroom";

export type Category = {
  slug: CategorySlug;
  label: ProductCategory;
  href: string;
  title: string;
  description: string;
  cover: StaticImageData;
  alt: string;
};

export const categories: Category[] = [
  {
    slug: "living",
    label: "Living",
    href: "/living",
    title: "Living",
    description:
      "Explore living room pieces — seating, tables, and accents for everyday gathering.",
    cover: roomImages.Living.cover,
    alt: "Living room with a low sofa, rattan pendants, and green plants",
  },
  {
    slug: "dining",
    label: "Dining",
    href: "/dining",
    title: "Dining",
    description:
      "Explore dining room pieces — tables, chairs, and settings for shared meals.",
    cover: roomImages.Dining.cover,
    alt: "Dining room with a round wooden table and upholstered chairs",
  },
  {
    slug: "bedroom",
    label: "Bedroom",
    href: "/bedroom",
    title: "Bedroom",
    description:
      "Explore bedroom pieces — beds, storage, and lighting for restful spaces.",
    cover: roomImages.Bedroom.cover,
    alt: "Bedroom with an upholstered bed and warm overhead lighting",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getCategoryByLabel(label: ProductCategory): Category {
  return (
    categories.find((category) => category.label === label) ?? categories[0]
  );
}
