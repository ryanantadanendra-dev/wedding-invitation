"use client";

import { useState, useRef } from "react";
import Cover from "@/components/Cover";
import Image from "next/image";
import ImageCarousel from "@/components/ImageCarousel";
import Bunga1 from "../../public/bunga-1.png";
import Link from "next/link";
import Countdown from "@/components/Countdown";
import RSVPForm from "@/components/RSVPForm";
import { GiftModal } from "@/components/GiftModal";
import FormPesan from "@/components/FormPesan";
import ListUcapan from "@/components/ListUcapan";
import SimpanTanggalBtn from "@/components/SimpanTanggalBtn";
import ScrollAnimation from "@/components/ScrollAnimation";
import { MapPreview } from "@/components/MapPreview";

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
      className={`w-full lg:w-[440px] h-dvh ${isCoverOpen ? "overflow-y-hidden" : "overflow-y-auto"} overflow-x-hidden bg-background relative`}
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
        <Cover
          onOpen={() => {
            audioRef.current?.play().catch(() => {});
          }}
          onOpened={() => setIsCoverOpen(false)}
        />
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

      <section id="hero" className="w-full h-dvh relative">
        <div className="text absolute z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-background">
          <h1 className="font-tangerine font-bold  text-[32px] md:text-[70px] lg:text-[32px] text-center leading-10 md:leading-16 lg:leading-10">
            Surya <br />&<br /> Trisna
          </h1>
          <p className="text-center font-tangerine text-[24px] md:text-[28px] lg:text-[24px]">
            19.10.2026
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            className="w-4 md:w-6 lg:w-4 mx-auto animate-bounce mt-6 [animation-duration:2s]"
          >
            <path
              fill="#faf6f0"
              d="M214.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 329.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 210.7 329.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"
            />
          </svg>
        </div>
        <div className="overlay bg-[#2c221e90] w-full h-full absolute inset-0 top-0 z-10" />
        <ImageCarousel images={images} intervalMs={7000} fadeDurationMs={300} />
        <ScrollAnimation
          direction="down"
          className="absolute -bottom-44 -left-16 z-30"
        >
          <Image
            src={Bunga1}
            alt="Bunga Hiasan"
            width={400}
            height={400}
            className=" w-73 h-73 z-30"
          />
        </ScrollAnimation>
      </section>
      <section className="w-full h-52 bg-background flex flex-col justify-end px-6 md:px-20 lg:px-6 text-[14px] md:text-[18px] lg:text-[14px]">
        <article className="text-center">
          Atas Asung Kerta Wara Nugraha Ida Sang Hyang Widhi Wasa / Tuhan Yang
          Maha Esa, kami bermaksud menyelenggarakan Upacara Manusa Yadnya
          Pawiwahan (pernikahan)
        </article>
      </section>
      <section
        id="mempelai"
        className="w-full min-h-full grid grid-cols-1 gap-12 place-items-center py-20 md:py-32 lg:py-20 relative"
      >
        <div className="relative w-full">
          <figure className="relative w-[192px] h-[243px] md:w-[280px] md:h-[350px] lg:w-[192px] lg:h-[243px] mx-auto">
            <Image
              src="/pria.jpg"
              fill
              alt="Mempelai Pria"
              className="object-cover rounded-tl-[40px] rounded-tr-[40px]"
            />
            <Image
              src="/burung-kanan.png"
              alt="Burung Merpati"
              width={200}
              height={200}
              className="w-20 h-20 md:w-32 md:h-32 lg:w-20 lg:h-20 absolute -top-8 md:-top-18 lg:-top-8 -left-8 md:-left-18 lg:-left-8"
            />
          </figure>
          <div className="flex flex-col items-center mt-4">
            <h2 className="font-tangerine font-bold text-[30px] md:text-[50px] lg:text-[30px]">
              Kadek Surya Adi Saputra, S.Kom.,M.Kom
            </h2>
            <p className="font-bold text-[14px] md:text-[18px] lg:text-[14px] mt-2">
              Putra kedua dari
            </p>
            <p className="text-[12px] md:text-[15px] lg:text-[12px] mt-1 text-center">
              Dr. I Wayan Rinda Suardika, M.Si & <br />
              Ketut Suami
            </p>
          </div>
          <ScrollAnimation
            direction="down"
            className="absolute top-12 right-0 z-30"
          >
            <Image
              src="/daun-kiri.png"
              alt="Rangkaian Daun"
              width={100}
              height={80}
              className="w-[109px] h-[86px]"
            />
          </ScrollAnimation>
          <ScrollAnimation
            direction="down"
            className="absolute -bottom-25 -right-14 z-30"
          >
            <Image
              src="/bunga-2.png"
              alt="Rangkaian Bunga"
              width={100}
              height={80}
              className="w-[230px] h-[178px] "
            />
          </ScrollAnimation>
          <InstaBtn link="http://instagram.com" username="Instagram" />
        </div>
        <p className="font-tangerine text-[48px] md:text-[60px] lg:text-[48px] font-bold">
          &
        </p>
        <div className="relative w-full">
          <figure className="relative w-[192px] h-[243px] md:w-[280px] md:h-[350px] lg:w-[192px] lg:h-[243px] mx-auto">
            <Image
              src="/wanita.jpg"
              fill
              alt="Mempelai Pria"
              className="object-cover rounded-tl-[40px] rounded-tr-[40px]"
            />
            <Image
              src="/burung-kiri.png"
              alt="Burung Merpati"
              width={200}
              height={200}
              className="w-20 h-20 md:w-32 md:h-32 lg:w-20 lg:h-20 absolute -top-8 md:-top-16 lg:-top-8 -right-8 md:-right-16 lg:-right-8"
            />
          </figure>
          <div className="flex flex-col items-center mt-4">
            <h2 className="font-tangerine font-bold text-[30px] md:text-[50px] lg:text-[30px]">
              Ni Komang Trisnayanti, S.M
            </h2>
            <p className="font-bold text-[14px] md:text-[18px] lg:text-[14px] mt-2">
              Putri ketiga dari
            </p>
            <p className="text-[12px] md:text-[15px] lg:text-[12px] mt-1 text-center">
              I Ketut Kertayasa, S.Sos & <br />
              Ni Wayan Sekarini
            </p>
          </div>
          <ScrollAnimation
            direction="down"
            className="absolute top-12 left-0 z-30"
          >
            <Image
              src="/daun-kanan.png"
              alt="Rangkaian Daun"
              width={100}
              height={80}
              className="w-[109px] h-[86px] "
            />
          </ScrollAnimation>
          <ScrollAnimation
            direction="down"
            className="absolute -bottom-25 -left-14 z-40"
          >
            <Image
              src="/bunga-2-kanan.png"
              alt="Rangkaian Bunga"
              width={100}
              height={80}
              className="w-[230px] h-[178px]"
            />
          </ScrollAnimation>
          <InstaBtn link="http://instagram.com" username="Instagram" />
        </div>
      </section>
      <section
        className="countdown relative w-full h-[217px] md:h-[350px] lg:h-[217px] grid grid-cols-1 place-items-center bg-cover bg-center"
        style={{ backgroundImage: `url(/landscape.jpg)` }}
      >
        <div className="overlay bg-[#2c221e90] absolute z-30 inset-0" />
        <Countdown targetDate="2026-10-19T09:00:00" label="Save The Dates" />
        <SimpanTanggalBtn
          title="Pawiwahan Surya & Trisna"
          startDate="2026-10-19T09:00:00+08:00"
          endDate="2026-10-19T22:00:00+08:00"
          location="Alamat Lokasi Acara"
          description="Dengan hormat mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami."
        />
        <ScrollAnimation
          direction="down"
          className="absolute -bottom-12 -right-12 z-40"
        >
          <Image
            src="/bunga-3.png"
            alt="Bunga Mawar"
            width={100}
            height={100}
            className="w-[187px] h-[123px] -rotate-45"
          />
        </ScrollAnimation>
      </section>
      <section className="w-full min-h-[460px] relative grid grid-cols-1 place-items-center gap-12 py-12">
        <div>
          <h2 className="text-[32px] md:text-[38px] lg:text-[32px] text-heading font-tangerine text-center">
            Pawiwahan
          </h2>
          <p className="font-bodoni font-bold text-center text-[14px] md:text-[18px] lg:text-[14px]">
            09:00 WITA s/d Selesai
          </p>
        </div>
        <ScrollAnimation
          direction="down"
          className="absolute top-56 -left-6 z-40"
        >
          <Image
            src="/daun-kanan.png"
            alt="Rangkaian Daun"
            width={100}
            height={80}
            className="w-[109px] h-[86px]"
          />
        </ScrollAnimation>
        <div className="relative w-[192px] h-[243px] md:w-[340px] md:h-[400px] lg:w-[192px] lg:h-[243px]">
          <Image
            src="/burung-kiri.png"
            alt="Burung Merpati"
            width={200}
            height={200}
            className="w-20 h-20 md:w-32 md:h-32 lg:w-20 lg:h-20 absolute -top-8 md:-top-18 lg:-top-8 -right-8 md:-right-18 lg:-right-8 z-30"
          />
          <MapPreview
            url="https://maps.app.goo.gl/oRQEKVFZ6vqb3bKw5"
            height="160px"
            style={{
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              height: "100%",
            }}
          />
        </div>
        <div>
          <p className="font-bold text-[14px] md:text-[18px] lg:text-[14px] px-12 md:px-52 lg:px-12 text-center">
            Jl. P. Moyo I No. 1, Pedungan, Denpasar Selatan, Kota Denpasar, Bali
            80222
          </p>
          <Link
            href="https://maps.app.goo.gl/AMMYepbR9Sm2ppzm7"
            className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] mx-auto gap-1 mt-6 flex justify-center items-center bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] text-[10px] z-40"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              className="w-3 md:w-4 lg:w-3"
            >
              <path
                fill="#faf6f0"
                d="M128 252.6C128 148.4 214 64 320 64C426 64 512 148.4 512 252.6C512 371.9 391.8 514.9 341.6 569.4C329.8 582.2 310.1 582.2 298.3 569.4C248.1 514.9 127.9 371.9 127.9 252.6zM320 320C355.3 320 384 291.3 384 256C384 220.7 355.3 192 320 192C284.7 192 256 220.7 256 256C256 291.3 284.7 320 320 320z"
              />
            </svg>
            <p className="text-[12px] md:text-[14px] lg:text-[12px]">
              Lihat Peta
            </p>
          </Link>
        </div>
        <ScrollAnimation
          direction="down"
          className="absolute bottom-2 right-0 z-40"
        >
          <Image
            src="/daun-kiri.png"
            alt="Rangkaian Daun"
            width={100}
            height={80}
            className="w-[109px] h-[86px]"
          />
        </ScrollAnimation>
      </section>
      <section
        className="w-full min-h-[360px] py-12 relative bg-cover bg-center"
        style={{ backgroundImage: `url(/picture-1.jpg)` }}
      >
        <div className="overlay bg-[#2c221ead] absolute z-30 inset-0" />
        <div className="ps-3 pe-16 relative z-40 text-background">
          <h2 className="text-[32px] md:text-[48px] lg:text-[32px] font-tangerine font-bold">
            RSVP
          </h2>
          <p className="text-[10px] md:text-[14px] lg:text-[10px] pe-0 md:pe-32 lg:pe-0 font-bodoni">
            Kehadiran dan doa restu Anda adalah hadiah terindah di hari bahagia
            kami. Demi kelancaran acara, mohon bantuannya untuk mengisi
            konfirmasi kehadiran di bawah ini
          </p>
        </div>
        <RSVPForm />
        <ScrollAnimation
          direction="down"
          className="absolute -bottom-12 -right-12 z-40"
        >
          <Image
            src="/bunga-3.png"
            alt="Bunga Mawar"
            width={100}
            height={100}
            className="w-[187px] h-[123px] -rotate-90"
          />
        </ScrollAnimation>
      </section>
      <section className="w-full min-h-[195px] md:min-h-[350px] lg:min-h-[195px] grid grid-cols-1 place-items-center py-12">
        <div className=" text-center px-16">
          <h2 className="text-[32px] md:text-[48px] lg:text-[32px] font-bold font-tangerine">
            GIFT
          </h2>
          <p className="text-[10px] md:text-[14px] lg:text-[10px]">
            Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda
            kasih untuk mempelai, dapat menyalurkannya melalui rekening di bawah
            ini:
          </p>
        </div>
        <div className="flex gap-3">
          <GiftModal />
        </div>
      </section>
      <section
        className="w-full min-h-240 bg-cover bg-center relative"
        style={{ backgroundImage: "url(/cover-2.jpg)" }}
      >
        <div className="overlay bg-[#faf6f060] absolute inset-0" />
        <ScrollAnimation
          direction="down"
          className="absolute -top-6 left-0 z-40"
        >
          <Image
            src="/daun-kanan.png"
            alt="Rangkaian Daun"
            width={100}
            height={80}
            className="w-[109px] h-[86px]"
          />
        </ScrollAnimation>
        <div className="absolute bg-background w-84 md:w-140 lg:w-84 h-220 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl">
          <Image
            src="/burung-kiri.png"
            alt="Burung Merpati"
            width={200}
            height={200}
            className="w-14 h-14 md:w-20 md:h-20 lg:w-14 lg:h-14 absolute -top-8 -right-4 md:-right-8 lg:-right-4"
          />
          <FormPesan />
          <ListUcapan />
        </div>
        <ScrollAnimation
          direction="down"
          className="absolute -bottom-2 md:bottom-8 lg:-bottom-2 -right-14 z-40"
        >
          <Image
            src="/bunga-2.png"
            alt="Rangkaian Bunga"
            width={100}
            height={80}
            className="w-[180px]"
          />
        </ScrollAnimation>
      </section>
      <section
        className="w-full h-[247px] bg-cover bg-center relative"
        style={{ backgroundImage: "url(/pattern.jpg)" }}
      >
        <div className="overlay bg-[#faf6f0c5] absolute inset-0" />
        <div className="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-tangerine font-bold text-[38px] text-center text-heading">
            Om Santih, Santih, Santih, Om
          </h2>
          <p className="text-[8px] text-center ">
            Terima kasih telah menjadi bagian dari kisah perjalanan cinta kami.
            Kehadiran dan doa restu Anda adalah kado terindah di hari istimewa
            ini. <br />
            <br />
            <span className="font-bold">See you on our big day!</span>
          </p>
        </div>
      </section>
    </main>
  );
}

const InstaBtn = ({ link, username }: InstaBtnProps) => {
  return (
    <Link
      href={link}
      className="w-[117px] md:w-[140px] lg:w-[117px] h-[40px] md:h-[50px] lg:h-[40px] mx-auto mt-6 flex justify-center items-center bg-accent text-background rounded-tr-[20px] rounded-bl-[20px] text-[10px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 640 640"
        className="w-3 md:w-5 lg:w-3 xl:w-3 2xl:w-3"
      >
        <path
          fill="#faf6f0"
          d="M320.3 205C256.8 204.8 205.2 256.2 205 319.7C204.8 383.2 256.2 434.8 319.7 435C383.2 435.2 434.8 383.8 435 320.3C435.2 256.8 383.8 205.2 320.3 205zM319.7 245.4C360.9 245.2 394.4 278.5 394.6 319.7C394.8 360.9 361.5 394.4 320.3 394.6C279.1 394.8 245.6 361.5 245.4 320.3C245.2 279.1 278.5 245.6 319.7 245.4zM413.1 200.3C413.1 185.5 425.1 173.5 439.9 173.5C454.7 173.5 466.7 185.5 466.7 200.3C466.7 215.1 454.7 227.1 439.9 227.1C425.1 227.1 413.1 215.1 413.1 200.3zM542.8 227.5C541.1 191.6 532.9 159.8 506.6 133.6C480.4 107.4 448.6 99.2 412.7 97.4C375.7 95.3 264.8 95.3 227.8 97.4C192 99.1 160.2 107.3 133.9 133.5C107.6 159.7 99.5 191.5 97.7 227.4C95.6 264.4 95.6 375.3 97.7 412.3C99.4 448.2 107.6 480 133.9 506.2C160.2 532.4 191.9 540.6 227.8 542.4C264.8 544.5 375.7 544.5 412.7 542.4C448.6 540.7 480.4 532.5 506.6 506.2C532.8 480 541 448.2 542.8 412.3C544.9 375.3 544.9 264.5 542.8 227.5zM495 452C487.2 471.6 472.1 486.7 452.4 494.6C422.9 506.3 352.9 503.6 320.3 503.6C287.7 503.6 217.6 506.2 188.2 494.6C168.6 486.8 153.5 471.7 145.6 452C133.9 422.5 136.6 352.5 136.6 319.9C136.6 287.3 134 217.2 145.6 187.8C153.4 168.2 168.5 153.1 188.2 145.2C217.7 133.5 287.7 136.2 320.3 136.2C352.9 136.2 423 133.6 452.4 145.2C472 153 487.1 168.1 495 187.8C506.7 217.3 504 287.3 504 319.9C504 352.5 506.7 422.6 495 452z"
        />
      </svg>
      <p className="">@{username}</p>
    </Link>
  );
};
