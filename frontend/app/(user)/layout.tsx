import type { Metadata } from "next";
import "../globals.css";
import ImageCarousel from "@/components/ImageCarousel";

const images = [
  { src: "/cover-4.jpg", alt: "Deskripsi foto 1" },
  { src: "/cover-5.jpg", alt: "Deskripsi foto 2" },
  { src: "/cover-3.jpg", alt: "Deskripsi foto 3" },
];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return <div className="h-full w-full flex">{children}</div>;
}
