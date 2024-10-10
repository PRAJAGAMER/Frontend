import React, { useState } from "react";
import { 
  HomeIcon, 
  UsersIcon, 
  ClipboardDocumentCheckIcon, 
  DocumentArrowUpIcon, 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon 
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Button to toggle sidebar on mobile devices */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 text-white bg-red-600 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed bg-red-600 text-white text-xl w-64 h-screen flex flex-col space-y-2 p-4 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 z-40`}
      >
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center px-3 py-3 hover:bg-red-700"
        >
          <HomeIcon className="h-6 w-6 mr-3" />
          Beranda
        </button>
        <button
          onClick={() => navigate("/datapengguna")}
          className="flex items-center px-3 py-3 hover:bg-red-700"
        >
          <UsersIcon className="h-6 w-6 mr-3" />
          Data Pengguna
        </button>
        <button
          onClick={() => navigate("/datapelamar")}
          className="flex items-center px-3 py-3 hover:bg-red-700"
        >
          <ClipboardDocumentCheckIcon className="h-6 w-6 mr-3" />
          Data Pelamar
        </button>
        <button
          onClick={() => navigate("/updateinfo")}
          className="flex items-center px-3 py-3 hover:bg-red-700"
        >
          <DocumentArrowUpIcon className="h-6 w-6 mr-3" />
          Upload Informasi
        </button>
        <button
          onClick={() => navigate("/adminakun")}
          className="flex items-center px-3 py-3 hover:bg-red-700"
        >
          <UserCircleIcon className="h-6 w-6 mr-3" />
          Akun Admin
        </button>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default SidebarAdmin;