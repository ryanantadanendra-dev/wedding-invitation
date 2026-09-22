"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  /** Tanggal & jam acara, format ISO. Contoh: "2027-01-01T08:00:00" */
  targetDate: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ targetDate }: CountdownProps) {
  // null dulu di render pertama supaya server & client sama persis (hindari hydration mismatch)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const units: { value: number; label: string }[] = [
    { value: timeLeft?.days ?? 0, label: "Hari" },
    { value: timeLeft?.hours ?? 0, label: "Jam" },
    { value: timeLeft?.minutes ?? 0, label: "Menit" },
    { value: timeLeft?.seconds ?? 0, label: "Detik" },
  ];

  return (
    <div className="text-center h-[50px] md:h-full lg:h-[50px] relative z-40 lg:mt-4">
      <div className="flex justify-center gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center w-1/4 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 text-background"
          >
            <span className="text-[18px] md:text-[26px] lg:text-[22px] font-bold leading-none tabular-nums">
              {timeLeft === null ? "--" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-[14px] lg:text-[10px] mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
