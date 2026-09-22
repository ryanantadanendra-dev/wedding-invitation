import type { Metadata } from "next";
import "../globals.css";
import ImageCarousel from "@/components/ImageCarousel";

const images = [
  { src: "/cover-4.jpg", alt: "Deskripsi foto 1" },
  { src: "/cover-5.jpg", alt: "Deskripsi foto 2" },
  { src: "/cover-3.jpg", alt: "Deskripsi foto 3" },
];

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="h-full w-full flex">
      <section className="hidden lg:block flex-1 w-full h-full relative">
        <div className="absolute bottom-0 right-4 text-background z-70">
          <p className="text-end text-[20px]">The Wedding oF</p>
          <h1 className="font-tangerine font-bold text-[48px]">
            Surya & Trisna
          </h1>
        </div>
        <div className="carousel-overlay " />
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
      </section>
      {children}
    </div>
  );
}
