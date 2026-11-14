import Image from "next/image";
import Link from "next/link";
import story1Image from "@/picture/story1.jpg";
import story2Image from "@/picture/story2.jpg";

const inspirationShots = [
  {
    image: story1Image,
    alt: "Sage green sitting room with a blush velvet chair and brass bar cart",
    className: "",
  },
  {
    image: story2Image,
    alt: "Oak dining table with candles and wildflowers beneath a wooden staircase",
    className: "mt-8 sm:mt-12",
  },
];

export default function RoomInspiration() {
  return (
    <section className="bg-sand w-full" aria-label="Room inspiration">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-amber-800 uppercase">
            The idea
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            A room should feel like a story you already live in
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-zinc-700">
            Start with one piece you love, then let light, texture, and quiet
            space do the rest. Our curators pair warm woods with soft fabrics to
            turn everyday corners into rooms worth lingering in.
          </p>
          <Link
            href="/inspiration"
            className="mt-8 inline-flex items-center justify-center border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            Explore More
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {inspirationShots.map((shot) => (
            <div
              key={shot.alt}
              className={`relative aspect-[3/4] w-full overflow-hidden rounded-md border border-zinc-200/70 bg-white/50 ${shot.className}`}
            >
              <Image
                src={shot.image}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 45vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
