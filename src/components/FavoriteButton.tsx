"use client";

import { FiHeart } from "react-icons/fi";
import { useFavorites } from "@/context/FavoritesContext";

type FavoriteButtonProps = {
  productId: string;
  productName?: string;
  variant?: "icon" | "inline";
};

export default function FavoriteButton({
  productId,
  productName,
  variant = "icon",
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isReady } = useFavorites();
  const isLiked = isReady && isFavorite(productId);

  const fallbackLabel = isLiked ? "Remove from favorites" : "Add to favorites";
  const label = productName
    ? isLiked
      ? `Remove ${productName} from favorites`
      : `Like ${productName}`
    : fallbackLabel;

  const stateClassName = isLiked
    ? "border-gold/40 bg-sand text-gold"
    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-linen hover:text-zinc-950";

  if (variant === "inline") {
    return (
      <button
        type="button"
        aria-pressed={isLiked}
        aria-label={label}
        disabled={!isReady}
        onClick={() => toggleFavorite(productId)}
        className={`inline-flex items-center justify-center gap-2 border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 disabled:cursor-not-allowed disabled:opacity-60 ${stateClassName}`}
      >
        <FiHeart
          aria-hidden
          className={`size-4 ${isLiked ? "fill-current" : ""}`}
        />
        {isLiked ? "Saved" : "Add to favorites"}
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={isLiked}
      aria-label={label}
      title={label}
      disabled={!isReady}
      onClick={() => toggleFavorite(productId)}
      className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 ${stateClassName}`}
    >
      <FiHeart
        aria-hidden
        className={`size-5 transition-transform ${isLiked ? "scale-110 fill-current" : ""}`}
      />
    </button>
  );
}
