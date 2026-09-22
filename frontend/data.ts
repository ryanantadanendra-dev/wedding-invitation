import type { LaravelPaginatedResponse } from "./types";
import { getUcapan } from "./hooks/getUcapan";
import { getKehadiran } from "./hooks/kehadiran";

export type Ucapan = {
  id: number;
  nama: string;
  pesan: string;
};

/**
 * Ambil data ucapan dari Laravel (lewat getUcapan), lalu potong (paginate)
 * di sisi client sesuai halaman yang diminta. Struktur return-nya
 * tetap meniru response paginate() Laravel supaya komponen Pagination
 * dan halaman yang memakainya tidak perlu berubah sama sekali.
 */
export async function getPaginatedUcapan(
  page: number,
  perPage = 3,
): Promise<LaravelPaginatedResponse<Ucapan>> {
  const allUcapan = await getUcapan();

  const total = allUcapan.length;
  const lastPage = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const data = allUcapan.slice(start, end);

  return {
    data,
    current_page: page,
    last_page: lastPage,
    per_page: perPage,
    total,
    from: total === 0 ? null : start + 1,
    to: total === 0 ? null : Math.min(end, total),
    next_page_url: page < lastPage ? `?page=${page + 1}` : null,
    prev_page_url: page > 1 ? `?page=${page - 1}` : null,
  };
}
