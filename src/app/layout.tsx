import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ProfileProvider } from "@/context/ProfileContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cataloge",
  description: "Cataloge — a Next.js catalog application.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <FavoritesProvider>
          <ProfileProvider>
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </ProfileProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
