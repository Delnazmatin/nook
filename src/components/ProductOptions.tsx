"use client";

import { useState } from "react";
import type { ProductColor } from "@/data/products";

type ProductOptionsProps = {
  sizes: string[];
  colors: ProductColor[];
};

export default function ProductOptions({ sizes, colors }: ProductOptionsProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-zinc-950">Size</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = size === selectedSize;

            return (
              <button
                key={size}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950 ${
                  isSelected
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-500"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-zinc-950">
          Color
          <span className="ml-2 font-normal text-zinc-500">
            — {selectedColor.name}
          </span>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {colors.map((color) => {
            const isSelected = color === selectedColor;

            return (
              <div key={color.name} className="group relative">
                <button
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Color: ${color.name}`}
                  onClick={() => setSelectedColor(color)}
                  className={`block size-9 rounded-full ring-offset-2 transition-shadow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950 ${color.swatchClassName} ${
                    isSelected
                      ? "ring-2 ring-zinc-950"
                      : "ring-1 ring-zinc-300 group-hover:ring-zinc-500"
                  }`}
                />
                <span className="pointer-events-none invisible absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-zinc-950 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-has-focus-visible:visible group-has-focus-visible:opacity-100">
                  {color.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
