"use client";

import { useState } from "react";
import Image from "next/image";

type copyBtnProps = {
  text?: string;
};

export const GiftModal = () => {
  const [isOpen, setIsOpen] = useState("");

  const [isCopied, setIsCopied] = useState("");
  const resetAfterMs = 2000;

  const handleCopy = async (text: string, bank: string) => {
    try {
      // Cara modern & direkomendasikan — butuh konteks aman (HTTPS/localhost)
      await navigator.clipboard.writeText(text);
      setIsCopied(bank);
    } catch {
      // Fallback untuk browser lama / konteks tidak aman yang tidak
      // punya akses ke navigator.clipboard sama sekali
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand("copy");
        setIsCopied(bank);
      } catch {
        setIsCopied("");
      }

      document.body.removeChild(textarea);
    }

    setTimeout(() => setIsCopied(""), resetAfterMs);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen("bank")}
        className="w-[125px] md:w-[150px] h-[40px] md:h-[50px] mx-auto gap-1 mt-6 flex justify-center items-center text-background border border-background rounded-lg bg-transparent text-[10px] z-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-3 md:w-5"
        >
          <path
            fill="#faf6f0"
            d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z"
          />
        </svg>
        <p className="text-[12px] md:text-[14px]">Transfer Bank</p>
      </button>
      <button
        onClick={() => setIsOpen("send")}
        className="w-[125px] md:w-[150px] h-[40px] md:h-[50px] mx-auto gap-1 mt-6 flex justify-center items-center bg-transparent border border-background rounded-lg text-background text-[10px] z-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-3 md:w-5"
        >
          <path
            fill="#faf6f0"
            d="M385.5 132.8C393.1 119.9 406.9 112 421.8 112L424 112C446.1 112 464 129.9 464 152C464 174.1 446.1 192 424 192L350.7 192L385.5 132.8zM254.5 132.8L289.3 192L216 192C193.9 192 176 174.1 176 152C176 129.9 193.9 112 216 112L218.2 112C233.1 112 247 119.9 254.5 132.8zM344.1 108.5L320 149.5L295.9 108.5C279.7 80.9 250.1 64 218.2 64L216 64C167.4 64 128 103.4 128 152C128 166.4 131.5 180 137.6 192L96 192C78.3 192 64 206.3 64 224L64 256C64 273.7 78.3 288 96 288L544 288C561.7 288 576 273.7 576 256L576 224C576 206.3 561.7 192 544 192L502.4 192C508.5 180 512 166.4 512 152C512 103.4 472.6 64 424 64L421.8 64C389.9 64 360.3 80.9 344.1 108.4zM544 336L344 336L344 544L480 544C515.3 544 544 515.3 544 480L544 336zM296 336L96 336L96 480C96 515.3 124.7 544 160 544L296 544L296 336z"
          />
        </svg>
        <p className="text-[12px] md:text-[14px]">Kirim Hadiah</p>
      </button>

      {/* Backdrop: fade in/out, ikut nutup modal kalau diklik */}
      <div
        onClick={() => setIsOpen("")}
        className={`fixed inset-0 bg-black/50 z-70 transition-opacity duration-300 ${
          isOpen == "bank" || isOpen == "send"
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        className={`bank-modal w-72 h-110 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 px-4 z-100 bg-background shadow-lg shadow-heading transition-all duration-300 ease-out ${
          isOpen == "bank"
            ? "opacity-100 scale-100 -translate-y-1/2 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-[45%] pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen("")}
          className="absolute right-4 top-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-8"
          >
            <path
              fill="#b87333"
              d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"
            />
          </svg>
        </button>
        <div>
          <Image
            src="/bni.png"
            alt="Logo Bank BNI"
            width={200}
            height={60}
            className="w-22"
          />
          <p>
            Nomor Rekening: <span className="font-bold">760011937</span>
          </p>
          <p>
            Atas Nama:{" "}
            <span className="font-bold">Kadek Surya Adi Saputra</span>{" "}
          </p>
          <button
            onClick={() => handleCopy("760011937", "bni")}
            className="px-2 py-2 bg-transparent border border-body rounded-lg flex justify-center gap-1 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-3 md:w-5"
            >
              <path
                fill="#0d0d0d"
                d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"
              />
            </svg>
            <p className="text-[12px] md:text-[14px]">
              {isCopied == "bni" ? "Nomor Tersalin!" : "Salin Nomor"}
            </p>
          </button>
        </div>
        <div className="mt-4">
          <Image
            src="/bri.png"
            alt="Logo Bank BRI"
            width={200}
            height={60}
            className="w-22"
          />
          <p>
            Nomor Rekening:{" "}
            <span className="font-bold">0017 0114 1583 502</span>
          </p>
          <p>
            Atas Nama:{" "}
            <span className="font-bold">Kadek Surya Adi Saputra</span>{" "}
          </p>
          <button
            onClick={() => handleCopy("0017 0114 1583 502", "bri")}
            className="px-2 py-2 bg-transparent border border-body rounded-lg flex justify-center gap-1 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-3 md:w-5"
            >
              <path
                fill="#0d0d0d"
                d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"
              />
            </svg>
            <p className="text-[12px] md:text-[14px]">
              {isCopied == "bri" ? "Nomor Tersalin!" : "Salin Nomor"}
            </p>
          </button>
        </div>
      </div>
      <div
        className={`send-modal w-72 h-52 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 px-4 z-100 bg-background shadow-lg shadow-heading transition-all duration-300 ease-out ${
          isOpen == "send"
            ? "opacity-100 scale-100 -translate-y-1/2 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-[45%] pointer-events-none"
        }`}
      >
        <button
          onClick={() => setIsOpen("")}
          className="absolute right-4 top-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            className="w-8"
          >
            <path
              fill="#b87333"
              d="M160 96C124.7 96 96 124.7 96 160L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 160C544 124.7 515.3 96 480 96L160 96zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z"
            />
          </svg>
        </button>
        <h3 className="mt-12">Alamat Penerima</h3>
        <p className="mt-4">Surya Adi (089686027950)</p>
        <p className="font-bold">
          Jl. P. Moyo I No. 1, Pedungan, Denpasar Selatan, Kota Denpasar, Bali
          80222
        </p>
      </div>
    </>
  );
};
