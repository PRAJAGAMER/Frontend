import React, { useState } from "react";
import Photo from "../assets/Pictures/disdukcapil.png";
import Logo from "../assets/Pictures/logodisdukcapil.png";
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import toastify
import { login } from "../redux/Action/authAction";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [nikError, setNikError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handlePasswordNik = (e) => {
    setNik(e.target.value);
    setNikError("");

    const input = e.target.value;

    // Cek apakah input hanya mengandung angka
    const isNumeric = /^[0-9]*$/.test(input);

    // Validasi: hanya angka diperbolehkan dan maksimal 16 digit
    if (isNumeric && input.length <= 16) {
      setNik(input);
      setNikError(""); // Hapus pesan error jika input valid
    } else {
      setNikError("NIK harus berupa angka dan maksimal 16 digit.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Validasi NIK Kosong
    if (!nik || nik.trim() === "") {
      setNikError("NIK harus diisi.");
      hasError = true;
    } else {
      // Validasi Format NIK (hanya angka)
      const nikRegex = /^[0-9]+$/;
      if (!nikRegex.test(nik)) {
        setNikError("Format NIK harus berupa angka.");
        hasError = true;
      } else {
        setNikError(""); // Clear error if NIK is valid
      }
    }

    // Validasi Password Kosong
    if (!password || password.trim() === "") {
      setPasswordError("Password harus diisi.");
      hasError = true;
    }

    if (hasError) return;

    // Data untuk dikirim
    let data = { nik, password };
    dispatch(login(data, navigate));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle show/hide password
  };

  return (
    <div className="flex h-screen w-screen">
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

      <div
        className="relative flex lg:hidden w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Photo})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="absolute rounded-t-xl lg:relative z-10 flex justify-center items-center bg-white lg:bg-transparent py-5 md:rounded-lg md:h-[500px] md:w-[500px] lg:w-3/6 mt-48 md:mt-52 lg:mt-32 lg:ml-0 md:ml-32">
        <div className="max-w-md w-full px-8">
          <div className="flex items-center mb-6">
            <img src={Logo} alt="Logo" className="h-16 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-left text-gray-800">
                <span className="text-black">Masuk</span>{" "}
                <span style={{ color: "#D24545" }}>Akun</span>
              </h2>
              <p className="font-bold text-left text-gray-800">
                Silahkan Masuk Ke Akun Anda
              </p>
            </div>
          </div>

          {error && <p className="text-red-600 text-center">{error}</p>}

          <form onSubmit={handleLogin} noValidate>
            <div className="mb-4">
              <label htmlFor="nik" className="block text-gray-700 text-left">
                NIK
              </label>
              <input
                type="text"
                id="nik"
                value={nik}
                onChange={handlePasswordNik}
                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] ${
                  nikError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="NIK"
                required
                maxLength={16} // Membatasi input hanya sampai 16 karakter
              />
              {nikError && (
                <p className="text-red-500 text-sm mt-[5px]">{nikError}</p>
              )}
            </div>

            <div className="mb-6 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 text-left"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] pr-12 ${
                  passwordError ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 pt-5"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
              <div className="absolute -bottom-6 text-red-500 text-sm">
                {passwordError && <p>{passwordError}</p>}
              </div>
            </div>
            <button className="w-full p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-700 transition mt-5">Masuk</button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Belum punya akun?{" "}
            <button
              className="text-[#D24545] hover:underline"
              onClick={() => navigate("/register")}
            >
              Daftar sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
