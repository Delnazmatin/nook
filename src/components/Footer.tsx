import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 md:gap-8 lg:px-8">
        <div>
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-zinc-950"
          >
            Cataloge
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600">
            A curated catalog for discovering products worth keeping.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">
            Contact us
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>
              <a
                href="mailto:hello@cataloge.com"
                className="transition-colors hover:text-zinc-950"
              >
                hello@cataloge.com
              </a>
            </li>
            <li>
              <a
                href="tel:+18005550199"
                className="transition-colors hover:text-zinc-950"
              >
                +1 (800) 555-0199
              </a>
            </li>
            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-zinc-950"
              >
                Contact page
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-zinc-950 uppercase">
            About
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-zinc-950"
              >
                Our story
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                className="transition-colors hover:text-zinc-950"
              >
                Products
              </Link>
            </li>
            <li>
              <p className="leading-6">
                Built for clarity on every screen — from phone to desktop.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-zinc-500 sm:px-6 sm:text-left lg:px-8">
          © {new Date().getFullYear()} Cataloge. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
