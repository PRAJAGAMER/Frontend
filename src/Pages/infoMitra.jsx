import React, { useState } from "react";
import Navbar from "../Components/navbar";
import Background from "../assets/Pictures/bgmitra.svg";
import Disdukcapil from "../assets/Pictures/disdukcapil2.svg";
import Mitra from "../Components/profileMitra";
import Bidang from "../Components/Bidang";
import LayananTPDK from "../Components/layananTPDK";
import Footer from "../Components/Footer";


function InfoMitra() {
  const [activeComponent, setActiveComponent] = useState("Profil");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Profil":
        return <Mitra />;
      case "Bidang":
        return <Bidang />;
      case "Pelayanan TPDK":
        return <LayananTPDK />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <div className="relative">
        <img
          src={Background}
          alt="Background"
          className="max-sm:h-screen max-sm:w-full w-full max-sm:object-cover max-sm:object-center h-[250px] md:h-[600px] object-cover "
        />
        <div className="absolute inset-0 flex flex-col md:flex-row justify-between items-center mx-4 md:mx-20 mb-10 md:mb-40 mt-60">
          <div className="text-center md:text-left gap-5">
            <p className="text-white font-bold text-2xl md:text-5xl pb-2 md:pb-3">
              Belajar, Bertumbuh, dan{" "}
              <span className="text-[#FFCC4E]"> Berkontribusi</span>
            </p>
            <p className="text-white font-bold text-lg md:text-2xl">
              Bersama <span className="text-[#FFCC4E]">DISDUKCAPIL </span> Kota
              Semarang
            </p>
            <p className="text-white text-md md:text-xl mt-2 md:mt-4 ">
              Dengan lowongan magang, kami siap membantu anda belajar lebih jauh
              tentang dunia kerja
            </p>
          </div>
          <img
            src={Disdukcapil}
            alt="Disdukcapil"
            className=" hidden lg:block h-[150px] md:h-[250px] object-contain"
          />
        </div>
      </div>

      {/* Button Pilihan Menu */}
      <div className="absolute inset-0 bg-white h-[280px] md:h-[120px] lg:h-[120px] shadow-lg rounded-lg flex flex-col  justify-center items-end translate-y-72 px-5 py-5 md:px-10  mx-4 md:mx-7 mt-60">
        <div className="flex flex-col md:flex-row gap-5 md:gap-5 justify-center items-center w-full">
          <button
            className={`py-2 md:py-5 w-full md:w-64 border-2 font-bold rounded-xl text-xl md:text-2xl transition-colors duration-300 ${
              activeComponent === "Profil"
                ? "bg-red-500 text-white"
                : "border-[#D24545] hover:bg-red-500 hover:text-white"
            }`}
            onClick={() => setActiveComponent("Profil")}
          >
            Profil
          </button>
          <button
            className={`py-2 md:py-5 w-full md:w-64 border-2 font-bold rounded-xl text-xl md:text-2xl transition-colors duration-300 ${
              activeComponent === "Bidang"
                ? "bg-red-500 text-white"
                : "border-[#D24545] hover:bg-red-500 hover:text-white"
            }`}
            onClick={() => setActiveComponent("Bidang")}
          >
            Bidang
          </button>
          <button
            className={`py-2 md:py-5 w-full md:w-64 border-2 font-bold rounded-xl text-xl md:text-2xl transition-colors duration-300 ${
              activeComponent === "Pelayanan TPDK"
                ? "bg-red-500 text-white"
                : "border-[#D24545] hover:bg-red-500 hover:text-white"
            }`}
            onClick={() => setActiveComponent("Pelayanan TPDK")}
          >
            Pelayanan TPDK
          </button>
        </div>
      </div>

      {/* Detail Section */}
      <div className="mt-28">{renderComponent()}</div>

      <Footer />
    </div>
  );
}

export default InfoMitra;
