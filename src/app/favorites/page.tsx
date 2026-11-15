import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "Favorites — Cataloge",
  description: "The pieces you have saved from the Cataloge collection.",
};

export default function FavoritesPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Favorites" }]}
      />
      <FavoritesList />
    </>
  );
}
