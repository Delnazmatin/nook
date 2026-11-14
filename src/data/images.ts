import type { StaticImageData } from "next/image";

import bed1Image from "@/picture/bed/bed1.jpg";
import bed2Image from "@/picture/bed/bed2.jpg";
import bed3Image from "@/picture/bed/bed3.jpg";
import bed4Image from "@/picture/bed/bed4.jpg";
import bed5Image from "@/picture/bed/bed5.jpg";
import bed6Image from "@/picture/bed/bed6.jpg";
import bed7Image from "@/picture/bed/bed7.jpg";
import bed8Image from "@/picture/bed/bed8.jpg";
import dining1Image from "@/picture/dining/dining1.jpg";
import dining2Image from "@/picture/dining/dining2.jpg";
import dining3Image from "@/picture/dining/dining3.jpg";
import dining4Image from "@/picture/dining/dining4.jpg";
import dining5Image from "@/picture/dining/dining5.jpg";
import dining6Image from "@/picture/dining/dining6.jpg";
import dining7Image from "@/picture/dining/dining7.jpg";
import dining8Image from "@/picture/dining/dining8.jpg";
import dining9Image from "@/picture/dining/dining9.jpg";
import dining10Image from "@/picture/dining/dining10.jpg";
import living1Image from "@/picture/living/living1.jpg";
import living2Image from "@/picture/living/living2.jpg";
import living3Image from "@/picture/living/living3.jpg";
import living4Image from "@/picture/living/living4.jpg";
import living5Image from "@/picture/living/living5.jpg";
import living6Image from "@/picture/living/living6.jpg";
import living7Image from "@/picture/living/living7.jpg";
import living8Image from "@/picture/living/living8.jpg";

export type RoomKey = "Living" | "Dining" | "Bedroom";

export type RoomImageSet = {
  cover: StaticImageData;
  gallery: StaticImageData[];
};

export type ProductImageSet = {
  image: StaticImageData;
  gallery: StaticImageData[];
};

export const roomImages: Record<RoomKey, RoomImageSet> = {
  Living: {
    cover: living8Image,
    gallery: [
      living1Image,
      living2Image,
      living3Image,
      living4Image,
      living5Image,
      living6Image,
      living7Image,
      living8Image,
    ],
  },
  Dining: {
    cover: dining9Image,
    gallery: [
      dining1Image,
      dining2Image,
      dining3Image,
      dining4Image,
      dining5Image,
      dining6Image,
      dining7Image,
      dining8Image,
      dining9Image,
      dining10Image,
    ],
  },
  Bedroom: {
    cover: bed8Image,
    gallery: [
      bed1Image,
      bed2Image,
      bed3Image,
      bed4Image,
      bed5Image,
      bed6Image,
      bed7Image,
      bed8Image,
    ],
  },
};

// Returns a cover plus a small gallery, where gallery[0] is always the cover.
export function getProductImages(
  room: RoomKey,
  startIndex = 0,
  count = 3,
): ProductImageSet {
  const { gallery } = roomImages[room];
  const images = Array.from(
    { length: Math.min(count, gallery.length) },
    (_, offset) => gallery[(startIndex + offset) % gallery.length],
  );

  return { image: images[0], gallery: images };
}
