import React from "react";
import Tentang from "./Tentang";
import Visi from "../assets/Pictures/visi_misi.jpeg";

function profileMitra() {
  return (
    <div>
      <Tentang />
      <div className="">
        <div className=" bg-red-500 h-[200px] py-10 font-bold flex flex-col items-center justify-center text-center text-2xl md:text-3xl lg:text-4xl text-white px-2 ">
          <p >Visi dan Misi </p>
          <p>Dinas Kependudukan dan Pencatatan Sipil Kota Semarang</p>
        </div>
        <div className="flex justify-center py-10 mx-10 md:mx-20">
          <img src={Visi} alt="" className="w-auto h-auto" />
        </div>
        <div className=" bg-red-500 md:h-[300px] lg:h-[400px] py-10 font-bold flex flex-col items-center justify-center text-center lg:text-4xl md:text-2xl text-white">
          <p>MOTTO </p>
          <p>Dinas Kependudukan dan Pencatatan Sipil Kota Semarang</p>
          <div className="md:py-10 lg:pt-20">" Mudah, Cepat, Akurat Tanpa Pungutan "</div>
        </div>
      </div>
    </div>
  );
}

export default profileMitra;
