"use client";

import useSWR from "swr";
import Pagination from "./Pagination";
import { getPaginatedUcapan, type Ucapan } from "../data";
import { useState } from "react";

export default function ListUcapan() {
  const [page, setPage] = useState(1);

  const {
    data: result,
    isLoading,
    mutate,
  } = useSWR(["ucapan", page], () => getPaginatedUcapan(page, 3), {
    revalidateOnFocus: false,
  });

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-[20px] font-bold text-center mb-6">
        Ucapan &amp; Doa
      </h1>

      {isLoading && (
        <p className="text-center text-sm text-gray-500 py-8">Memuat...</p>
      )}

      {!isLoading && result && (
        <>
          <ul className="flex flex-col gap-3 mb-8">
            {result.data.map((ucapan) => (
              <li
                key={ucapan.id}
                className="rounded-lg border border-accent px-4 py-3"
              >
                <p className="font-bold text-[14px] md:text-[16px] lg:text-[14px]">
                  {ucapan.nama}
                </p>
                <p className="text-[13px] md:text-[15px] lg:text-[13px] text-heading/80 mt-1">
                  {ucapan.pesan}
                </p>
              </li>
            ))}
          </ul>

          <p className="text-[12px] text-gray-500 text-center mb-4">
            Menampilkan {result.from}–{result.to} dari {result.total} ucapan
          </p>

          <Pagination
            currentPage={result.current_page}
            lastPage={result.last_page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
