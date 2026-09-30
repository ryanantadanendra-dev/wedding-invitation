"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import ModalSukses from "./ModalSukses";
import { mutate } from "swr";
import { AxiosError } from "axios";

interface ValidationErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

type FieldErrors = Partial<Record<"nama" | "pesan", string>>;

export default function FormPesan() {
  const searchParams = useSearchParams();
  const nama_undangan = searchParams.get("to");
  const [nama, setNama] = useState(nama_undangan || "Tamu Yang Terhormat");
  const [pesan, setPesan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pesanSukses, setPesanSukses] = useState("");
  const [error, setError] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formdata = new FormData();

    formdata.append("nama", nama);
    formdata.append("pesan", pesan);

    try {
      const response = await axios.post("/api/pesan", formdata);

      if (response.data.success) {
        setNama(nama_undangan || "");
        setPesan("");
        setPesanSukses(response.data.message);
        setIsOpen(true);
        setError({});
        mutate((key) => Array.isArray(key) && key[0] === "ucapan");
      }
    } catch (err) {
      const error = err as AxiosError<ValidationErrorResponse>;
      const status = error.response?.status;
      const data = error.response?.data;

      if (status === 422 && data?.errors) {
        // Ambil pesan pertama dari tiap field
        setError({
          nama: "Nama ini telah digunakan oleh pengguna lain. Silakan masukkan nama baru.",
          pesan: data.errors.pesan?.[0],
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-transparent py-8">
      <h2 className="text-center font-bold text-[18px] md:text-[22px] mb-6 text-background">
        Tinggalkan Pesan Untuk Kami
      </h2>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col items-center gap-4 z-100"
      >
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Undangan"
          required
          className="md:w-90 w-60 rounded-lg border border-accent bg-transparent text-background px-4 py-3 text-[14px] italic placeholder:text-accent/70 focus:outline-none "
        />
        {error.nama && (
          <p className="text-background text-[12px]">{error.nama}</p>
        )}

        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis Pesan..."
          required
          rows={5}
          className="md:w-90 w-60 resize-none text-background rounded-lg border border-accent bg-transparent px-4 py-3 text-[14px] placeholder:text-heading/40 focus:outline-none"
        />
        {error.pesan && (
          <p className="text-background text-[12px]">{error.pesan}</p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] px-8 bg-transparent border border-background text-background font-bold text-[14px] md:text-[18px] lg:text-[14px] rounded-lg disabled:opacity-60 transition-opacity"
          >
            {isSubmitting ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </form>
      <ModalSukses
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Pesan Terkirim"
        message={pesanSukses}
      />
    </div>
  );
}
