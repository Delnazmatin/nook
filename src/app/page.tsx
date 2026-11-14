import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import RoomCategories from "@/components/RoomCategories";
import RoomInspiration from "@/components/RoomInspiration";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Banner />
      <RoomCategories />
      <FeaturedProducts />
      <RoomInspiration />
    </div>
  );
}
