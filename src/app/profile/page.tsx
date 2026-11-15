import type { Metadata } from "next";
import ProfilePanel from "@/components/ProfilePanel";

export const metadata: Metadata = {
  title: "Profile — Cataloge",
  description:
    "Create your Cataloge account in this browser, or sign in to see the details you saved.",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        Profile
      </h1>
      <p className="mt-4 text-base leading-7 text-zinc-600">
        Your account lives in this browser only. Register once, then sign in
        with your email and password to see your details again.
      </p>

      <div className="mt-10">
        <ProfilePanel />
      </div>
    </div>
  );
}
