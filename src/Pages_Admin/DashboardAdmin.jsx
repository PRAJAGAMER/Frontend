import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom"; // Import Link dari react-router-dom
import Sidebar from "../ComponentsAdmin/SidebarAdmin";
import Header from "../ComponentsAdmin/HeaderAdmin";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20]; // Opsi untuk jumlah item per halaman

const DashboardAdmin = () => {
  const [applicantsData, setApplicantsData] = useState([]);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [verifyingApplicants, setVerifyingApplicants] = useState(0);
  const [acceptedApplicants, setAcceptedApplicants] = useState(0);
  const [rejectedApplicants, setRejectedApplicants] = useState(0);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const [sortOption, setSortOption] = useState("newest"); // State untuk sorting
  const [itemsPerPage, setItemsPerPage] = useState(10); // State untuk jumlah item per halaman
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to check if user is logged in and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      localStorage.removeItem("token"); // Hapus token jika tidak ada
      window.location.href = "/loginadmin"; // Redirect ke halaman login
    } else {
      fetchDataTabel(token);
    }
  }, []); // This only runs once, on component mount

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDataTabel(token);
    }
  }, [applicantsData, sortOption]);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin";
      return;
    }

    try {
      const response = await axios.get(
        "https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("dashboard", response)
      setApplicantsData(response?.data?.applicantsList || []);
      setTotalApplicants(response?.data?.totalApplicants || 0);
      setVerifyingApplicants(response?.data?.verifyingApplicants || 0);
      setAcceptedApplicants(response?.data?.acceptedApplicants || 0);
      setRejectedApplicants(response?.data?.rejectedApplicants || 0);
    } catch (error) {
      console.error("Error fetching applicants data:", error);

      if (error.response && error.response.status === 401) {
        setError("Akses tidak diizinkan. Silakan login ulang.");
        localStorage.removeItem("token");
        window.location.href = "/loginadmin";
      } else {
        setError("Data tidak dapat diambil");
      }
    }
  };

  const fetchDataTabel = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin";
      return;
    }

    try {
      const response = await axios.get(
        "https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplicantsData(response?.data?.applicantsList || []);
      setTotalApplicants(response?.data?.totalApplicants || 0);
      setVerifyingApplicants(response?.data?.verifyingApplicants || 0);
      setAcceptedApplicants(response?.data?.acceptedApplicants || 0);
      setRejectedApplicants(response?.data?.rejectedApplicants || 0);
    } catch (error) {
      console.error("Error fetching applicants data:", error);

      if (error.response && error.response.status === 401) {
        setError("Akses tidak diizinkan. Silakan login ulang.");
        localStorage.removeItem("token");
        window.location.href = "/loginadmin";
      } else {
        setError("Data tidak dapat diambil");
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset halaman ke 1 saat pencarian
  };

  // Menggabungkan fungsi handleSortChange dan handleDropdownToggle
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
  };

  // Memperbarui handleSortChange agar menerima event dari dropdown dan close dropdown setelah perubahan
  const handleSortChange = (e) => {
    const selectedOption = e.target ? e.target.value : e; // Check if event or direct option is passed
    setSortOption(selectedOption); // Update the sorting option
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };

  // Opsi urutan sort
  const sortOptions = [
    { value: "newest", label: "Data Terbaru" },
    { value: "oldest", label: "Data Terlama" },
    { value: "alphabetical", label: "Berdasarkan Abjad" },
  ];

  // Mengubah jumlah item per halaman dan reset halaman ke 1
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10)); // Mengubah jumlah item per halaman
    setCurrentPage(1); // Reset halaman ke 1 saat jumlah item per halaman berubah
  };

  // Mengelola perubahan halaman dengan validasi batas halaman
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Update halaman jika dalam rentang yang valid
    }
  };

  // Filter data berdasarkan query pencarian
  const filteredApplicants = applicantsData.filter(
    (applicant) =>
      applicant.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.user.University?.univ_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      applicant.user.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = () => {
    if (sortOption === "newest") {
      return [...filteredApplicants].sort(
        (a, b) => new Date(b.user.createdAt) - new Date(a.user.createdAt)
      );
    } else if (sortOption === "oldest") {
      return [...filteredApplicants].sort(
        (a, b) => new Date(a.user.createdAt) - new Date(b.user.createdAt)
      );
    } else if (sortOption === "alphabetical") {
      return [...filteredApplicants].sort((a, b) =>
        a.user.name.localeCompare(b.user.name)
      );
    }
    return filteredApplicants;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData().slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);

  const sendWhatsAppMessage = (phoneNumber, status) => {
    if (!phoneNumber) {
      console.error("Nomor telepon tidak ditemukan.");
      return;
    }

    let message = "";
    if (status === "Accepted") {
      message = `Selamat, lamaran magang Anda telah diterima. Terima kasih telah mendaftar!`;
    } else if (status === "Rejected") {
      message = `Maaf, lamaran magang Anda tidak dapat kami terima. Terima kasih telah mendaftar dan tetap semangat!`;
    }

    // Format nomor telepon dengan kode negara Indonesia
    const formattedPhoneNumber = phoneNumber.startsWith("0")
      ? `62${phoneNumber.slice(1)}`
      : `62${phoneNumber}`;

    // Buat URL WhatsApp API dengan pesan yang sudah di-encode
    const whatsappURL = `https://wa.me/${formattedPhoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Buka URL di tab baru
    window.open(whatsappURL, "_blank");
  };

  const handleUpdateStatus = async (id, status, index) => {
    const token = localStorage.getItem("token");
    let data = { userId: id, status: status };
    console.log("DATA PPENGGUNA", data);
    if (!token) {
      window.location.href = "/loginadmin";
      return;
    }

    try {
      await axios.put("https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/users/status2", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated data
      fetchDataTabel(token);
    } catch (error) {
      console.error("Error updating status:", error);
    }
    console.log("DATA teampil", applicantsData); // Cek struktur data
    const notelp = applicantsData[index]?.user?.Profile?.telp_user; // Cek apakah 'notelp' valid
    console.log("no telpon", notelp);
    sendWhatsAppMessage(notelp, status);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header className="relative z-20" />

      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              <div className="bg-white p-8 rounded-lg shadow flex items-center">
                <UserGroupIcon className="h-16 w-16 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Jumlah Lamaran</h3>
                  <p className="text-4xl">{totalApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow flex items-center">
                <DocumentTextIcon className="h-16 w-16 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Diproses</h3>
                  <p className="text-4xl">{verifyingApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow flex items-center">
                <CheckCircleIcon className="h-16 w-16 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Diterima</h3>
                  <p className="text-4xl">{acceptedApplicants}</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow flex items-center">
                <XCircleIcon className="h-16 w-16 text-red-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">Lamaran Ditolak</h3>
                  <p className="text-4xl">{rejectedApplicants}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-4 rounded-lg shadow relative">
              <h3 className="text-3xl font-bold border-b-2 pb-4 pt-2 mb-8">
                Data Pelamar
              </h3>
              <div className="flex justify-between items-center border-gray-300 pb-2 mb-4">
                <div className="flex justify-between items-center mb-4">
                  {/* Jumlah setiap halaman di sebelah kiri search */}
                  <div className="flex items-center space-x-2 font-semibold text-md">
                    <span>Jumlah setiap halaman</span>
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="border rounded-lg p-1"
                    >
                      {PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearch}
                      placeholder="Cari pelamar..."
                      className="pl-10 pr-4 py-2 border rounded"
                    />
                    <MagnifyingGlassIcon className="absolute left-2 top-2 w-5 h-5 text-gray-400" />
                  </div>

                  {/* Dropdown Sorting */}
                  <div className="relative inline-block">
                    {/* Wrapper div for the dropdown */}
                    <div
                      className="flex items-center border rounded-lg p-2 bg-yellow-500 text-white font-semibold w-[191px]cursor-pointer"
                      onClick={handleDropdownToggle} // This will toggle dropdown on click
                    >
                      <span>
                        {
                          sortOptions.find(
                            (option) => option.value === sortOption
                          )?.label
                        }
                      </span>
                      {sortOption === "newest" && (
                        <ArrowDownIcon className="inline w-8 h-4 ml-2" />
                      )}
                      {sortOption === "oldest" && (
                        <ArrowUpIcon className="inline w-8 h-4 ml-2" />
                      )}
                      {sortOption === "alphabetical" && (
                        <ArrowsRightLeftIcon className="inline w-8 h-4 ml-2" />
                      )}
                    </div>

                    {/* Dropdown content */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg">
                        <ul>
                          {sortOptions.map((option) => (
                            <li
                              key={option.value}
                              onClick={() => handleSortChange(option.value)}
                              className="cursor-pointer p-2 hover:bg-gray-200"
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <Link to="/datapelamar">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                      Lihat Selengkapnya
                    </button>
                  </Link>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 pb-4 border-b w-[20%] text-sm font-semibold text-gray-600">
                        Nama
                      </th>
                      <th className="py-2 pb-4 border-b w-[20%] text-sm font-semibold text-gray-600">
                        Jenjang Pendidikan
                      </th>
                      <th className="py-2 pb-4 border-b w-[15%] text-sm font-semibold text-gray-600">
                        Tanggal Pendaftaran
                      </th>
                      <th className="py-2 pb-4 border-b w-[10%] text-sm font-semibold text-gray-600">
                        Status
                      </th>
                      <th className="py-2 pb-4 border-b w-[20%] text-sm font-semibold text-gray-600">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length > 0 ? (
                      currentData.map((peserta, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">
                            {peserta.user.name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {peserta.user.University?.univ_name || "N/A"}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {new Date(
                              peserta.user.createdAt
                            ).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <span
                              className={`${
                                peserta.user.status === "Accepted"
                                  ? "text-green-500"
                                  : peserta.user.status === "Rejected"
                                  ? "text-red-500"
                                  : peserta.user.status === "Verifying"
                                  ? "text-black"
                                  : ""
                              }`}
                            >
                              {peserta.user.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 border-b ">
                            <div className="flex items-center justify-center space-x-2">
                              {/* Tampilkan tombol "Terima" hanya jika statusnya bukan "Accepted" */}
                              {peserta.user.status !== "Rejected" && (
                                <button
                                  onClick={() =>
                                    handleUpdateStatus(
                                      peserta.user_id,
                                      "Accepted",
                                      index
                                    )
                                  }
                                  className={`px-3 py-1 text-white rounded ${
                                    peserta.user.status === "Accepted"
                                      ? "bg-gray-400 cursor-not-allowed" // Jika status Accepted, tombol Terima disabled
                                      : "bg-green-500" // Tombol aktif jika status bukan Accepted
                                  }`}
                                  disabled={peserta.user.status === "Accepted"} // Disabled jika status Accepted
                                >
                                  Terima
                                </button>
                              )}

                              {/* Tampilkan tombol "Tolak" hanya jika statusnya bukan "Accepted" */}
                              {peserta.user.status !== "Accepted" && (
                                <button
                                  onClick={() =>
                                    handleUpdateStatus(
                                      peserta.user_id,
                                      "Rejected",
                                      index
                                    )
                                  }
                                  className={`px-3 py-1 text-white rounded ${
                                    peserta.user.status === "Rejected"
                                      ? "bg-gray-400 cursor-not-allowed" // Jika status Rejected, tombol Tolak disabled
                                      : "bg-red-500" // Tombol aktif jika status bukan Rejected
                                  }`}
                                  disabled={peserta.user.status === "Rejected"} // Disabled jika status Rejected
                                >
                                  Tolak
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="py-2 px-4 border-b text-center"
                        >
                          Tidak ada data pendaftar
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {/* Pagination controls di bawah tabel */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
          >
            Sebelumnya
          </button>
          <span className="mx-8">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
