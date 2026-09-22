"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type CarouselImage = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  images: CarouselImage[];
  /** Berapa lama tiap gambar tampil penuh (ms), di luar durasi transisi */
  intervalMs?: number;
  /** Lama durasi fade in/out (ms) */
  fadeDurationMs?: number;
  className?: string;
};

export default function ImageCarousel({
  images,
  intervalMs = 4000,
  fadeDurationMs = 1000,
  className = "",
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;

    // Tahap 1: tampil penuh selama intervalMs, lalu mulai fade out
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);

      // Tahap 2: setelah fade out selesai, ganti gambar lalu fade in
      timeoutRef.current = setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % images.length);
        setIsVisible(true);
      }, fadeDurationMs);
    }, intervalMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [activeIndex, images.length, intervalMs, fadeDurationMs]);

  if (images.length === 0) return null;

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden rounded-xl bg-gray-100 ${className} z-0`}
    >
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          className=" object-cover z-0"
          style={{
            opacity: index === activeIndex && isVisible ? 1 : 0,
            transition: `opacity ${fadeDurationMs}ms ease-in-out`,
            pointerEvents: index === activeIndex ? "auto" : "none",
          }}
        />
      ))}

      {/* Indikator titik */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full transition-colors duration-300 object-center"
              style={{
                backgroundColor:
                  index === activeIndex
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
