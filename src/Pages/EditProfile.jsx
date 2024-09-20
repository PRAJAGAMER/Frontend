import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import Profile from "../assets/Pictures/logodisdukcapil.png";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataProfil, postUpdateProfil } from "../redux/Action/profileAction";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataProfil);
  });
  const dataEditProfile = useSelector((state) => state.profil.dataProfilUser);
  console.log("data", dataEditProfile);

  const [formData, setFormData] = useState({
    nama: dataEditProfile.name,
    universitas: dataEditProfile.university,
    email: dataEditProfile.email,
    noTelp: dataEditProfile.telp,
    nim: dataEditProfile.nim,
    nik: dataEditProfile.nik,
    tempatLahir: dataEditProfile.place_birth,
    tanggalLahir: dataEditProfile.birth_date,
    kotaDomisili: dataEditProfile.city_domicile,
    alamatDomisili: dataEditProfile.address_domicile,
    kotaKTP: dataEditProfile.city_ktp,
    alamatKTP: dataEditProfile.address_ktp,
    jurusan: dataEditProfile.major,
    ipk: dataEditProfile.ipk,
    semester: dataEditProfile.semester,
    namaPembimbing: dataEditProfile.name_supervisor,
    noTelpPembimbing: dataEditProfile.telp_supervisor,
    emailPembimbing: dataEditProfile.email_supervisor,
    fotoProfil: dataEditProfile.photo,
    provinsiDomisili: dataEditProfile.province_domicile,
    provinsiKTP: dataEditProfile.province_ktp,
  });

  const [provinsiList, setProvinsiList] = useState([]);
  const [kotaListDomisili, setKotaListDomisili] = useState([]);
  const [kotaListKTP, setKotaListKTP] = useState([]);
  const [cropper, setCropper] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [isAlamatSama, setIsAlamatSama] = useState(false);
  const imageInputRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
      .then((response) => {
        setProvinsiList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching provinces data:", error);
      });
  }, []);

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "provinsiDomisili" ||
      name === "kotaDomisili" ||
      name === "alamatDomisili"
    ) {
      setIsAlamatSama(false);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        provinsiKTP: "",
        kotaKTP: "",
        alamatKTP: "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    if (name === "provinsiDomisili") {
      const selectedProvince = provinsiList.find(
        (provinsi) => provinsi.name === value
      );
      if (selectedProvince) {
        fetchKota(selectedProvince.id, "domisili");
      }
    } else if (name === "provinsiKTP") {
      const selectedProvince = provinsiList.find(
        (provinsi) => provinsi.name === value
      );
      if (selectedProvince) {
        fetchKota(selectedProvince.id, "ktp");
      }
    }
  };

  const fetchKota = (provinceId, type) => {
    axios
      .get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      )
      .then((response) => {
        if (type === "domisili") {
          setKotaListDomisili(response.data);
        } else if (type === "ktp") {
          setKotaListKTP(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching regencies data:", error);
      });
  };

  const handleAlamatCheckbox = async (e) => {
    const checked = e.target.checked;
    setIsAlamatSama(checked);

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        provinsiKTP: prevData.provinsiDomisili,
        alamatKTP: prevData.alamatDomisili,
      }));

      const selectedProvince = provinsiList.find(
        (provinsi) => provinsi.name === formData.provinsiDomisili
      );

      if (selectedProvince) {
        try {
          const response = await axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince.id}.json`
          );

          const kotaList = response.data;

          setKotaListKTP(kotaList);

          const matchingKota = kotaList.find(
            (kota) => kota.name === formData.kotaDomisili
          );

          if (matchingKota) {
            setFormData((prevData) => ({
              ...prevData,
              kotaKTP: matchingKota.name,
            }));
          }
        } catch (error) {
          console.error("Error fetching KTP cities:", error);
        }
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, fotoProfil: file });
      setShowCropper(true);
    }
  };

  const handleCancelCrop = () => {
    setShowCropper(false);
    setFormData({ ...formData, fotoProfil: null });
  };

  const handleCrop = () => {
    if (cropper && typeof cropper.getCroppedCanvas === "function") {
      const croppedCanvas = cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const fotoProfil = croppedCanvas.toDataURL();
        setFormData({ ...formData, fotoProfil });
        setShowCropper(false);
      }
    }
  };

  const handleSubmit = (e) => {
    let data = {
      ipk: formData.ipk,
      semester: formData.semester,
      place_birth: formData.tempatLahir,
      birth_date: formData.tanggalLahir,
      address_domicile: formData.alamatDomisili,
      address_ktp: formData.alamatKTP,
      name_supervisor: formData.namaPembimbing,
      telp_supervisor: formData.noTelpPembimbing,
      email_supervisor: formData.emailPembimbing,
      province_domicile: formData.provinsiDomisili,
      city_domicile: formData.kotaDomisili,
      province_ktp: formData.provinsiKTP,
      city_ktp: formData.kotaKTP,
      // photo: formData.fotoProfil,
      // major: formData.jurusan,
    };
    e.preventDefault();
    console.log("Data Handle Submit", data);
    dispatch(postUpdateProfil(data, navigate));
  };

  const imageUrl =
    formData.fotoProfil instanceof File
      ? URL.createObjectURL(formData.fotoProfil)
      : Profile;

  return (
    <div className="bg-[#D24545] min-h-screen flex flex-col">
      <Navbar />
      <div className="w-[1100px] mx-auto bg-white rounded-2xl mt-32 mb-10 pb-6">
        <h1 className="text-3xl font-bold text-center py-8 border-b-2">
          Edit Profil
        </h1>
        <form onSubmit={handleSubmit} className="px-6">
          <div className="flex my-8 gap-4">
            <div className="relative justify-center mx-16">
              <img
                src={formData.fotoProfil || imageUrl}
                alt="Foto Profil"
                className="w-[300px] object-cover rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInputRef}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="absolute bottom-0 right-0 transform translate-x-[-5px] translate-y-[-25px] bg-white p-1 rounded-full shadow-md cursor-pointer">
                <PencilSquareIcon className="h-10 text-gray-600" />
              </div>
            </div>
            <div className="border rounded p-4 w-[750px] h-min">
              <label className="font-semibold block mb-2 text-xl">
                Kontak Pribadi
              </label>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">No. Telp</label>
                <input
                  type="text"
                  name="noTelp"
                  value={formData.noTelp}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>

          {showCropper && (
            <div className="border rounded p-4 mb-4">
              <label className="font-semibold block mb-2 text-xl">
                Crop Foto Profil
              </label>
              <Cropper
                src={imageUrl}
                style={{ height: 400, width: "100%" }}
                initialAspectRatio={1}
                aspectRatio={1}
                guides={false}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCrop}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Crop
                </button>
              </div>
            </div>
          )}

          <div className="border rounded p-4">
            <label className="font-semibold block mb-2 text-xl">
              Informasi Data Pribadi
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">Tempat Lahir</label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2">Nomor Induk Mahasiswa</label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">Tanggal Lahir</label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block mb-2">Nomor Induk Kependudukan</label>
                <input
                  type="text"
                  name="nik"
                  value={formData.nik}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="font-semibold block mb-2 text-xl">
                  Alamat Domisili Tinggal
                </label>
                <div className="mt-12">
                  <label className="block mb-2">Provinsi</label>
                  <select
                    name="provinsiDomisili"
                    value={formData.provinsiDomisili}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinsiList.map((provinsi) => (
                      <option key={provinsi.id} value={provinsi.name}>
                        {provinsi.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block mb-2">Kota/Kabupaten</label>
                  <select
                    name="kotaDomisili"
                    value={formData.kotaDomisili}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {kotaListDomisili.map((kota) => (
                      <option key={kota.id} value={kota.name}>
                        {kota.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block mb-2">Alamat Domisili</label>
                  <textarea
                    name="alamatDomisili"
                    value={formData.alamatDomisili}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                    style={{ resize: "none" }}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-2 text-xl">
                  Alamat Domisili KTP
                </label>
                <div className="mt-4">
                  <input
                    type="checkbox"
                    checked={isAlamatSama}
                    onChange={handleAlamatCheckbox}
                  />
                  <label className="ml-2">
                    Alamat Domisili sama dengan Alamat KTP
                  </label>
                </div>
                <div className="mt-2">
                  <label className="block mb-2">Provinsi</label>
                  <select
                    name="provinsiKTP"
                    value={formData.provinsiKTP}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={isAlamatSama}
                  >
                    <option value="">Pilih Provinsi</option>
                    {provinsiList.map((provinsi) => (
                      <option key={provinsi.id} value={provinsi.name}>
                        {provinsi.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block mb-2">Kota/Kabupaten</label>
                  <select
                    name="kotaKTP"
                    value={formData.kotaKTP}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    disabled={isAlamatSama}
                  >
                    <option value="">Pilih Kota/Kabupaten</option>
                    {kotaListKTP.map((kota) => (
                      <option key={kota.id} value={kota.name}>
                        {kota.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-2">
                  <label className="block mb-2">Alamat KTP</label>
                  <textarea
                    name="alamatKTP"
                    value={formData.alamatKTP}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                    style={{ resize: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 my-8">
            <div className="border rounded p-4">
              <label className="font-semibold block mb-2 text-xl">
                Informasi Akademik
              </label>
              <div className="">
                <div>
                  <label className="block mb-2">Jurusan</label>
                  <input
                    type="text"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2">IPK</label>
                  <input
                    type="text"
                    name="ipk"
                    value={formData.ipk}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div>
                  <label className="block mb-2">Semester</label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div className="border rounded p-4">
              <label className="font-semibold block mb-2 text-xl">
                Pembimbing
              </label>
              <div>
                <label className="block mb-2">Nama Pembimbing</label>
                <input
                  type="text"
                  name="namaPembimbing"
                  value={formData.namaPembimbing}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mt-4">
                <div>
                  <label className="block mb-2">No. Telp Pembimbing</label>
                  <input
                    type="text"
                    name="noTelpPembimbing"
                    value={formData.noTelpPembimbing}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2">Email Pembimbing</label>
                  <input
                    type="email"
                    name="emailPembimbing"
                    value={formData.emailPembimbing}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
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
      <Footer />
    </div>
  );
};

export default EditProfilePage;