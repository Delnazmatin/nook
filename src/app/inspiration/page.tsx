import Image from "next/image";
import Link from "next/link";
import story1Image from "@/picture/story1.jpg";
import story2Image from "@/picture/story2.jpg";
import story3Image from "@/picture/story3.jpg";

const inspirationShots = [
  {
    image: story1Image,
    alt: "Sage green sitting room with a blush velvet chair, brass bar cart, and plants",
    caption: "Sitting room — sage walls, blush velvet, and brass accents",
  },
  {
    image: story2Image,
    alt: "Oak dining table with candles and wildflowers beneath a wooden staircase",
    caption: "Dining nook — warm oak under the stairs, candles at dusk",
  },
  {
    image: story3Image,
    alt: "Minimal living room with a linen sofa facing full-height garden windows",
    caption: "Garden room — linen seating framed by full-height glass",
  },
];

export default function InspirationPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs font-medium tracking-[0.2em] text-amber-800 uppercase">
        Inspiration
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        Beautiful rooms
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
        A small collection of rooms we keep coming back to — light, texture, and
        pieces that grow quieter the longer you sit with them.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {inspirationShots.map((shot) => (
          <figure key={shot.caption} className="group">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
            <figcaption className="mt-3 text-sm leading-6 text-zinc-600">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12">
        <Link
          href="/product"
          className="inline-flex items-center justify-center border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
        >
          Browse the collection
        </Link>
      </div>
    </div>
  );
}
