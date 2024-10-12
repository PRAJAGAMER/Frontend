import React, { useEffect, useState } from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import { useDispatch, useSelector } from "react-redux"; // Import useSelector untuk mengambil state dari Redux
import { getDataPendaftaran } from "../redux/Action/formPendaftaranAction";
import { setDataFormPendaftaran } from "../redux/Reducers/pendaftaranMagangReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormPendaftaran1() {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const dispatch = useDispatch();

  // Get the token from the Redux state
  const token = useSelector((state) => state.auth.token);

  // Redirect to login if token is not present
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); // Run effect when token or navigate changes

  useEffect(() => {
    dispatch(getDataPendaftaran());
  }, []);

  const dataPendaftaran = useSelector((state) => state.pendaftaran.dataPendaf);
  console.log("data xxxxxx", dataPendaftaran);

  const handleKesediaanChange = (event) => {
    const value = event.target.value === "true";
    setFormData1((prevData) => ({
      ...prevData,
      ketersediaanPenempatan: value, // set value to 'ya' or 'tidak'
    }));
  };

  const [formData1, setFormData1] = useState({
    ketersediaanPenempatan: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData1.ketersediaanPenempatan === null) {
      toast.warning("Harap lengkapi semua data!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return; // Stop form submission
    }

    dispatch(setDataFormPendaftaran(formData1));
    navigate("/formpendaftaran2");
  };

  return (
    <div className="bg-red-500 min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto mt-24 mb-3 px-4 py-8 flex justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 lg:w-3/5">
          <div className="flex justify-between items-center border-b-2 border-black mb-6 pb-4">
            <h2 className="text-2xl font-bold">FORM PENDAFTARAN</h2>
            <span className="text-xl">1/2</span>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {/* Informasi Data Diri */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Informasi Data Diri
              </h3>
              <div className="border rounded p-4">
                <div className="mb-2">
                  <label>Nomor Induk Kependudukan</label>
                  <p className="font-semibold block">{dataPendaftaran?.nik}</p>
                </div>
                <div className="mb-2">
                  <label>Nama</label>
                  <p className="font-semibold block">{dataPendaftaran?.name}</p>
                </div>
                <div className="mb-2">
                  <label>Nomor Induk Mahasiswa</label>
                  <p className="font-semibold block">{dataPendaftaran?.nim}</p>
                </div>
              </div>
            </div>

            {/* Kontak Pribadi */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Kontak Pribadi</h3>
              <div className="border rounded p-4">
                <div className="mb-2">
                  <label>Email</label>
                  <p className="font-semibold block">
                    {dataPendaftaran?.email}
                  </p>
                </div>
                <div className="mb-2">
                  <label>No. Telp</label>
                  <p className="font-semibold block">{dataPendaftaran?.telp}</p>
                </div>
              </div>
            </div>

            {/* Pendidikan */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Pendidikan</h3>
              <div className="border rounded p-4">
                <div className="mb-2">
                  <label>Asal Universitas</label>
                  <p className="font-semibold block">
                    {dataPendaftaran?.univ_name}
                  </p>
                </div>
                <div className="mb-2">
                  <label>Jurusan</label>
                  <p className="font-semibold block">
                    {dataPendaftaran?.major}
                  </p>
                </div>
              </div>
            </div>

            {/* Kesediaan */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Apakah kamu bersedia di tempatkan magang di seluruh kantor
                cabang?
              </h3>
              <div className="border rounded p-4">
                <label className="mr-4">
                  <input
                    type="radio"
                    name="kesediaan"
                    value={true}
                    onChange={handleKesediaanChange}
                    checked={formData1.ketersediaanPenempatan === true} // Check the selected option
                  />{" "}
                  Ya
                </label>
                <label>
                  <input
                    type="radio"
                    name="kesediaan"
                    value={false}
                    onChange={handleKesediaanChange}
                    checked={formData1.ketersediaanPenempatan === false}
                  />{" "}
                  Tidak
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="bg-red-500 w-64 h-12 text-white font-semibold py-2 px-4 rounded-2xl hover:bg-red-600"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FormPendaftaran1;
