import React, { useState, useEffect, useRef } from "react";
import Header from "../ComponentsAdmin/HeaderAdmin";
import Profile from "../assets/Pictures/userprofile.svg";
import "cropperjs/dist/cropper.css";

const EditProfilAdmin = () => {
  const [formData, setFormData] = useState({
    nama: "Virnika Shefira Gina Morissa",
    universitas: "Universitas Dian Nuswantoro",
    email: "Syaifulrizal504@gmail.com",
    noTelp: "0856-4340-8961",
    nim: "A11.2021.13849",
    nik: "3374093010010001",
    tempatLahir: "",
    tanggalLahir: "",
    kotaDomisili: "",
    alamatDomisili: "",
    kotaKTP: "",
    alamatKTP: "",
    jurusan: "Teknik Informatika",
    ipk: "",
    semester: "",
    namaPembimbing: "",
    noTelpPembimbing: "",
    emailPembimbing: "",
    fotoProfil: null,
    croppedImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // Add your axios post request or any API call here
  };

  const imageUrl = formData.fotoProfil
    ? URL.createObjectURL(formData.fotoProfil)
    : Profile;

  return (
    <div className="flex flex-col h-screen">
      <Header className="relative z-20" />

      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Edit Profil Admin</h3>
        </div>
        <form onSubmit={handleSubmit} className="w-96">
          <div className="border rounded p-4">
            <div className="grid gap-4">
              <div>
                <label className="block mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama" // Corrected to match formData
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">NIM</label>
                <input
                  type="text"
                  name="tempatLahir" // Corrected to match formData
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">No. Telp</label>
                <input
                  type="text"
                  name="noTelp" // Corrected to match formData
                  value={formData.noTelp}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="text"
                  name="email" // Corrected to match formData
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-red-600 text-white flex flex-row justify-center px-32 py-3 rounded-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilAdmin;
