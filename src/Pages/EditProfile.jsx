import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import Profile from "../assets/Pictures/logodisdukcapil.png";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
// import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDataProfil, postUpdateProfil } from "../redux/Action/profileAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataProfil);
  });
  const dataEditProfile = useSelector((state) => state.profil.dataProfilUser);
  // console.log("data", dataEditProfile);

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
    fotoProfil: "https://backend-prajagamer-920196572245.asia-southeast2.run.app/uploads/" + dataEditProfile.photo,
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
      .get(`https://api.goapi.io/regional/provinsi?api_key=ce23f533-3df9-51b3-5956-fa58a7a9`)
      .then((response) => {
        // console.log("Fetched Provinces:", response.data.data);
        setProvinsiList(response.data.data);
        // console.log("Hasil Fetching", response.data.data)
      })
      .catch((error) => {
        // console.error("Error fetching provinces data:", error);
      });
  }, []);
  
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/loginopsi");
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
        `https://api.goapi.io/regional/kota?provinsi_id=${provinceId}&api_key=ce23f533-3df9-51b3-5956-fa58a7a9`
      )
      .then((response) => {
        // console.log("Fetched Cities:", response.data.data); // Verifikasi respons data
  
        if (type === "domisili") {
          setKotaListDomisili(response.data.data);
        } else if (type === "ktp") {
          setKotaListKTP(response.data.data);
        }
      })
      .catch((error) => {
        // console.error("Error fetching regencies data:", error);
      });
  };
  
  
  const handleAlamatCheckbox = async (e) => {
    const checked = e.target.checked;
    setIsAlamatSama(checked);
  
    if (checked) {
      // Menyetel alamat KTP sesuai dengan domisili jika checkbox dicentang
      setFormData((prevData) => ({
        ...prevData,
        provinsiKTP: prevData.provinsiDomisili,
        kotaKTP: prevData.kotaDomisili, // Menyetel kota KTP sama dengan kota domisili
        alamatKTP: prevData.alamatDomisili,
      }));
  
      const selectedProvince = provinsiList.find(
        (provinsi) => provinsi.name === formData.provinsiDomisili
      );
  
      if (selectedProvince) {
        try {
          const response = await axios.get(
            `https://api.goapi.io/regional/kota?provinsi_id=${selectedProvince.id}&api_key=ce23f533-3df9-51b3-5956-fa58a7a9`
          );
  
          // console.log("Fetched KTP Cities:", response.data.data);
  
          const kotaList = response.data.data;
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
          // console.error("Error fetching KTP cities:", error);
        }
      }
    }
  };
  
  

  const handleImageChange = (file) => {
    if (file) {
      // Validasi format file
      const validFormats = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  
      if (!validFormats.includes(file.type)) {
        toast.error("Format foto tidak valid! Harus PNG, JPG, atau JPEG.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return; // Keluar dari fungsi jika format tidak valid
      }
  
      if (file.size > maxSizeInBytes) {
        toast.error("Ukuran foto terlalu besar! Maksimal 5MB.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return; // Keluar dari fungsi jika ukuran file tidak valid
      }
  
      // Jika validasi lulus, buat URL untuk preview gambar
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        fotoProfil: file, // Set file yang valid
        previewFoto: previewUrl,
      }));
    }
  };

  // const handleBatalkanCrop = () => {
  //   setShowCropper(false);
  //   setFormData({ ...formData, fotoProfil: null });
  // };

  // const handleCrop = () => {
  //   if (cropper && typeof cropper.getCroppedCanvas === "function") {
  //     const croppedCanvas = cropper.getCroppedCanvas();
  //     if (croppedCanvas) {
  //       const fotoProfil = croppedCanvas.toDataURL();
  //       setFormData({ ...formData, fotoProfil });
  //       setShowCropper(false);
  //     }
  //   }
  // };

  const imageUrl =
    formData.fotoProfil instanceof File
      ? URL.createObjectURL(formData.fotoProfil)
      : formData.fotoProfil || Profile;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Jika pengguna mengunggah gambar baru, gunakan file baru
    let fotoProfil =
      formData.fotoProfil instanceof File
        ? formData.fotoProfil // Jika pengguna mengunggah gambar baru, gunakan file baru
        : dataEditProfile.photo; // Jika tidak, gunakan gambar yang lama

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
      photo: fotoProfil, // Pastikan mengirim foto yang benar
      telp_user: formData.noTelp,
    };

    // console.log("Data Handle Submit", data);
    dispatch(postUpdateProfil(data, navigate));
  };

  return (
    <div className="bg-red-500 min-h-screen flex flex-col">
      <Navbar />
      <div className=" w-full lg:w-[1100px] mx-auto bg-white rounded-2xl mt-32 mb-10 pb-6">
        <h1 className="text-3xl font-bold text-center py-8 border-b-2">
          Edit Profil
        </h1>
        <form onSubmit={handleSubmit} className="px-6">
          <div className="lg:flex my-8 gap-4">
            <div className="relative flex justify-center item mx-16">
              <img
                src={
                  formData.previewFoto ||
                  formData.fotoProfil ||
                  dataEditProfile.photo
                }
                alt="Foto Profil"
                className="w-[300px] h-[260px] md:w-[300px] md:h-[300px] lg:w-[300px] lg:h-[260px] object-cover rounded-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files[0])}
                ref={imageInputRef}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {/* Update untuk posisi icon agar di kanan bawah pada layar kecil, dan kiri bawah pada iPad */}
              <div
                onClick={() => imageInputRef.current.click()} // Memicu click pada input file
                className="absolute  bottom-0 right-2 md:right-44 md:bottom-0 lg:right-0 transform md:translate-x-[10px] md:translate-y-[5px]  bg-white p-1 rounded-full shadow-md cursor-pointer "
              >
                <PencilSquareIcon className="h-10 text-gray-600" />
              </div>
            </div>

            <div className="border rounded  p-4 lg:w-[750px] h-min">
              <label className="font-semibold block mb-2 text-xl">
                Kontak Pribadi
              </label>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full border rounded px-3 py-2  cursor-not-allowed"
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

          {/* {showCropper && (
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
                  onClick={handleBatalkanCrop}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Batalkan
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
          )} */}

          {/* INFOMRASI DATA DIRI */}
          <div className="border rounded p-4">
            <label className="font-semibold block mb-2 text-xl">
              Informasi Data Pribadi
            </label>
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              <div>
                <label className="block mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  readOnly
                  className="w-full border rounded px-3 py-2  cursor-not-allowed"
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

            <div className="lg:grid lg:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2">Nomor Induk Mahasiswa</label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  readOnly
                  className="w-full border rounded px-3 py-2  cursor-not-allowed"
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
                  readOnly
                  className="w-full border rounded px-3 py-2  cursor-not-allowed"
                />
              </div>
            </div>

            <div className="lg:grid lg:grid-cols-2 gap-4 mt-10 lg:mt-4">
              <div>
                <label className="font-semibold block mb-2 text-xl">
                  Alamat Domisili Tinggal
                </label>
                <div className="lg:mt-12">
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
                <label className="font-semibold block mb-2 text-xl mt-10 lg:mt-0">
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
          {/* INFOMRASI DATA AKADEMIK */}
          <div className="lg:grid lg:grid-cols-2 gap-4 my-8">
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
                   
                    readOnly
                    className="w-full border rounded px-3 py-2 cursor-not-allowed"
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

            <div className="border rounded p-4 mt-10 lg:mt-0">
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
