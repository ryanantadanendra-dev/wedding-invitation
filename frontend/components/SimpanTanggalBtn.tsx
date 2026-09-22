"use client";

import Link from "next/link";

type SimpanTanggalProps = {
  /** Judul acara, contoh: "Pernikahan Mempelai & Mempelai" */
  title: string;
  /** Waktu mulai, format ISO. Contoh: "2027-01-01T08:00:00+07:00" */
  startDate: string;
  /** Waktu selesai, format ISO. Contoh: "2027-01-01T12:00:00+07:00" */
  endDate: string;
  /** Lokasi acara, opsional */
  location?: string;
  /** Deskripsi tambahan, opsional */
  description?: string;
};

/** Ubah ISO date jadi format yang dipakai Google Calendar & .ics (UTC, tanpa tanda baca) */
function toCalendarDate(isoDate: string): string {
  return (
    new Date(isoDate).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
  );
}

function buildGoogleCalendarUrl({
  title,
  startDate,
  endDate,
  location,
  description,
}: SimpanTanggalProps): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${toCalendarDate(startDate)}/${toCalendarDate(endDate)}`,
    // ctz wajib ada: tanpa ini Google Calendar menampilkan waktu sesuai
    // zona waktu default akun/browser si tamu, bukan zona waktu acara asli.
    ctz: "Asia/Makassar", // WITA — ganti ke "Asia/Jakarta" (WIB) kalau perlu
    ...(description && { details: description }),
    ...(location && { location }),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function buildIcsContent({
  title,
  startDate,
  endDate,
  location,
  description,
}: SimpanTanggalProps): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `DTSTART:${toCalendarDate(startDate)}`,
    `DTEND:${toCalendarDate(endDate)}`,
    `SUMMARY:${title}`,
    location ? `LOCATION:${location}` : "",
    description ? `DESCRIPTION:${description}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");
}

function downloadIcsFile(props: SimpanTanggalProps) {
  const icsContent = buildIcsContent(props);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${props.title}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export default function SimpanTanggalBtn(props: SimpanTanggalProps) {
  return (
    <Link
      href={buildGoogleCalendarUrl(props)}
      target="_blank"
      rel="noopener noreferrer"
      className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] gap-1 mt-6 flex justify-center items-center bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] text-[10px] z-40"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-3 md:w-5 lg:w-3 xl:w-3 2xl:w-3"
      >
        <path
          fill="#faf6f0"
          d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM480 496C488.8 496 496 488.8 496 480L496 416L408 416L408 496L480 496zM496 368L496 288L408 288L408 368L496 368zM360 368L360 288L280 288L280 368L360 368zM232 368L232 288L144 288L144 368L232 368zM144 416L144 480C144 488.8 151.2 496 160 496L232 496L232 416L144 416zM280 416L280 496L360 496L360 416L280 416zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176z"
        />
      </svg>
      <p className="text-[10px] md:text-[14px] lg:text-[10px]">
        Simpan Tanggal
      </p>
    </Link>
  );
}
