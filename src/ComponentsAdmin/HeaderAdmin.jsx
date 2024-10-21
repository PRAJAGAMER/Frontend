import React, { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline"; // Menggunakan icon orang
import Logo from "../assets/Pictures/logodisdukcapil.png";
import SidebarAdmin from "./SidebarAdmin";

const HeaderAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminName, setAdminName] = useState(""); // State untuk menyimpan nama admin
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal

  const openModal = () => setIsModalOpen(true); // Fungsi membuka modal
  const closeModal = () => setIsModalOpen(false); // Fungsi menutup modal
  // Ambil nama admin dari localStorage ketika komponen pertama kali di-render
  useEffect(() => {
    const storedAdminName = localStorage.getItem("adminName");
    console.log("Stored Admin Name:", storedAdminName);
    if (storedAdminName) {
      setAdminName(storedAdminName);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    window.location.href = "/loginadmin"; // Redirect to login page
  };

  return (
    <div className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center p-4 z-50">
      {/* Logo and Title */}
      <div className="flex items-center">
        <img src={Logo} alt="Logo" className="h-10 mr-3 sm:h-8" />
        <div className="hidden sm:block">
          <h2 className="text-lg font-bold sm:text-base">
            Dinas Kependudukan Dan Pencatatan Sipil
          </h2>
          <p className="text-sm sm:text-xs">Kota Semarang</p>
        </div>
      </div>

      {/* User Information */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center focus:outline-none"
        >
          {/* Menampilkan nama admin yang disimpan di localStorage */}
          <span className="text-gray-600 mr-3 sm:text-sm">
            {adminName}
          </span>
          <UserCircleIcon className="h-12 w-12 text-[#D24545] sm:h-8 sm:w-8" />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
           <button
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
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

      {/* Sidebar Trigger (optional) */}
      <div className="fixed top-16 left-0 h-full shadow-lg pt-2">
        <SidebarAdmin />
      </div>
    </div>
  );
};

export default HeaderAdmin;
