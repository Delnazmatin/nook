import Image from "next/image";
import bannerImage from "@/picture/banner.jpg";

export default function Banner() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-label="Page banner"
    >
      <div className="relative h-[50vh] min-h-[20rem] w-full sm:h-[62vh] lg:h-[75vh]">
        <Image
          src={bannerImage}
          alt="Living room with a lounge chair, ottoman, and floor lamp"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
