"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
};

export default function ModalSukses({
  isOpen,
  onClose,
  title = "Terima Kasih!",
  message = "Pesan dan ucapan kamu berhasil terkirim.",
}: SuccessModalProps) {
  // Portal cuma boleh dipakai setelah component mount di client,
  // karena document.body belum ada saat render pertama di server (SSR)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-80 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Modal */}
      <div
        className={`w-72 rounded-2xl fixed top-1/2 left-1/2 -translate-x-1/2 px-6 py-8 z-90 bg-background shadow-lg text-center transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 -translate-y-1/2 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-[45%] pointer-events-none"
        }`}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="w-6 h-6"
          >
            <path
              fill="#faf6f0"
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        </div>

        <h2 className="font-bold text-[18px] mb-2">{title}</h2>
        <p className="text-[13px] text-heading/80 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="w-full h-[44px] bg-accent text-background font-bold text-[14px] rounded-tr-[16px] rounded-bl-[16px]"
        >
          Tutup
        </button>
      </div>
    </>,
    document.body,
  );
}
