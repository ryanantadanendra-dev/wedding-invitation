"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import ModalSukses from "./ModalSukses";
import { mutate } from "swr";

export default function FormPesan() {
  const searchParams = useSearchParams();
  const nama_undangan = searchParams.get("to");
  const [nama, setNama] = useState(nama_undangan || "Tamu Yang Terhormat");
  const [pesan, setPesan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pesanSukses, setPesanSukse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formdata = new FormData();

    formdata.append("nama", nama);
    formdata.append("pesan", pesan);

    const response = await axios.post("/api/pesan", formdata);

    if (response.data.success) {
      setNama(nama_undangan || "");
      setPesan("");
      setIsOpen(true);
      setPesanSukse(response.data.message);
      mutate((key) => Array.isArray(key) && key[0] === "ucapan");
    } else {
      alert("error");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full rounded-2xl bg-transparent px-6 py-8">
      <h2 className="text-center font-bold text-[18px] md:text-[22px] mb-6 text-background">
        Tinggalkan Pesan Untuk Kami
      </h2>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4 z-200">
        <input
          type="text"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Nama Undangan"
          required
          className="w-full rounded-lg border border-accent bg-transparent text-background px-4 py-3 text-[14px] italic placeholder:text-accent/70 focus:outline-none"
        />

        <textarea
          value={pesan}
          onChange={(e) => setPesan(e.target.value)}
          placeholder="Tulis Pesan..."
          required
          rows={5}
          className="w-full resize-none text-background rounded-lg border border-accent bg-transparent px-4 py-3 text-[14px] placeholder:text-heading/40 focus:outline-none"
        />

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
