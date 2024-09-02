import React from "react";
import Photo from "../assets/Pictures/disdukcapil.png";
import Logo from "../assets/Pictures/logodisdukcapil.png";

const loginAdmin = () => {
  return (
    <div className="flex lg:h-screen lg:w-screen">
      {/* Bagian Gambar untuk Desktop */}
      <div
        className="hidden lg:flex lg:w-3/4 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${Photo})` }}
      >
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <h1 className="text-white text-3xl font-bold">
            Mudah, Cepat, Akurat Tanpa Pungutan
          </h1>
        </div>
      </div>

      {/* Bagian Formulir dengan Background Gambar untuk Mobile dan Tablet */}
      <div
        className="relative flex lg:hidden w-full h-screen bg-cover bg-center "
        style={{ backgroundImage: `url(${Photo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Sisi Kanan (Bagian Formulir) */}
      <div className="absolute lg:relative z-10 flex justify-center items-center bg-white lg:bg-transparent py-5 md:rounded-md md:h-[500px] md:w-[500px] lg:w-3/6 mt-48 md:mt-52 lg:mt-32 lg:ml-0 md:ml-32">
        <div className="max-w-md w-full px-8">
          {/* Container for logo and text */}
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo" className="h-16 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-left text-gray-800">
                <span className="text-black">Masuk Akun</span>
                <span style={{ color: "#D24545" }}> Admin</span>
              </h2>
              <p className="font-bold text-left text-gray-800">
                Silahkan Masuk Ke Akun Anda
              </p>
            </div>
          </div>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-left">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-left"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]"
                placeholder="Password"
              />
            </div>
            <button className="w-full p-3 bg-[#D24545] text-white font-bold rounded-lg hover:bg-red-700 transition">
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default loginAdmin;