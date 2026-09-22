"use client";

import { useState } from "react";
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

  const OPEN_DURATION_MS = 900;

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
      <div
        className=" fixed z-100 inset-0"
        style={{
          transform: isOpening ? "translateY(-100%)" : "translateY(0)",
          opacity: isOpening ? 0 : 1,
          transition: `transform ${OPEN_DURATION_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${OPEN_DURATION_MS}ms ease-in`,
        }}
      >
        <div className="cover-overlay z-10 grid grid-cols-1 items-end fixed  inset-0">
          <div className="text-background">
            <h1 className="font-tangerine text-[32px]  text-center leading-11">
              Kepada Yth <br /> Bapak/Ibu/Saudara/i
              <br />{" "}
              <span className="font-bold">
                {nama !== null ? nama : "Tamu Yang Terhormat"}
              </span>
            </h1>
          </div>
          <div className="text-center pb-6">
            <p className="text-[13px] font-bold font-bodoni">
              The Wedding Celebration Of
            </p>
            <h2 className="font-tangerine text-[48px] font-bold">
              Surya & Trisna
            </h2>
            <button
              onClick={handleOpen}
              disabled={isOpening}
              className="w-[343px] h-[62px] bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] transition-opacity duration-300 disabled:opacity-60"
            >
              {isOpening ? "Membuka..." : "Open Invitation"}
            </button>
          </div>
        </div>
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
      </div>
    </>
  );
}
