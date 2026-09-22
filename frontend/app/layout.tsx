import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import { Tangerine } from "next/font/google";
import "./globals.css";
import ImageCarousel from "@/components/ImageCarousel";

const tangerine = Tangerine({
  variable: "--font-tangerine",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const bodoni_moda = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Surya & Trisna",
  description:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu pada hari pernikahan kami. Lihat jadwal acara dan galeri momen bahagia kami di sini.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${tangerine.variable} ${bodoni_moda.variable} w-full h-full overflow-hidden antialiased`}
    >
      <body className="h-full w-full flex">{children}</body>
    </html>
  );
}
