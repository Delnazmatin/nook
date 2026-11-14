"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { FiHeart, FiMenu, FiSearch, FiUser, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

type IconActionProps = {
  label: string;
  children: ReactNode;
};

function IconAction({ label, children }: IconActionProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className="rounded-md p-2 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
    >
      {children}
    </button>
  );
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-xl font-semibold tracking-tight text-zinc-950"
        >
          Cataloge <span className="text-gold text-sm">Logo</span>
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">
            <IconAction label="Search">
              <FiSearch className="size-5" aria-hidden />
            </IconAction>
            <IconAction label="Favorites">
              <FiHeart className="size-5" aria-hidden />
            </IconAction>
            <IconAction label="Profile">
              <FiUser className="size-5" aria-hidden />
            </IconAction>
          </div>

          <button
            type="button"
            className="ml-1 rounded-md p-2 text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <FiX className="size-5" aria-hidden />
            ) : (
              <FiMenu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-zinc-200 bg-white md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
