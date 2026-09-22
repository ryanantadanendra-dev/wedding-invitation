import axios from "@/lib/axios";
import type { LaravelPaginatedResponse } from "@/types/pagination";

export type Kehadiran = {
  id: number;
  nama: string;
  kehadiran: "hadir" | "tidak_hadir";
  jumlah_tamu: number;
};

/**
 * Ambil data kehadiran langsung dari Laravel dengan pagination server-side
 * (paginate 10 data per halaman, dihitung di backend, bukan di-slice manual
 * di frontend) — cocok untuk data yang bisa jadi banyak (ratusan/ribuan RSVP).
 */
export async function getKehadiran(
  page: number,
): Promise<LaravelPaginatedResponse<Kehadiran>> {
  const response = await axios
    .get(`/api/kehadiran?page=${page}`)
    .then((res) => res);

  return response;
}
