import React from "react";
import Logo from "../assets/Pictures/logodisdukcapil.png";
import Beranda1 from "../assets/Pictures/beranda.svg";
import { useNavigate } from "react-router-dom";

const OpsiLogin = () => {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <img
        src={Beranda1}
        alt="Background"
        className="max-sm:h-screen max-sm:w-full max-sm:object-cover max-sm:object-center md:h-screen md:w-full md:object-cover lg:w-full"

      />

      {/* Logo Pemkot */}
      <div className="absolute top-0 w-full flex justify-center mt-10 lg:mt-32 md:mt-56  ">
        <img
          src={Logo}
          alt="Logo"
          className="h-[80px] lg:h-[90px] sm:flex max-sm:mx-auto"
        />
      </div>

      {/* Content: Login Title & Cards */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-10 text-center lg:mt-36">
        <div className="text-4xl lg:text-5xl text-white font-semibold mb-14">
          Silahkan Login
        </div>

        {/* Cards for Login Options */}
        <div className="md:flex lg:flex gap-14">
          <div
           className="bg-white text-[#D24545] hover:bg-[#D24545]  hover:text-white hover:shadow-4xl hover:scale-105 transition-all duration-300 p-10 max-sm:text-xl text-3xl font-bold rounded-xl border border-[#D24545] shadow-xl cursor-pointer mb-5 w-64 h-36 lg:w-96 lg:h-56 flex flex-col justify-center items-center"

            onClick={() => navigate("/loginadmin")}
          >
            <div className="flex flex-col items-center">
              <div>Login Admin</div>
            </div>
          </div>

          <div
            className="bg-white text-[#D24545] hover:bg-[#D24545]  hover:text-white hover:shadow-4xl hover:scale-105 transition-all duration-300 p-10 max-sm:text-xl text-3xl font-bold rounded-xl border border-[#D24545] shadow-xl cursor-pointer mb-5 w-64 h-36 lg:w-96 lg:h-56 flex flex-col justify-center items-center"
            onClick={() => navigate("/login")}
          >
            <div className="flex flex-col items-center">
              <div>Login Pengguna</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpsiLogin;
