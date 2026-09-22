"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import ModalSukses from "./ModalSukses";

type RsvpStatus = "hadir" | "tidak hadir";

export default function RSVPForm() {
  const [status, setStatus] = useState<RsvpStatus>("hadir");
  const [jumlahTamu, setJumlahTamu] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const nama_undangan = searchParams.get("to");
  const [error, setError] = useState<Record<string, string[]>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [pesanSukses, setPesanSukse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formdata = new FormData();

    formdata.append(
      "nama",
      nama_undangan !== null ? nama_undangan : "Tamu Yang Terhormat",
    );
    formdata.append("kehadiran", status);
    formdata.append("jumlah_tamu", jumlahTamu.toString());

    try {
      const response = await axios.post("/api/kehadiran", formdata);

      if (response.data.success) {
        setIsOpen(true);
        setPesanSukse(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;

        setError(data.errors);
      }
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full ps-3 mt-12 relative z-40">
      {/* Toggle Hadir / Tidak Hadir */}
      <div className="w-full flex justify-start overflow-hidden pe-10">
        <button
          type="button"
          onClick={() => setStatus("hadir")}
          className={`flex-[0.35] border-2 border-accent py-3 text-[10px] font-bold transition-colors text-background ${
            status === "hadir" ? "bg-accent " : "bg-transparent"
          }`}
        >
          Saya Akan Hadir
        </button>
        <button
          type="button"
          onClick={() => setStatus("tidak hadir")}
          className={`flex-[0.55] border-2 py-3 text-[10px] text-background font-bold transition-colors border-l border-accent ${
            status === "tidak hadir" ? "bg-accent" : "bg-transparent"
          }`}
        >
          Saya Tidak Akan Hadir
        </button>
      </div>

      {/* Jumlah Tamu — hanya relevan kalau hadir */}
      {status === "hadir" && (
        <div className="mt-6 w-full pe-18 md:pe-27 lg:pe-18">
          <label
            htmlFor="jumlah-tamu"
            className="block text-background text-[14px] font-bold mb-2"
          >
            Jumlah Tamu
          </label>
          <div className="relative">
            <select
              id="jumlah-tamu"
              value={jumlahTamu}
              onChange={(e) => setJumlahTamu(Number(e.target.value))}
              className="w-full text-background appearance-none rounded-xl border border-background bg-transparent py-3 px-4 pr-10 text-[14px] focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="text-heading">
                  {n}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4"
            >
              <path
                fill="currentColor"
                d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
              />
            </svg>
          </div>
          <p className="text-background text-[14px]">
            {error.nama
              ? "Hanya Boleh Mengisi Form Sekali"
              : error.kehadiran
                ? error.kehadiran
                : error.jumlah_tamu}
          </p>
        </div>
      )}

      {/* Tombol Kirim */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-12 w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] bg-accent text-background font-bold text-[10px] md:text-[14px] lg:text-[10px] rounded-tr-[20px] rounded-bl-[20px] disabled:opacity-60 transition-opacity"
      >
        {isSubmitting ? "Mengirim..." : "Kirim"}
      </button>
      <ModalSukses
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Pesan Terkirim"
        message={pesanSukses}
      />
    </form>
  );
}
