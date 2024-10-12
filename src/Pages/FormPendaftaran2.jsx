import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // Import Heroicon
import { useDispatch, useSelector } from "react-redux"; // Import useSelector untuk mengambil state dari Redux
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import {
  getDataPendaftaran,
  postPendaftaranMagang,
} from "../redux/Action/formPendaftaranAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPendaftaran2() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const dispatch = useDispatch();
  // State for checkbox
  const [isChecked, setIsChecked] = useState(false);
  const dataPendaftaran = useSelector((state) => state.pendaftaran.dataPendaf);
  // console.log("data xxxxxx", dataPendaftaran);

  const [formData2, setFormData2] = useState({
    suratRekomendasi: null,
    cv: dataPendaftaran?.cv,
    portofolio: null,
    durasiAwal: "",
    durasiAkhir: "",
  });

  // Get the token from the Redux state
  const token = useSelector((state) => state.auth.token);
  const formKetersediaan = useSelector(
    (state) => state.pendaftaran.dataFormPendaf.ketersediaanPenempatan
  );
  // console.log("ketersediaan tempat",formKetersediaan)

  // Redirect to login if token is not present
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); // Run effect when token or navigate changes

  useEffect(() => {
    dispatch(getDataPendaftaran());
  }, []);

 // Handle change for Tanggal Mulai
 const handleTanggalMulaiChange = (event) => {
  const selectedDate = new Date(event.target.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to 00:00 for accurate comparison

  if (selectedDate < today) {
    toast.warning("Tanggal mulai tidak boleh kurang dari hari ini.");
  } else {
    setFormData2((prevData) => ({
      ...prevData,
      durasiAwal: event.target.value, // Update durasiAwal
      durasiAkhir: "", // Reset durasiAkhir when durasiAwal is changed
    }));
  }
};

// Handle change for Tanggal Selesai
const handleTanggalSelesaiChange = (event) => {
  const tanggalMulai = new Date(formData2.durasiAwal);
  const selectedEndDate = new Date(event.target.value);
  const minEndDate = new Date(tanggalMulai);
  minEndDate.setDate(tanggalMulai.getDate() + 30); // Add 30 days to Tanggal Mulai

  if (selectedEndDate < minEndDate) {
    toast.warning(
      "Tanggal selesai harus minimal 30 hari setelah tanggal mulai."
    );
  } else {
    setFormData2((prevData) => ({
      ...prevData,
      durasiAkhir: event.target.value, // Update durasiAkhir
    }));
  }
};

// Calculate min date for "Tanggal Selesai" input
const getMinEndDate = () => {
  if (!formData2.durasiAwal) return "";
  const tanggalMulai = new Date(formData2.durasiAwal);
  const minEndDate = new Date(tanggalMulai);
  minEndDate.setDate(tanggalMulai.getDate() + 30); // Add 30 days
  return minEndDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};
  // Handle change for Tanggal Selesai
  const handlePortofolioChange = (event) => {
    setFormData2((prevData) => ({
      ...prevData,
      portofolio: event.target.value, // Update durasiAkhir
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formKetersediaan ||
      !formData2.durasiAwal ||
      !formData2.durasiAkhir ||
      !formData2.suratRekomendasi ||
      !formData2.cv
    ) {
      toast.warn("Harap lengkapi semua field yang diperlukan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // Tambahkan return agar fungsi berhenti jika validasi gagal
    }

    // Validation
    if (!isChecked) {
      toast.warn("Harap centang syarat dan ketentuan!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // Tambahkan return agar fungsi berhenti jika validasi gagal
    }

    // Prepare data
    let data = {
      available_space: formKetersediaan,
      first_period: formData2?.durasiAwal,
      last_period: formData2?.durasiAkhir,
      recommend_letter: formData2.suratRekomendasi,
      cv: formData2?.cv,
      portofolio: formData2?.portofolio,
    };

    console.log("data handle submit", data);

    // Dispatch action
    dispatch(postPendaftaranMagang(data, navigate));
  };

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

  // Fungsi validasi file
  const validateFile = (file) => {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const isPdf = fileExtension === "pdf";
    const isUnderMaxSize = file.size <= MAX_FILE_SIZE;
  
    if (!isPdf) {
      toast.warning("File harus berformat PDF.");
      return false;
    }
  
    if (!isUnderMaxSize) {
      toast.warning("Ukuran file tidak boleh lebih dari 5 MB.");
      return false;
    }
  
    return true;
  };
  
  const fileInputRefForData = useRef(null);
  
  const handleClickForData = () => {
    if (fileInputRefForData.current) {
      fileInputRefForData.current.click();
    }
  };
  
  const handleFileChangeForData = (file) => {
    if (file) {
      if (file instanceof File) {
        if (validateFile(file)) {
          const fileUrl = URL.createObjectURL(file); // Create Blob URL
          setFormData2((prev) => ({
            ...prev,
            suratRekomendasi: file, // Simpan file asli
            suratRekomendasiUrl: fileUrl, // Simpan Blob URL untuk preview
          }));
        }
      } else {
        console.error("File is not valid");
      }
    }
  };
  
  const fileInputRefForCV = useRef(null);
  
  const handleClickForCv = () => {
    if (fileInputRefForCV.current) {
      fileInputRefForCV.current.click();
    }
  };
  
  const handleFileChangeForCv = (file) => {
    if (file) {
      if (file instanceof File) {
        if (validateFile(file)) {
          const fileUrl = URL.createObjectURL(file);
          setFormData2((prev) => ({
            ...prev,
            cv: file,
            cvUrl: fileUrl,
          }));
        }
      } else {
        console.error("File is not valid");
      }
    }
  };
  
  const fileInputRefForPorto = useRef(null);
  
  const handleClickForPorto = () => {
    if (fileInputRefForPorto.current) {
      fileInputRefForPorto.current.click();
    }
  };
  
  const handleFileChangeForPorto = (file) => {
    if (file) {
      if (file instanceof File) {
        if (validateFile(file)) {
          const fileUrl = URL.createObjectURL(file);
          setFormData2((prev) => ({
            ...prev,
            portofolio: file,
            portofolioUrl: fileUrl,
          }));
        }
      } else {
        console.error("File is not valid");
      }
    }
  };

  return (
    <div className="bg-red-500 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-24 mb-3 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-3/5">
          <div className="mb-6">
            {/* Tombol Kembali */}
            <button
              onClick={() => navigate("/formpendaftaran1")} // Ganti dengan link tujuan
              className="text-red-600 font-semibold flex items-center mb-4"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Kembali
            </button>
            <div className="flex justify-between items-center border-b-2 border-black pb-4">
              <h2 className="text-2xl font-bold">Daftar Ke Lowongan</h2>
              <span className="text-xl">2/2</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Dokumen Pendukung</h3>

              {/* Surat Rekomendasi */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">
                  Surat Rekomendasi/ Permohonan
                </label>
                <p className="text-gray-500 text-sm mb-4">
                  Silahkan unggah surat kamu
                </p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300"
                    onClick={() => handleClickForData()}
                  >
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRefForData}
                      onChange={(e) =>
                        handleFileChangeForData(e.target.files[0])
                      }
                    />
                  </button>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData2?.suratRekomendasi
                      ? formData2?.suratRekomendasi.name
                      : "Upload Surat Rekomendasi / Permohonan"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>

                {/* Tombol Preview */}
                {formData2?.suratRekomendasiUrl && (
                  <a
                    href={formData2.suratRekomendasiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Preview Surat Rekomendasi
                  </a>
                )}
              </div>

              {/* Curriculum Vitae */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">
                  Curriculum Vitae
                </label>
                <p className="text-gray-500 text-sm mb-4">
                  Silahkan unggah CV terbaru kamu
                </p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300"
                    onClick={() => handleClickForCv()}
                  >
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRefForCV}
                      onChange={(e) => handleFileChangeForCv(e.target.files[0])}
                    />
                  </button>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData2?.cvUrl ? formData2?.cv.name  : "Upload CV Terbaru"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
                {/* Tombol Preview */}
                {formData2?.cvUrl && (
                  <a
                    href={formData2.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Preview CV
                  </a>
                )}
              </div>

              {/* Link Portofolio (Opsional) */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">Portofolio</label>
                <p className="text-gray-500 text-sm mb-4">
                  Silahkan unggah surat kamu
                </p>
                <div className="flex items-center">
                  <button
                    className="bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-l cursor-pointer hover:bg-gray-300"
                    onClick={() => handleClickForPorto()}
                  >
                    Choose File
                    <input
                      type="file"
                      className="hidden"
                      ref={fileInputRefForPorto}
                      onChange={(e) =>
                        handleFileChangeForPorto(e.target.files[0])
                      }
                    />
                  </button>
                  <span className="bg-white text-gray-500 py-2 px-4 border border-l-0 rounded-r flex-1">
                    {formData2?.portofolio
                      ? formData2?.portofolio.name
                      : "Upload Portofolio"}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mt-2">
                  Unggah dalam format PDF dengan ukuran maksimal 5 MB.
                </p>
                {/* Tombol Preview */}
                {formData2?.portofolioUrl && (
                  <a
                    href={formData2.portofolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 mt-2 inline-block"
                  >
                    Preview Portofolio
                  </a>
                )}
              </div>

              {/* Durasi Magang */}
              <div className="border rounded p-4 mb-4">
                <label className="font-semibold block mb-2">
                  Durasi Magang
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded px-3 py-2"
                      value={formData2.durasiAwal || ""} // Bind value to state
                      onChange={handleTanggalMulaiChange} // Handle change
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      className="w-full border rounded px-3 py-2"
                      value={formData2.durasiAkhir || ""} // Bind value to state
                      onChange={handleTanggalSelesaiChange} // Handle change
                      min={getMinEndDate()} // Set minimum date for tanggal selesai
                      disabled={!formData2.durasiAwal} // Disable if tanggal mulai is not set
                    />
                  </div>
                </div>
              </div>

              {/* Checkbox Syarat dan Ketentuan */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Saya Menyetujui{" "}
                    <Link to="/syaratdanketentuan" className="text-blue-500">
                      Syarat dan Ketentuan
                    </Link>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-center">
              <button
                className="bg-red-500 w-64 h-12 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-red-600"
                onClick={handleSubmit}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FormPendaftaran2;
