"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  gallery: StaticImageData[];
  alt: string;
};

export default function ProductGallery({ gallery, alt }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex];

  return (
    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[88px_1fr] lg:items-start lg:gap-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-zinc-100">
        <Image
          src={activeImage}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1 lg:order-first lg:flex-col lg:overflow-visible lg:pb-0">
        {gallery.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              type="button"
              aria-label={`View image ${index + 1} of ${gallery.length}`}
              aria-pressed={isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-zinc-100 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                isActive
                  ? "ring-2 ring-zinc-950"
                  : "ring-1 ring-zinc-200 hover:ring-zinc-400"
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="88px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
