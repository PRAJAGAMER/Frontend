import React, { useState } from "react";
import axios from "axios";
import Photo from "../assets/Pictures/disdukcapil.png";
import Logo from "../assets/Pictures/logodisdukcapil.png";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid"; // Import icons for eye
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginAdmin = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [nipError, setNipError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    setNipError("");
    setPasswordError("");

    let hasError = false;

    // Validasi NIP Kosong
    if (!nip || nip.trim() === "") {
      setNipError("NIP harus diisi.");
      toast.error("NIP harus diisi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      hasError = true;
    }

    // Validasi Format NIP (hanya angka)
    const nipRegex = /^[0-9]+$/;
    if (!nipRegex.test(nip)) {
      setNipError("Format NIP harus berupa angka.");
      toast.error("Format NIP harus berupa angka.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      hasError = true;
    }

    // Validasi Password Kosong
    if (!password || password.trim() === "") {
      setPasswordError("Password harus diisi.");
      toast.error("Password harus diisi.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      hasError = true;
    }

    if (hasError) return;

    try {
      // Login request
      const loginResponse = await axios.post("http://localhost:5000/api/admin/login", {
        nip,
        password,
      });

      if (loginResponse.status === 200) {
        const token = loginResponse.data.token;
        localStorage.setItem("token", token);

        const adminResponse = await axios.get("http://localhost:5000/api/admins", {
          headers: { Authorization: `Bearer ${token}` },
          params: { nip },
        });

        const adminName = adminResponse.data.adminName || adminResponse.data.name || "Admin";
        localStorage.setItem("adminName", adminName);

        toast.success("Login Berhasil", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        window.location.href = "/admin";
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401) {
            toast.error("Login gagal! NIP atau password salah.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else if (error.response.status === 500) {
            toast.error("Terjadi kesalahan server. Silakan coba lagi nanti.", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } else {
          toast.error("Terjadi kesalahan. Periksa koneksi Anda.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle show/hide password
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Bagian Gambar untuk Desktop */}
      <div className="hidden lg:flex lg:w-3/4 h-full bg-cover bg-center" style={{ backgroundImage: `url(${Photo})` }}>
        <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-40">
          <h1 className="text-white text-3xl font-bold">Mudah, Cepat, Akurat Tanpa Pungutan</h1>
        </div>
      </div>

      {/* Bagian Gambar untuk Mobile */}
      <div className="relative flex lg:hidden w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Photo})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Form Login */}
      <div className="absolute lg:relative z-10 flex justify-center items-center bg-white lg:bg-transparent py-5 md:rounded-lg md:h-[500px] md:w-[500px] lg:w-3/6 mt-48 md:mt-52 lg:mt-32 lg:ml-0 md:ml-32">
        <div className="max-w-md w-full px-8">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo" className="h-16 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-left text-gray-800">
                <span className="text-black">Masuk Akun</span> <span style={{ color: "#D24545" }}>Admin</span>
              </h2>
              <p className="font-bold text-left text-gray-800">Silahkan Masuk Ke Akun Anda</p>
            </div>
          </div>

          {error && <p className="text-red-500 text-left">{error}</p>}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-4">
              <label htmlFor="nip" className="block text-gray-700 text-left">NIP</label>
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] ${nipError ? "border-red-500" : "border-gray-300"}`}
                placeholder="NIP"
                required
              />
              {nipError && <p className="text-red-500 text-sm mt-[5px]">{nipError}</p>}
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 text-left">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] pr-12 ${passwordError ? "border-red-500" : "border-gray-300"}`}
                placeholder="Password"
                required
              />
              <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 pt-5">
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
              <div className="absolute -bottom-6 text-red-500 text-sm">
                {passwordError && <p>{passwordError}</p>}
              </div>
            </div>

            <button className="w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition mt-5">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
