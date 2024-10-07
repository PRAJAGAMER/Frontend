import React from "react";
import Navbar from "../Components/navbar";
import Tentang from "../Components/Tentang";
import Logo from "../assets/Pictures/logodisdukcapil.png";
import Beranda1 from "../assets/Pictures/beranda.svg";
import fotoBeranda from "../assets/Pictures/fotoberanda.svg";
import Footer from "../Components/Footer";
import Mitra from "../Components/mitra";
import { useNavigate } from "react-router-dom";

const Beranda = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        src={Beranda1}
        alt=""
        className="max-sm:h-screen max-sm:w-full max-sm:object-cover max-sm:object-center lg:w-full lg:mt-[-100px]"
      />
      <div className="absolute inset-0">
        <Navbar />
      </div>

      <div className="mt-[200px] md:flex px-10 text-center lg:flex lg:justify-center lg:mt-64 lg:py-10 absolute inset-0">
        <img
          src={Logo}
          alt="Logo"
          className="h-[80px] lg:h-[90px] sm:flex max-sm:mx-auto"
        />
        <div className="flex items-center flex-col max-md:mt-8">
          <div className="text-4xl lg:text-5xl text-white font-semibold">
            Praktik Kerja dan Magang Merdeka
          </div>
          <div className="text-xl lg:text-2xl pt-3 text-white font-semibold">
            Dinas Kependudukan dan Pencacatan Sipil Kota Semarang{" "}
          </div>
          <button
            className="mt-10 lg:mt-20 bg-white text-[#D24545] py-4 px-20 max-sm:text-xl text-2xl font-semibold rounded-xl border-[#D24545] shadow-xl"
            onClick={() => navigate("/daftarmagang")}
          >
            Daftar Magang
          </button>
        </div>
      </div>
      <Tentang />
      <div className="bg-gradient-to-l from-[#A94438] to-[#D24545] flex h-[250px]  lg:px-20">
        <div className="hidden lg:flex items-end">
          <img src={fotoBeranda} alt="" className="h-[350px] object-cover" />
        </div>
        <div className="flex justify-center flex-col pl-0 md:pl-5 lg:pl-10 font-semibold text-center lg:text-left">
          <p className="text-lg md:text-3xl lg:text-3xl text-white">
            Kesempatan Terbaik untuk{" "}
            <span className="text-[#FFF382]">Mahasiswa</span> yang Sedang
            Mencari <span className="text-[#FFF382]">Pengalaman </span>Bekerja
          </p>
          <p className="text-sm md:text-xl lg:text-xl text-white py-2 md:py-3">
            Segera Daftarkan dirimu sekarang!
          </p>
          <div className="flex justify-center lg:justify-start">
           
          </div>
        </div>
      </div>

      <Mitra />
      <Footer />
    </div>
  );
};

export default Beranda;
