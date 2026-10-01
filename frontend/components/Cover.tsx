"use client";

import { useEffect, useState } from "react";
import ImageCarousel from "./ImageCarousel";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

type CoverProps = {
  onOpen?: () => void;
  onOpened?: () => void;
};

export default function Cover({ onOpen, onOpened }: CoverProps) {
  const images = [
    {
      src: "/asset-webp/image-10.webp",
      alt: "Pre-Wedding Photo",
      position: "object-[80%_30%]",
    },
    {
      src: "/asset-webp/image-8.webp",
      alt: "Pre-Wedding Photo",
      position: "object-[30%_38%]",
    },
    {
      src: "/asset-webp/image-14.webp",
      alt: "Pre-Wedding Photo",
      position: "object-[50%_20%]",
    },
    {
      src: "/asset-webp/image-13.webp",
      alt: "Pre-Wedding Photo",
      position: "object-[50%_23%]",
    },
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
          className="fixed z-[200] inset-0 flex flex-col items-center justify-center gap-2 bg-body px-10"
          style={{
            opacity: isLoadingOut ? 0 : 1,
            transition: `opacity ${LOADER_FADE_MS}ms ease-in-out`,
            pointerEvents: isLoadingOut ? "none" : "auto",
          }}
        >
          <Image
            src="/asset-webp/image-1.webp"
            alt="Pre-wedding Picture"
            width={100}
            height={100}
            className="w-28 h-44 aspect-square"
          />
          <p className="tracking-[0.5rem] text-[12px] text-background mt-8">
            The Wedding Of
          </p>
          <p className="font-tangerine text-[48px] text-background tracking-wide">
            Surya &amp; Trisna
          </p>

          <p className="text-[20px] font-bodoni tracking-[0.2em] text-background/80">
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
        <div className="cover-overlay z-10  flex flex-col justify-around items-center gap-7 fixed  inset-0 text-background text-center">
          <div className="text-background">
            <p className="md:text-[24px] text-[18px] font-light">
              Awal dari Selamanya
            </p>
            <h2 className="font-tangerine text-[52px] md:text-[64px] font-bold">
              Surya & Trisna
            </h2>
            <p className="md:text-[20px] text-[18px] font-bodoni font-bold">
              Senin, 19 Oktober 2026
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <h1 className="font-bodoni text-[16px]  md:text-[20px]  text-center leading-11">
              Kepada Yth Bapak/Ibu/Saudara/i
              <br />{" "}
              <span className="font-bold font-tangerine text-[44px] md:text-[52px]">
                {nama !== null ? nama : "Tamu Yang Terhormat"}
              </span>
            </h1>
            <p className="text-[14px] px-2 md:px-0 md:text-[20px]">
              Mohon maaf bila ada kesalahan penulisan nama/gelar.
            </p>
            <button
              onClick={handleOpen}
              disabled={isOpening}
              className="w-[250px] h-[62px] mx-auto bg-background text-heading rounded-lg transition-opacity duration-300 disabled:opacity-60 mt-4 font-bold"
            >
              <div className=" flex justify-center items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  className="w-6"
                >
                  <path
                    fill="#4a3e3d"
                    d="M128.4 239.8L320 97.9L511.6 239.8L353.5 357C343.8 364.2 332.1 368 320 368C307.9 368 296.2 364.1 286.5 357L128.4 239.8zM320 32C307.9 32 296.2 35.9 286.5 43L89.9 188.7C73.6 200.8 64 219.8 64 240.1L64 480C64 515.3 92.7 544 128 544L512 544C547.3 544 576 515.3 576 480L576 240.1C576 219.8 566.4 200.7 550.1 188.7L353.5 43C343.8 35.8 332.1 32 320 32z"
                  />
                </svg>
                {isOpened ? <p>Opening...</p> : <p>OPEN INVITATION</p>}
              </div>
            </button>
          </div>
        </div>
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
      </div>
    </>
  );
}
