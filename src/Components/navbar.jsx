import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/Reducers/loginReducers"; // Sesuaikan import dengan file authSlice Anda

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal

  const token = useSelector((state) => state.auth.token);
  // console.log("token",token)
  const user = useSelector((state) => state.auth.user);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout()); // Panggil action logout untuk menghapus token
    localStorage.removeItem("token"); // Hapus token dari localStorage jika ada
    navigate("/"); // Redirect ke halaman home
  };

  const openModal = () => setIsModalOpen(true); // Fungsi membuka modal
  const closeModal = () => setIsModalOpen(false); // Fungsi menutup modal

  // Ambil nama depan dari user
  const getFirstName = (fullName) => {
    return fullName ? fullName.split(" ")[0] : "";
  };

  return (
    <div className="fixed z-50 w-full bg-white shadow-lg">
      {/* Sidebar for Mobile and iPad */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden transition-transform transform"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="fixed right-0 w-64 h-full bg-white p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="text-[#D24545] self-end"
              onClick={() => setIsSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {token && (
              <div className="mt-5 text-xl font-bold">
                Hello, {getFirstName(user?.name)}
              </div>
            )}
            <div className="mt-10 space-y-4">
              <button
                className={`block w-full px-5 py-2 text-left text-xl ${
                  isActive("/") ? "text-[#D24545] font-bold" : "text-[#919191]"
                }`}
                onClick={() => {
                  navigate("/");
                  setIsSidebarOpen(false);
                }}
              >
                Beranda
              </button>
              <button
                className={`block w-full px-5 py-2 text-left text-xl ${
                  isActive("/mitra")
                    ? "text-[#D24545] font-bold"
                    : "text-[#919191]"
                }`}
                onClick={() => {
                  navigate("/mitra");
                  setIsSidebarOpen(false);
                }}
              >
                Tentang Kami
              </button>
              <button
                className={`block w-full px-5 py-2 text-left text-xl ${
                  isActive("/infopendaftaran")
                    ? "text-[#D24545] font-bold"
                    : "text-[#919191]"
                }`}
                onClick={() => {
                  navigate("/infopendaftaran");
                  setIsSidebarOpen(false);
                }}
              >
                Info Pendaftaran
              </button>
              <button
                className={`block w-full px-5 py-2 text-left text-xl ${
                  isActive("/daftarmagang")
                    ? "text-[#D24545] font-bold"
                    : "text-[#919191]"
                }`}
                onClick={() => {
                  navigate("/daftarmagang");
                  setIsSidebarOpen(false);
                }}
              >
                Daftar Magang
              </button>
              {!token ? null : (
                <div className="mt-auto">
                  <button
                    className={`block w-full px-5 py-2 text-left text-xl ${
                      isActive("/daftarmagang")
                        ? "text-[#D24545] font-bold"
                        : "text-[#919191]"
                    }`}
                    onClick={() => {
                      navigate("/profileuser");
                      setIsSidebarOpen(false);
                    }}
                  >
                    Akun
                  </button>
                </div>
              )}

              {!token ? (
                <button
                  className="block w-full px-8 py-2 mt-4 bg-red-500 text-xl rounded-lg text-white font-bold hover:bg-[#b83636] hover:shadow-lg transform hover:scale-105 transition duration-300"
                  onClick={() => navigate("/loginopsi")}
                >
                  Masuk
                </button>
              ) : (
                <div className="mt-auto">
                  <button
                    className="block w-full px-8 py-2 mt-4 bg-red-500 text-xl rounded-lg text-white font-bold hover:bg-[#b83636] hover:shadow-lg transform hover:scale-105 transition duration-300"
                    onClick={() => setIsModalOpen(true)} // Menampilkan modal saat logout diklik
                  >
                    Logout
                  </button>

                  {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                      <div className="bg-white p-6 rounded-lg shadow-md w-80">
                        <h3 className="text-lg font-bold mb-4">
                          Konfirmasi Logout
                        </h3>
                        <p>Apakah Anda yakin ingin keluar?</p>
                        <div className="flex justify-end mt-6">
                          {/* Tombol Batal */}
                          <button
                            onClick={() => setIsModalOpen(false)} // Menutup modal saat batal
                            className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            Batal
                          </button>

                          {/* Tombol Logout */}
                          <button
                            onClick={() => {
                              setIsModalOpen(false); // Tutup modal
                              handleLogout(); // Fungsi logout dipanggil
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="text-[#D24545] font-bold text-2xl">PRAJAGAMER</div>

        {/* Menu Toggle Button for Mobile and iPad */}
        <button
          className="lg:hidden text-[#D24545] p-2"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        {/* Navbar Links for Desktop */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6 text-xl">
          <button
            className={`px-5 py-2 text-xl ${
              isActive("/") ? "text-[#D24545] font-bold" : "text-[#919191]"
            }`}
            onClick={() => navigate("/")}
          >
            Beranda
          </button>
          <button
            className={`px-5 py-2 text-xl ${
              isActive("/mitra") ? "text-[#D24545] font-bold" : "text-[#919191]"
            }`}
            onClick={() => navigate("/mitra")}
          >
            Tentang Kami
          </button>
          <button
            className={`px-5 py-2 text-xl ${
              isActive("/infopendaftaran")
                ? "text-[#D24545] font-bold"
                : "text-[#919191]"
            }`}
            onClick={() => navigate("/infopendaftaran")}
          >
            Info Pendaftaran
          </button>
          <button
            className={`px-5 py-2 text-xl ${
              isActive("/daftarmagang")
                ? "text-[#D24545] font-bold"
                : "text-[#919191]"
            }`}
            onClick={() => navigate("/daftarmagang")}
          >
            Daftar Magang
          </button>
        </div>

        {/* Login or User Dropdown for Desktop */}
        {!token ? (
          <button
            className="hidden lg:block px-8 py-2 bg-red-500 text-2xl rounded-lg text-white font-bold hover:bg-[#b83636] hover:shadow-lg transform hover:scale-105 transition duration-300"
            onClick={() => navigate("/loginopsi")}
          >
            Masuk
          </button>
        ) : (
          <div className="hidden lg:block relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 px-8 py-2 text-2xl  text-black font-bold  "
            >
              <span>{getFirstName(user?.name)}</span>

              <UserCircleIcon className="h-12 w-12 text-[#D24545] sm:h-8 sm:w-8" />
            </button>

            {/* Dropdown for account options */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => navigate("/profileuser")}
                >
                  Akun
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-200"
                  onClick={openModal} // Open the modal on clicking this button
                >
                  Logout
                </button>
              </div>
            )}

            {/* Modal Konfirmasi */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-80">
                  <h3 className="text-lg font-bold mb-4">Konfirmasi Logout</h3>
                  <p>Apakah Anda yakin ingin keluar?</p>
                  <div className="flex justify-end mt-6">
                    {/* Tombol Batal */}
                    <button
                      onClick={closeModal}
                      className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      Batal
                    </button>

                    {/* Tombol Logout */}
                    <button
                      onClick={() => {
                        closeModal();
                        handleLogout();
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
