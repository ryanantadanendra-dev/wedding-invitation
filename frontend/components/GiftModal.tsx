"use client";

import { useState } from "react";
import Image from "next/image";

export const GiftModal = () => {
  const [isOpen, setIsOpen] = useState("");

  return (
    <>
      <button
        onClick={() => setIsOpen("bank")}
        className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] mx-auto gap-1 mt-6 flex justify-center items-center bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] text-[10px] z-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-3 md:w-4 lg:w-3 xl:w-3 2xl:w-3"
        >
          <path
            fill="#faf6f0"
            d="M128 96C92.7 96 64 124.7 64 160L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 256C576 220.7 547.3 192 512 192L136 192C122.7 192 112 181.3 112 168C112 154.7 122.7 144 136 144L520 144C533.3 144 544 133.3 544 120C544 106.7 533.3 96 520 96L128 96zM480 320C497.7 320 512 334.3 512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352C448 334.3 462.3 320 480 320z"
          />
        </svg>
        <p className="text-[10px] md:text-[12px] lg:text-[10px]">
          Transfer Bank
        </p>
      </button>
      <button
        onClick={() => setIsOpen("send")}
        className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] mx-auto gap-1 mt-6 flex justify-center items-center bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] text-[10px] z-90"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          className="w-3 md:w-5 lg:w-3"
        >
          <path
            fill="#faf6f0"
            d="M385.5 132.8C393.1 119.9 406.9 112 421.8 112L424 112C446.1 112 464 129.9 464 152C464 174.1 446.1 192 424 192L350.7 192L385.5 132.8zM254.5 132.8L289.3 192L216 192C193.9 192 176 174.1 176 152C176 129.9 193.9 112 216 112L218.2 112C233.1 112 247 119.9 254.5 132.8zM344.1 108.5L320 149.5L295.9 108.5C279.7 80.9 250.1 64 218.2 64L216 64C167.4 64 128 103.4 128 152C128 166.4 131.5 180 137.6 192L96 192C78.3 192 64 206.3 64 224L64 256C64 273.7 78.3 288 96 288L544 288C561.7 288 576 273.7 576 256L576 224C576 206.3 561.7 192 544 192L502.4 192C508.5 180 512 166.4 512 152C512 103.4 472.6 64 424 64L421.8 64C389.9 64 360.3 80.9 344.1 108.4zM544 336L344 336L344 544L480 544C515.3 544 544 515.3 544 480L544 336zM296 336L96 336L96 480C96 515.3 124.7 544 160 544L296 544L296 336z"
          />
        </svg>
        <p className="text-[10px] md:text-[12px] lg:text-[10px]">
          Kirim Hadiah
        </p>
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
        className={`bank-modal w-72 h-52 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 px-4 z-70 bg-background shadow-lg shadow-heading transition-all duration-300 ease-out ${
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
        <Image
          src="/bank.png"
          alt="Logo Bank"
          width={100}
          height={200}
          className="w-40"
        />
        <p>
          Nomor Rekening: <span className="font-bold">123456789</span>
        </p>
        <p>
          Atas Nama: <span className="font-bold">Pemilik Rekening</span>{" "}
        </p>
      </div>
      <div
        className={`send-modal w-72 h-52 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 px-4 z-80 bg-background shadow-lg shadow-heading transition-all duration-300 ease-out ${
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
        <p className="mt-4">Nama Penerima</p>
        <p>
          Nomor Telfon: <span className="font-bold">(+62) 123456789</span>
        </p>
        <p className="font-bold">
          Jl. Raya Lorem Ipsum No. 1, Kec. Mengwi, Kab. Badung, Bali
        </p>
      </div>
    </>
  );
};
