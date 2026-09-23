"use client";

import { useState, useRef } from "react";
import Cover from "@/components/Cover";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import { GiftModal } from "@/components/GiftModal";
import FormPesan from "@/components/FormPesan";
import ListUcapan from "@/components/ListUcapan";
import { Suspense } from "react";
import ImageGallery from "@/components/GalleryImage";

type InstaBtnProps = {
  username: string;
  link: string;
};

export default function Home() {
  const images = [
    { src: "/cover-1.jpg", alt: "Deskripsi foto 1" },
    { src: "/cover-2.jpg", alt: "Deskripsi foto 2" },
    { src: "/cover-3.jpg", alt: "Deskripsi foto 3" },
  ];
  const galleryImages = [
    { src: "/cover-1.jpg", alt: "Deskripsi foto 1" },
    { src: "/cover-2.jpg", alt: "Deskripsi foto 2" },
    { src: "/cover-3.jpg", alt: "Deskripsi foto 3" },
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <main
      className={`w-full h-dvh ${isCoverOpen ? "overflow-y-hidden" : "overflow-y-auto"} overflow-x-hidden bg-[#0d0d0d] relative`}
    >
      <audio
        ref={audioRef}
        src="/audio/music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {isCoverOpen && (
        <Suspense fallback={null}>
          <Cover
            onOpen={() => {
              audioRef.current?.play().catch(() => {});
            }}
            onOpened={() => setIsCoverOpen(false)}
          />
        </Suspense>
      )}
      <button
        onClick={() => handleToggleMusic()}
        className="w-10 h-10 rounded-full bg-accent fixed bottom-2 right-2 z-50"
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
            className="w-3 mx-auto my-auto"
          >
            <path
              fill="#FFFFFF"
              d="M533.6 32.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C557.5 113.8 592 180.8 592 256s-34.5 142.2-88.7 186.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C598.5 426.7 640 346.2 640 256S598.5 85.2 533.6 32.5zM473.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C475.3 170.7 496 210.9 496 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C393.1 227.6 400 241 400 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C434.1 312.9 448 286.1 448 256s-13.9-56.9-35.4-74.5zM80 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L128 160 80 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className="w-3 mx-auto my-auto"
          >
            <path
              fill="#FFFFFF"
              d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
            />
          </svg>
        )}
      </button>

      <section id="hero" className="w-full h-dvh md:h-100 relative">
        <div className="text absolute z-20 bottom-12  left-1/2 -translate-x-1/2 text-background">
          <h1 className="font-tangerine font-bold  text-[42px] md:text-[70px] text-center leading-10 md:leading-16 lg:leading-10">
            Surya & Trisna
          </h1>
          <p className="text-center font-tangerine text-[24px] md:text-[28px] lg:mt-4">
            19&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;10&nbsp;&nbsp;&nbsp;--&nbsp;&nbsp;&nbsp;2026
          </p>
        </div>
        <div className="overlay bg-[#2c221e90] w-full h-full absolute inset-0 top-0 z-10" />
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
      </section>
      <section className="w-full h-52 md:h-96 flex flex-col justify-evenly items-center px-6 md:px-20 text-[10px] md:text-[18px] text-background">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-10"
        >
          <path
            fill="#faf6f0"
            d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64L0 216zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-136z"
          />
        </svg>
        <article className="text-center">
          “Ya Tuhanku Yang Maha Pengasih, Anugerahkanlah Kepada Pasangan Ini
          Senantiasa Kebahagiaan, Kesehatan, Tetap Bersatu dan Tidak Pernah
          Terpisahkan, Panjang Umur dan Tinggal Dirumah Yang Penuh Kegembiraan
          Bersama Seluruh Keturunannya”.
          <br />
          <br />
          Rg Veda X.85.42
        </article>
      </section>
      <section
        id="mempelai"
        className="w-full min-h-full md:min-h-200 grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-0 place-items-center md:py-12 lg:py-0 lg:pb-20 relative"
      >
        <div
          className="relative w-full h-screen md:h-200 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url(/pria.jpg)" }}
        >
          <div className="overlay bg-[#00000060] absolute inset-0 z-30" />
          <div className="flex flex-col items-start mt-4 absolute z-50 text-background bottom-14 left-6">
            <h2 className="font-tangerine font-bold text-[30px] md:text-[50px]">
              Kadek Surya Adi Saputra, S.Kom.,M.Kom
            </h2>
            <p className="font-bold text-[14px] md:text-[18px] mt-2">
              Putra kedua dari
            </p>
            <p className="text-[12px] md:text-[15px] mt-1">
              Dr. I Wayan Rinda Suardika, M.Si & <br />
              Ketut Suami
            </p>
            <InstaBtn
              link="https://www.instagram.com/adisuryasptr/"
              username="adisuryasptr"
            />
          </div>
        </div>
        <div
          className="relative w-full h-screen md:h-200 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url(/wanita.jpg)" }}
        >
          <div className="overlay bg-[#00000060] absolute inset-0 z-30" />
          <div className="flex flex-col items-end mt-4 absolute z-50 text-background bottom-14 right-6 text-end">
            <h2 className="font-tangerine font-bold text-[30px] md:text-[50px] ">
              Ni Komang Trisnayanti, S.M
            </h2>
            <p className="font-bold text-[14px] md:text-[18px] mt-2">
              Putri ketiga dari
            </p>
            <p className="text-[12px] md:text-[15px] mt-1">
              I Ketut Kertayasa, S.Sos & <br />
              Ni Wayan Sekarini
            </p>
            <InstaBtn
              link="https://www.instagram.com/trisna_yantii/"
              username="trisna_yantii"
            />
          </div>
        </div>
      </section>
      <section
        id="countdown-section"
        className="countdown w-full h-150 flex flex-col justify-evenly bg-cover bg-center z-40 text-background"
      >
        <div className="text-center px-4 md:px-32">
          <p className="text-[12px] md:text-[18px]">
            Atas Asung Kerta Wara Nugraha Ida Sang Hyang Widi Wasa/Tuhan Yang
            Maha Esa, Kami Bermaksud Mengundang Bapak/Ibu/Saudara/i, Pada Acara
            Pawiwahan (Pernikahan) Putra & Putri Kami Yang Akan Dilaksanakan
            Pada :
          </p>
        </div>
        <div className="text-background text-center grid grid-cols-1 gap-3 text-center">
          <div className="w-screen h-[1px] bg-background"></div>
          <p className="text-[12px] md:text-[18px]">Senin, 19 Oktober 2026</p>
          <p className="text-[12px] md:text-[18px]">
            Waktu: 09:00 WITA s/d 22:00 WITA
          </p>
          <p className="text-[12px] md:text-[18px]">Denpasar, Bali</p>
          <Link
            href="https://maps.app.goo.gl/fGvuzaQ3wfC7bo5a8"
            className="block w-44 mx-auto px-4 py-1 border border-background rounded-lg text-[12px]"
          >
            Peta Lokasi
          </Link>
          <Countdown targetDate="2026-10-19T09:00:00" />
          <div className="w-screen h-[1px] bg-background mt-4"></div>
        </div>
        <div className=" text-center px-4 md:px-32">
          <p className="text-[12px] md:text-[18px]">
            Merupakan Suatu Kehormatan dan Kebahagiaan Bagi Kami Apabila
            Bapak/Ibu/Saudara/i Berkenan Hadir Untuk Memberikan Doa Restu Kepada
            Putra dan Putri Kami. <br />
            <br />
            Atas Kehadiran dan Doa Restunya Kami Ucapkan Terima Kasih.
          </p>
        </div>
      </section>
      <section className="w-full min-h-fit relative py-12 bg-body text-background text-center">
        <h2 className="font-tangerine font-bold text-[32px] lg:text-[48px] text-center">
          Pre -Wedding Collections
        </h2>
        <div className="w-full md:w-170 mx-auto">
          <ImageGallery images={galleryImages} columns={3} />
        </div>
      </section>
      <section
        id="rsvp-section"
        className="w-full min-h-90 py-12 relative bg-cover bg-center z-40"
      >
        <div className="px-6 md:px-0 relative z-40 text-background">
          <h2 className="text-[32px] md:text-[48px] lg:text-[48px] font-tangerine font-bold text-center">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-[12px] md:text-[18px] lg:text-[18px] md:ps-12 md:pe-12 font-bodoni">
            Kehadiran dan doa restu Anda adalah hadiah terindah di hari bahagia
            kami. Demi kelancaran acara, mohon bantuannya untuk mengisi
            konfirmasi kehadiran di bawah ini
          </p>
        </div>
        <Suspense fallback={null}>
          <RSVPForm />
        </Suspense>
      </section>
      <section className="w-full bg-body min-h-[195px] md:min-h-[350px] lg:min-h-[195px] grid grid-cols-1 place-items-center py-12">
        <div className=" text-center px-16 text-background">
          <h2 className="text-[32px] md:text-[48px] lg:text-[48px] font-bold font-tangerine text-center">
            Kirim Hadiah
          </h2>
          <p className="text-[12px] md:text-[18px] md:px-32">
            Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda
            kasih untuk mempelai, dapat menyalurkannya melalui rekening di bawah
            ini:
          </p>
        </div>
        <div className="flex gap-3">
          <GiftModal />
        </div>
      </section>
      <section id="pesan-section" className="w-full min-h-240 relative">
        <div className="absolute bg-transparent w-84 md:w-140 lg:w-84 h-220 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <Suspense fallback={null}>
            <FormPesan />
          </Suspense>
          <ListUcapan />
        </div>
      </section>
      <section
        id="closing-section"
        className="w-full h-[247px] md:h-[300px] bg-cover bg-center relative"
      >
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-background">
          <h2 className="font-tangerine font-bold text-[32px] md:text-[48px] text-center ">
            Om Santih, Santih, Santih, Om
          </h2>
        </div>
        <p className="text-background opacity-30 text-[10px] md:text-[12px] lg:text-[14px] absolute bottom-2 left-1/2 -translate-x-1/2 text-center">
          @ all rights reserved by{" "}
          <span className="underline">
            <Link href="http://instagram.com/agunkdanend" target="_blank">
              @agunkdanend
            </Link>
          </span>
        </p>
      </section>
    </main>
  );
}

const InstaBtn = ({ link, username }: InstaBtnProps) => {
  return (
    <Link
      href={link}
      className="px-4 py-2 mt-6 rounded-lg flex justify-center items-center bg-heading text-background text-[10px] gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-4 md:w-5 lg:w-3 xl:w-3 2xl:w-3"
      >
        <path
          fill="#faf6f0"
          d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"
        />
      </svg>
      <p className="text-[12px] md:text-[14px] lg:text-[12px] ">@{username}</p>
    </Link>
  );
};
