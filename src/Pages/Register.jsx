import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderImage from "../assets/Pictures/disdukcapil.png";
import BackgroundImage from "../assets/Pictures/logodisdukcapil.png";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // Import axios untuk melakukan HTTP request
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nim: "",
    nik: "",
    password: "",
    email: "",
    noTelp: "",
    asalUniversitas: "",
    jurusan: "",
    photo: null,
    cv: null,
    score_list: null,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validate = () => {
    let errors = {};

    const {
      nik,
      namaLengkap,
      nim,
      password,
      email,
      noTelp,
      asalUniversitas,
      jurusan,
      photo,
      cv,
      score_list,
    } = formData;

    // Validasi NIK
    if (!nik) {
      errors.nik = "NIK harus diisi.";
    } else if (!/^\d{16}$/.test(nik)) {
      errors.nik = "NIK harus terdiri dari 16 angka.";
    }

    // Validasi Nama Lengkap
    if (!namaLengkap) {
      errors.namaLengkap = "Nama lengkap harus diisi.";
    } else if (!/^[A-Za-z\s]+$/.test(namaLengkap)) {
      errors.namaLengkap = "Nama hanya boleh terdiri dari huruf dan spasi.";
    }

    // Validasi NIM
    if (!nim) {
      errors.nim = "NIM harus diisi.";
    }

    // Validasi Password
    if (!password) {
      errors.password = "Password harus diisi.";
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password =
        "Password terdiri minimal 8 karakter, 1 huruf kapital dan 1 angka.";
    }

    // Validasi Email
    if (!email) {
      errors.email = "Email harus diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Format email tidak valid.";
    }

    // Validasi Nomor Telepon
    if (!noTelp) {
      errors.noTelp = "Nomor telepon harus diisi.";
    } else if (!/^\d+$/.test(noTelp)) {
      errors.noTelp = "Nomor telepon hanya boleh terdiri dari angka.";
    }

    // Validasi Asal Universitas
    if (!asalUniversitas) {
      errors.asalUniversitas = "Asal Universitas harus diisi.";
    }

    // Validasi Jurusan
    if (!jurusan) {
      errors.jurusan = "Jurusan harus diisi.";
    }

    // Validasi Foto
    if (!photo) {
      errors.photo = "Foto harus diunggah.";
    }

    // Validasi CV
    if (!cv) {
      errors.cv = "CV harus diunggah.";
    }

    // Validasi Transkip Nilai
    if (!score_list) {
      errors.score_list = "Transkip Nilai harus diunggah.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.namaLengkap);
    formDataToSend.append("nim", formData.nim);
    formDataToSend.append("nik", formData.nik);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("telp", formData.noTelp);
    formDataToSend.append("universitas", formData.asalUniversitas);
    formDataToSend.append("major", formData.jurusan);
    formDataToSend.append("photo", formData.photo);
    formDataToSend.append("cv", formData.cv);
    formDataToSend.append("score_list", formData.score_list);
    console.log("response1", formDataToSend);

    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/register",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          console.log("response", response);
          toast.success("Berhasil Registrasi", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          navigate("/login");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error("Registrasi gagal. Silakan coba lagi!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gray-100 relative">
      {/* Background Image */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-cover opacity-20"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-16 relative rounded-b-3xl">
          <img
            src={HeaderImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
            <span className="text-black">Registrasi</span>{" "}
            <span className="text-white">Akun</span>
          </h2>
          <p className="text-center text-lg relative z-10">
            Daftar Akun Anda Untuk Dapat Mendaftar Magang
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex justify-center items-center px-4 py-8"
        >
          <div className="bg-transparent rounded-lg p-8 w-full max-w-4xl flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input Section - Left Side */}
              <div className="flex flex-col ">
                {/* NIK */}
                <div className="mb-4">
                  <label
                    htmlFor="nik"
                    className="font-semibold text-gray-700 text-left"
                  >
                    NIK
                  </label>
                  <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${errors.nik ? "border-red-500" : "border-gray-300"}`}
                    placeholder="NIK"
                  />
                </div>
                <div className="min-h-[24px]">
                  {errors.nik && (
                    <span className="text-red-500 text-sm mt-[-8px]">
                      {errors.nik}
                    </span>
                  )}
                </div>

                {/* Nama Lengkap */}
                <div className="mb-4">
                  <label
                    htmlFor="namaLengkap"
                    className="font-semibold text-gray-700 text-left"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="namaLengkap"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${
                        errors.namaLengkap
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    placeholder="Nama Lengkap"
                  />
                  <div className="min-h-[24px]">
                    {errors.namaLengkap && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.namaLengkap}
                      </span>
                    )}
                  </div>
                </div>

                {/* NIM */}
                <div className="mb-4">
                  <label
                    htmlFor="nim"
                    className="font-semibold text-gray-700 text-left"
                  >
                    NIM
                  </label>
                  <input
                    type="text"
                    id="nim"
                    name="nim"
                    value={formData.nim}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${errors.nim ? "border-red-500" : "border-gray-300"}`}
                    placeholder="NIM"
                  />
                  <div className="min-h-[24px]">
                    {errors.nim && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.nim}
                      </span>
                    )}
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="password"
                    className="font-semibold text-gray-700 text-left"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] pr-12
                        ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Password"
                    />
                    <div className="min-h-[24px]">
                      {errors.password && (
                        <span className="text-red-500 text-sm mt-[-8px]">
                          {errors.password}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 px-3 pb-5 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Input Section - Right Side */}
              <div className="flex flex-col ">
                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-700 text-left"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] "
                      placeholder="Email ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                    placeholder="Email"
                  />
                  <div className="min-h-[24px]">
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* No. Telp */}
                <div className="mb-4">
                  <label
                    htmlFor="noTelp"
                    className="font-semibold text-gray-700 text-left"
                  >
                    No. Telp
                  </label>
                  <input
                    type="text"
                    id="noTelp"
                    name="noTelp"
                    value={formData.noTelp}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${errors.noTelp ? "border-red-500" : "border-gray-300"}`}
                    placeholder="No. Telp"
                  />
                  <div className="min-h-[24px]">
                    {errors.noTelp && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.noTelp}
                      </span>
                    )}
                  </div>
                </div>

                {/* Asal Universitas */}
                <div className="mb-4">
                  <label
                    htmlFor="asalUniversitas"
                    className="font-semibold text-gray-700 text-left"
                  >
                    Asal Universitas
                  </label>
                  <input
                    type="text"
                    id="asalUniversitas"
                    name="asalUniversitas"
                    value={formData.asalUniversitas}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${
                        errors.asalUniversitas
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    placeholder="Asal Universitas"
                  />
                  <div className="min-h-[24px]">
                    {errors.asalUniversitas && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.asalUniversitas}
                      </span>
                    )}
                  </div>
                </div>

                {/* Jurusan */}
                <div className="mb-4">
                  <label
                    htmlFor="jurusan"
                    className="font-semibold text-gray-700 text-left"
                  >
                    Jurusan
                  </label>
                  <input
                    type="text"
                    id="jurusan"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
                      ${errors.jurusan ? "border-red-500" : "border-gray-300"}`}
                    placeholder="Jurusan"
                  />
                  <div className="min-h-[24px]">
                    {errors.jurusan && (
                      <span className="text-red-500 text-sm mt-[-8px]">
                        {errors.jurusan}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Section */}
            <div className="space-y-6">
              {/* Upload Foto */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">Upload Foto</label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="photo"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.photo ? formData.photo.name : "Upload Foto"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format JPG atau PNG dengan ukuran maksimal 5 MB.
                </p>
                {errors.photo && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.photo}
                  </span>
                )}
              </div>

              {/* Upload CV */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">Upload CV</label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="cv"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.cv ? formData.cv.name : "Upload CV"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
                {errors.cv && (
                  <span className="text-red-500 text-sm mt-1">{errors.cv}</span>
                )}
              </div>

              {/* Upload Transkrip Nilai */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">
                  Upload Transkrip Nilai
                </label>
                <div className="flex items-center">
                  <label className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300">
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      name="score_list"
                      onChange={handleFileChange}
                    />
                  </label>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData.score_list
                      ? formData.score_list.name
                      : "Upload Transkrip Nilai"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
                {errors.score_list && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.score_list}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-10 bg-red-500 text-white font-semibold rounded-lg"
            >
              Simpan
            </button>

            {/* Buttons Section */}
            <div className="flex justify-center space-x-8">
              <p className="mt-6 text-center text-gray-600">
                Sudah punya akun?{" "}
                <button
                  className="text-[#D24545] hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        </form>

        {/* Footer Section */}
        <div className="text-center w-full bg-gradient-to-t from-red-500 to-red-700 text-white py-6 relative z-10 rounded-t-3xl flex justify-center items-center">
          <p className="text-sm">© 2024 Disdukcapil. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
