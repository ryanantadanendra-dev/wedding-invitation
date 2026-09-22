"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type ScrollAnimationProps = {
  children: ReactNode;
  className?: string;
  /** Arah gerakan mengikuti scroll */
  direction?: "up" | "down" | "left" | "right";
  /**
   * Seberapa kuat efeknya. 0.5 = bergerak setengah kecepatan scroll,
   * 1 = sama kecepatan scroll, 2 = dua kali lebih cepat dari scroll.
   */
  speed?: number;
};

export default function ScrollAnimation({
  children,
  className = "",
  direction = "up",
  speed = 0.3,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;

    const updateOffset = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const distanceFromCenter =
        rect.top + rect.height / 2 - viewportHeight / 2;

      setOffset(distanceFromCenter * speed);
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateOffset);
    };

    updateOffset(); // posisi awal saat mount

    // { capture: true } penting: event "scroll" tidak bubble, tapi dengan
    // capture, window tetap bisa "menangkap" scroll dari elemen manapun
    // di dalam dokumen (misal <main> yang overflow-y-auto sendiri),
    // tanpa perlu tahu persis elemen mana yang scroll atau kapan
    // overflow-nya berubah (misal habis Cover ditutup).
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll, { capture: true });
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  const transformByDirection: Record<typeof direction, string> = {
    up: `translateY(${-offset}px)`,
    down: `translateY(${offset}px)`,
    left: `translateX(${-offset}px)`,
    right: `translateX(${offset}px)`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: transformByDirection[direction],
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
