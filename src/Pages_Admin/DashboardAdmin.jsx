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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Anda belum login. Silakan login terlebih dahulu.");
        window.location.href = "/loginadmin";
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplicantsData(response.data.applicantsList || []);
        setTotalApplicants(response.data.totalApplicants || 0);
        setVerifyingApplicants(response.data.verifyingApplicants || 0);
        setAcceptedApplicants(response.data.acceptedApplicants || 0);
        setRejectedApplicants(response.data.rejectedApplicants || 0);
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

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset halaman ke 1 saat pencarian
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset halaman ke 1 saat jumlah item per halaman berubah
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
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

    const formattedPhoneNumber = phoneNumber.startsWith("0")
      ? `62${phoneNumber.slice(1)}`
      : `62${phoneNumber}`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    console.log("Opening WhatsApp URL:", whatsappURL);
    window.open(whatsappURL, "_blank");
  };

  const handleUpdateStatus = async (id, status, index) => {
    const token = localStorage.getItem("token");
    let data = { userId: id, status: status };

    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin";
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/users/status2", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error updating status:", error);
    }

    const response = await axios.get("http://localhost:5000/api/users2", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const notelp = response.data[index].Profile.telp_user;
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
              <h3 className="text-3xl font-bold mb-5  border-b-2 pb-4 pt-2 mb-8">
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
                    <div className="flex items-center border rounded-lg p-2 bg-yellow-500 text-white font-semibold w-[191px] pl-3">
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          outline: "none",
                          border: "none",
                          width: "100%",
                        }}
                        className="flex-grow appearance-none focus:outline-none font-semibold"
                      >
                        <option
                          value="newest"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Data Terbaru
                        </option>
                        <option
                          value="oldest"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Data Terlama
                        </option>
                        <option
                          value="alphabetical"
                          style={{ backgroundColor: "white", color: "black" }}
                        >
                          Berdasarkan Abjad
                        </option>
                      </select>
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
                  </div>

                  <Link to="/hasildaftarmagang">
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
                            {peserta.user.status}
                          </td>
                          <td className="py-2 px-4 border-b flex flex-row">
                            <button
                              className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded-lg hover:bg-green-600"
                              onClick={() =>
                                handleUpdateStatus(
                                  peserta.user_id,
                                  "Accepted",
                                  index
                                )
                              }
                            >
                              Terima
                            </button>
                            <button
                              className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600"
                              onClick={() =>
                                handleUpdateStatus(
                                  peserta.user_id,
                                  "Rejected",
                                  index
                                )
                              }
                            >
                              Tolak
                            </button>
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