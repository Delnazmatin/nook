import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import aboutImage from "@/picture/about.jpg";

export const metadata: Metadata = {
  title: "About — Cataloge",
  description:
    "Cataloge curates well-made furniture for living, dining, and bedroom spaces — chosen for materials, proportion, and how it lives in a room.",
};

const values = [
  {
    title: "Materials",
    description:
      "Solid wood, natural fibres, and finishes that age into a room rather than wear out of it.",
  },
  {
    title: "Craft",
    description:
      "Made in small batches by workshops we know, with joinery and upholstery you can feel.",
  },
  {
    title: "Service",
    description:
      "Honest photography, clear dimensions, and people who answer when you write to them.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="w-full" aria-label="About Cataloge">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-amber-800 uppercase">
              Our story
            </p>
            <h1 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              About us
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-zinc-700">
              Cataloge began with a simple frustration: finding furniture that
              is well made, quietly beautiful, and built to stay in a home for
              years took far too much searching.
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-zinc-700">
              So we curate instead of pile up. Every sofa, table, and bed we
              carry is chosen for its materials, its proportions, and the way it
              settles into a room — from warm oak dining tables to deep-seated
              lounge chairs.
            </p>
            <p className="mt-4 max-w-md text-base leading-7 text-zinc-700">
              We work with a small circle of workshops, photograph each piece in
              real rooms, and keep the details honest, so you can furnish a
              space with things you will still want a decade from now.
            </p>
            <Link
              href="/product"
              className="mt-8 inline-flex items-center justify-center border border-zinc-950 px-8 py-3 text-sm font-medium tracking-wide text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
            >
              Browse the collection
            </Link>
          </div>

          <div className="bg-linen relative aspect-[3/4] w-full overflow-hidden rounded-md border border-zinc-200/70">
            <Image
              src={aboutImage}
              alt="Olive green sofa with pale yellow cushions in front of a fluted green arched wall, lit by a black arc floor lamp"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand w-full" aria-label="What we look for">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-xs font-medium tracking-[0.2em] text-amber-800 uppercase">
            What we look for
          </p>
          <h2 className="mt-4 max-w-lg text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            Three things decide whether a piece makes the catalog
          </h2>

          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {values.map((value) => (
              <li
                key={value.title}
                className="border-t border-zinc-950/15 pt-5"
              >
                <h3 className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-700 sm:text-base sm:leading-7">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
