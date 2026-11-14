import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import bedRoomImage from "@/picture/bedRoom.jpg";
import diningRoomImage from "@/picture/diningRoom.jpg";
import livingRoomImage from "@/picture/livingRoom.jpg";

type RoomCategory = {
  href: string;
  label: string;
  image: StaticImageData;
  alt: string;
};

const rooms: RoomCategory[] = [
  {
    href: "/dining",
    label: "Dining",
    image: diningRoomImage,
    alt: "Dining room with table and chairs",
  },
  {
    href: "/living",
    label: "Living",
    image: livingRoomImage,
    alt: "Living room with sofa and seating",
  },
  {
    href: "/bedroom",
    label: "Bedroom",
    image: bedRoomImage,
    alt: "Bedroom with bed and soft lighting",
  },
];

export default function RoomCategories() {
  return (
    <section
      className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      aria-label="Shop by room"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {rooms.map((room) => (
          <Link
            key={room.href}
            href={room.href}
            className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-950"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-zinc-200 bg-zinc-100">
              <Image
                src={room.image}
                alt={room.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </div>
            <p className="mt-4 text-center text-base font-medium tracking-wide text-zinc-950 sm:text-lg">
              {room.label}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
