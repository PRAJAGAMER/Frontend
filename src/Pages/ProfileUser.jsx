import React, { useEffect } from "react";
import ProfileBackground from "../assets/Pictures/userprofile.svg";
import Navbar from "../Components/navbar";
import Footer from "../Components/Footer";
import { getDataProfil } from "../redux/Action/profileAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (!token) {
      navigate("/loginopsi");
    }
  });
  
useEffect(() => {
  dispatch(getDataProfil());
}, [dispatch]);
 

  const dataProfil = useSelector((state) => state.profil.dataProfilUser);
  console.log("data profile baruuu  ", dataProfil);

  return (
    <div className="bg-red-500 min-h-screen flex flex-col ">
      <Navbar />
      <div className="w-full  lg:w-[1100px] mx-auto bg-[#f6f6f6] rounded-2xl mt-32 mb-10 pb-6">
        <div className="relative">
          <img
            src={ProfileBackground}
            alt="Background"
            className="w-full h-56 object-cover rounded-t-2xl"
          />
          <div
            className="absolute"
            style={{ transform: "translate(80px, -120px)" }}
          >
            <img
              className="w-60 h-60 rounded-full shadow-lg"
              src={'https://backend-prajagamer-920196572245.asia-southeast2.run.app/uploads/'+ dataProfil?.photo}
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Information */}
        <div
          className="absolute mx-5 mt-10 py-24 text-center px-20 lg:text-left lg:mt-1 lg:py-5 lg:ml-64 "
        >
          <h1 className="text-2xl font-semibold">{dataProfil?.name}</h1>
          <p className="text-gray-500">{dataProfil?.university}</p>
        </div>

        {/* Main Content */}
        <div className="mt-[250px]  lg:mt-[150px] px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Column */}
          <div>
            {/* Contact Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Kontak Pribadi</h3>
              <div className="border rounded p-4 bg-gray-100">
                <div className="mb-2">
                  <label>Email</label>
                  <p className="font-semibold block">{dataProfil?.email}</p>
                </div>
                <div className="mb-2">
                  <label>No. Telp</label>
                  <p className="font-semibold block">{dataProfil?.telp}</p>
                </div>
              </div>
            </div>

            {/* Personal Data Info */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Informasi Data Pribadi
              </h3>
              <div className="border rounded p-4 bg-gray-100">
                {/* Nomor Induk Mahasiswa dan Nomor Induk Kependudukan */}
                <div className="lg:flex lg:justify-between mb-2">
                  <div className="lg:w-1/2">
                    <label>Nomor Induk Mahasiswa</label>
                    <p className="font-semibold">{dataProfil?.nim}</p>
                  </div>
                  <div className="lg:w-1/2">
                    <label>Nomor Induk Kependudukan</label>
                    <p className="font-semibold">{dataProfil?.nik}</p>
                  </div>
                </div>

                {/* Tempat dan Tanggal Lahir */}
                <div className="lg:flex justify-between mb-2">
                  <div className="w-1/2">
                    <label>Tempat Lahir</label>
                    {dataProfil?.place_birth? (
                      <p className="font-semibold">{dataProfil?.place_birth}</p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                  <div className="w-1/2">
                    <label>Tanggal Lahir</label>
                    {dataProfil?.birth_date? (
                      <p className="font-semibold">{dataProfil?.birth_date}</p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                </div>

                {/* Alamat Domisili */}
                <p className="mt-5 lg:mt-0 font-semibold block">Alamat Domisili</p>
                <div className="lg:flex justify-between lg:mb-2">
                  <div className="lg:w-1/2">
                    <label>Provinsi</label>
                    {dataProfil?.province_domicile? (
                      <p className="font-semibold">
                        {dataProfil?.province_domicile}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                  <div className="lg:w-1/2">
                    <label>Kota/Kab</label>
                    {dataProfil?.city_domicile? (
                      <p className="font-semibold">
                        {dataProfil?.city_domicile}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2 mb-2">
                  <label>Alamat Domisili</label>
                  {dataProfil?.address_domicile? (
                      <p className="font-semibold">
                        {dataProfil?.address_domicile}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>

                {/* Alamat Domisili KTP */}
                <div className="mb-2">
                  <p className="font-semibold block">Alamat Domisili KTP</p>
                </div>
                <div className="lg:flex justify-between mb-2">
                  <div className="lg:w-1/2">
                    <label>Provinsi</label>
                    {dataProfil?.province_ktp? (
                      <p className="font-semibold">
                        {dataProfil?.province_ktp}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                  <div className="lg:w-1/2">
                    <label>Kota/Kab</label>
                    {dataProfil?.city_ktp? (
                      <p className="font-semibold">
                        {dataProfil?.city_ktp}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2 mb-2">
                  <label>Alamat Domisili KTP</label>
                  {dataProfil?.address_ktp? (
                      <p className="font-semibold">
                        {dataProfil?.address_ktp}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Education Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Pendidikan</h3>
              <div className="border rounded p-4 bg-gray-100">
                <div className="mb-2">
                  <label>Asal Universitas</label>
                  <p className="font-semibold block">
                    {dataProfil?.university}
                  </p>
                </div>
                <div className="mb-2">
                  <label>Jurusan</label>
                  <p className="font-semibold block">{dataProfil?.major}</p>
                </div>
                <div className="mb-2">
                  <label>IPK</label>
                  {dataProfil?.ipk? (
                      <p className="font-semibold">
                        {dataProfil?.ipk}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
                <div className="mb-2">
                  <label>Semester Yang Sedang di Tempuh</label>
                  {dataProfil?.semester? (
                      <p className="font-semibold">
                        {dataProfil?.semester}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
              </div>
            </div>

            {/* Supervisor Info */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Pembimbing</h3>
              <div className="border rounded p-4 bg-gray-100">
                <div className="mb-2">
                  <label>Nama Pembimbing</label>
                  {dataProfil?.name_supervisor? (
                      <p className="font-semibold">
                        {dataProfil?.name_supervisor}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
                <div className="mb-2">
                  <label>No. Telp Pembimbing</label>
                  {dataProfil?.telp_supervisor? (
                      <p className="font-semibold">
                        {dataProfil?.telp_supervisor}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
                <div className="mb-2">
                  <label>Email Pembimbing</label>
                  {dataProfil?.email_supervisor? (
                      <p className="font-semibold">
                        {dataProfil?.email_supervisor}
                      </p>
                    ) : (
                      <p className="font-semibold">-</p>
                    )}
                </div>
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-center mt-3  mb-6">
              <button
                className="bg-red-600 w-full h-14 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700"
                onClick={() => navigate("/editprofile")}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;