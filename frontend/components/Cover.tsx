"use client";

import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { useSearchParams } from "next/navigation";

type CoverProps = {
  onOpen?: () => void;
  onOpened?: () => void;
};

export default function Cover({ onOpen, onOpened }: CoverProps) {
  const images = [
    { src: "/cover-1.jpg", alt: "Deskripsi foto 1" },
    { src: "/cover-2.jpg", alt: "Deskripsi foto 2" },
    { src: "/cover-3.jpg", alt: "Deskripsi foto 3" },
  ];

  const searchParams = useSearchParams();
  const nama = searchParams.get("to");

  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  // --- state untuk loading screen ---
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOut, setIsLoadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const OPEN_DURATION_MS = 900;
  const LOADER_FADE_MS = 500;
  const LOADER_DURATION_MS = 5500; // total durasi progress, 5-6 detik

  // Progress berjalan dari 0 -> 100 selama LOADER_DURATION_MS,
  // lalu fade-out sebelum cover ditampilkan.
  useEffect(() => {
    let isMounted = true;
    const startedAt = Date.now();

    const tick = () => {
      if (!isMounted) return;
      const elapsed = Date.now() - startedAt;
      const pct = Math.min((elapsed / LOADER_DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setIsLoadingOut(true);
        window.setTimeout(() => {
          if (!isMounted) return;
          setIsLoading(false);
        }, LOADER_FADE_MS);
      }
    };

    const raf = requestAnimationFrame(tick);

    return () => {
      isMounted = false;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    if (isOpening || isOpened) return;

    // panggil di sini (bukan di setTimeout) supaya masih dianggap
    // user gesture oleh browser, jadi audio.play() tidak diblokir
    onOpen?.();

    setIsOpening(true);

    window.setTimeout(() => {
      setIsOpened(true);
      onOpened?.();
    }, OPEN_DURATION_MS);
  };

  if (isOpened) return null;

  return (
    <>
      {isLoading && (
        <div
          className="fixed z-[200] inset-0 flex flex-col items-center justify-center gap-5 bg-body px-10"
          style={{
            opacity: isLoadingOut ? 0 : 1,
            transition: `opacity ${LOADER_FADE_MS}ms ease-in-out`,
            pointerEvents: isLoadingOut ? "none" : "auto",
          }}
        >
          <p className="font-tangerine text-[36px] text-accent tracking-wide">
            Surya &amp; Trisna
          </p>

          <div className="w-[220px] h-[2px] bg-accent/20 overflow-hidden">
            <div
              className="h-full bg-accent"
              style={{
                width: `${progress}%`,
                transition: "width 100ms linear",
              }}
            />
          </div>

          <p className="text-[12px] font-bodoni tracking-[0.2em] text-accent/80">
            {Math.floor(progress)}%
          </p>
        </div>
      )}

      <div
        className=" fixed z-100 inset-0"
        style={{
          transform: isOpening ? "translateY(-100%)" : "translateY(0)",
          opacity: isOpening ? 0 : 1,
          transition: `transform ${OPEN_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${OPEN_DURATION_MS}ms ease-in`,
        }}
      >
        <div className="cover-overlay z-10  flex flex-col justify-center items-center gap-7 fixed  inset-0">
          <div className="text-background">
            <h1 className="font-tangerine text-[32px]  text-center leading-11">
              Kepada Yth <br /> Bapak/Ibu/Saudara/i
              <br />{" "}
              <span className="font-bold">
                {nama !== null ? nama : "Tamu Yang Terhormat"}
              </span>
            </h1>
          </div>
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="w-[343px] h-[62px] mx-auto bg-transparent border border-background text-background rounded-lg transition-opacity duration-300 disabled:opacity-60"
          >
            {isOpening ? "Membuka..." : "Open Invitation"}
          </button>
        </div>
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
      </div>
    </>
  );
}
