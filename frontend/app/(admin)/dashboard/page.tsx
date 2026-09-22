"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { getKehadiran, type Kehadiran } from "@/hooks/kehadiran";
import { LaravelPaginatedResponse } from "@/types";

export default function KehadiranPage() {
  const [result, setResult] =
    useState<LaravelPaginatedResponse<Kehadiran> | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getKehadiran(page)
      .then((data) => {
        console.log("DATA DARI API:", data);
        setResult(data);
      })
      .catch(() => setErrorMessage("Gagal memuat data kehadiran."))
      .finally(() => setIsLoading(false));
  }, [page]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Data Kehadiran</h1>
        <p className="text-sm text-gray-500 mt-1">
          Daftar tamu yang mengisi konfirmasi kehadiran (RSVP)
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700 w-16">
                  ID
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">Nama</th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Kehadiran
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700 text-right">
                  Jumlah Tamu
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Memuat data...
                  </td>
                </tr>
              )}

              {!isLoading && errorMessage && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-red-500"
                  >
                    {errorMessage}
                  </td>
                </tr>
              )}

              {!isLoading && !errorMessage && result?.data?.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    Belum ada data kehadiran.
                  </td>
                </tr>
              )}

              {!isLoading &&
                !errorMessage &&
                result?.data?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3.5 text-gray-500">{item.id}</td>
                    <td className="px-6 py-3.5 font-medium text-gray-900">
                      {item.nama}
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.kehadiran === "hadir"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.kehadiran === "hadir" ? "Hadir" : "Tidak Hadir"}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right text-gray-700">
                      {item.jumlah_tamu}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Footer: info total + pagination */}
        {!isLoading && result && result?.total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Menampilkan {result.from}–{result.to} dari {result.total} data
            </p>

            <Pagination
              currentPage={result.current_page}
              lastPage={result.last_page}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
