import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-sand w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li
              key={item.href ?? item.label}
              className="flex min-w-0 items-center gap-2"
            >
              {index > 0 ? (
                <FiChevronRight
                  aria-hidden
                  className="size-4 shrink-0 text-zinc-400"
                />
              ) : null}
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-950 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  title={item.label}
                  className="block max-w-[14rem] truncate font-medium text-zinc-500 sm:max-w-none"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
