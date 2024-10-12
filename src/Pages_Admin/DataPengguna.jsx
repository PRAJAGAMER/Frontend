import React, { useState, useEffect } from "react";
import Header from "../ComponentsAdmin/HeaderAdmin";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20]; // Opsi untuk jumlah item per halaman

const DataPengguna = () => {
  const [pesertaData, setPesertaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const [itemsPerPage, setItemsPerPage] = useState(10); // State untuk jumlah item per halaman
  const [sortOption, setSortOption] = useState("newest"); // State untuk sorting
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      localStorage.removeItem("token"); // Hapus token jika tidak ada
      window.location.href = "/loginadmin"; // Redirect ke halaman login
    } else {
      fetchData(token); // Fetch data if token exists
    }
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPesertaData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Jika token tidak valid, hapus token dan redirect ke login
        setError("Akses tidak diizinkan. Silakan login ulang.");
        localStorage.removeItem("token"); // Hapus token
        window.location.href = "/loginadmin"; // Redirect ke halaman login
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleExportToExcel = () => {
    const exportData = pesertaData.map((peserta) => ({
      Nama: peserta.name,
      NIM: peserta.University.nim || "Kosong",
      NIK: peserta.Profile.nik || "Kosong",
      Email: peserta.email,
      "No. Telp": peserta.Profile.telp_user || "Kosong",
      "Asal Pendidikan": peserta.University.univ_name || "Kosong",
      Jurusan: peserta.University.major || "Kosong",
      Foto: peserta.Profile.photo ? "Ada" : "Tidak Ada",
      "Curriculum Vitae": peserta.Regist.cv ? "Ada" : "Tidak Ada",
      "Transkip Nilai": peserta.Regist.score_list ? "Ada" : "Tidak Ada",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pengguna");
    XLSX.writeFile(workbook, "Data_Pengguna_Magang.xlsx");
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset ke halaman pertama saat jumlah per halaman berubah
  };

  const filteredData = pesertaData.filter(
    (peserta) =>
      peserta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peserta.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      peserta?.Profile?.nik
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      peserta?.University?.univ_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const sortedData = () => {
    if (sortOption === "newest") {
      return [...filteredData].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "oldest") {
      return [...filteredData].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortOption === "alphabetical") {
      return [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filteredData;
  };

  const currentData = sortedData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateString
      ? new Date(dateString).toLocaleDateString("id-ID", options)
      : "Kosong";
  };

  const sendWhatsAppMessage = (phoneNumber, status) => {
    if (!phoneNumber) {
      console.error("Nomor telepon tidak ditemukan.");
      return;
    }

    let message = "";
    if (status === "Accepted") {
      message = `Selamat, akun Anda telah diterima!`;
    } else if (status === "Rejected") {
      message = `Maaf, akun Anda tidak dapat kami terima.`;
    }

    const formattedPhoneNumber = phoneNumber.startsWith("0")
      ? `62${phoneNumber.slice(1)}`
      : `62${phoneNumber}`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=${formattedPhoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank");
  };

  const handleUpdateStatus = async (id, status, index) => {
    const token = localStorage.getItem("token");
    let data = { userId: id, status: status };

    if (!token) {
      window.location.href = "/loginadmin";
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/users/status", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh data after update
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPesertaData(response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }

    const notelp = pesertaData[index].Profile.telp_user;
    sendWhatsAppMessage(notelp, status);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <h3 className="text-3xl font-bold mb-5">Data Pengguna</h3>
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

          {/* Bagian search, sorting, dan export */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Cari pengguna..."
                className="pl-10 pr-4 py-2 border rounded"
              />
              <MagnifyingGlassIcon className="absolute left-2 top-2 w-6 h-6 text-gray-400" />
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

            {/* Tombol Export */}
            <button
              onClick={handleExportToExcel}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            >
              Export to Excel
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nama</th>
                  <th className="py-2 px-4 border-b">NIM</th>
                  <th className="py-2 px-4 border-b">NIK</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">No. Telp</th>
                  <th className="py-2 px-4 border-b">Asal Pendidikan</th>
                  <th className="py-2 px-4 border-b">Jurusan</th>
                  <th className="py-2 px-4 border-b">Foto</th>
                  <th className="py-2 px-4 border-b">CV</th>
                  <th className="py-2 px-4 border-b">Transkrip Nilai</th>
                  <th className="py-2 px-4 border-b">Tanggal Pembuatan Akun</th>
                  <th className="py-2 px-4 border-b">Status Akun</th>
                  <th className="py-2 px-4 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((peserta, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">{peserta.name}</td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.University?.nim || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.Profile?.nik || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.email || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.Profile?.telp_user || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.University?.univ_name || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.University?.major || "tidak terisi"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Profile.photo ? (
                        <a
                          href={
                            "http://localhost:5000/uploads/" +
                            peserta.Profile.photo
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat Foto
                        </a>
                      ) : (
                        "Foto tidak tersedia"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Regist.cv ? (
                        <a
                          href={
                            "http://localhost:5000/uploads/" + peserta.Regist.cv
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat CV
                        </a>
                      ) : (
                        "CV tidak tersedia"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Regist.score_list ? (
                        <a
                          href={
                            "http://localhost:5000/uploads/" +
                            peserta.Regist.score_list
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat Transkrip
                        </a>
                      ) : (
                        "Transkrip tidak tersedia"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(peserta.createdAt)}
                    </td>
                    <td className="py-2 px-4 border-b">{peserta.status}</td>
                    <td className="py-2 px-4 border-b flex flex-row w-72">
                      <button
                        onClick={() =>
                          handleUpdateStatus(peserta.user_id, "Accepted", index)
                        }
                        className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded-lg hover:bg-green-600 hover:underline"
                      >
                        Terima
                      </button>
                      <button
                        onClick={() =>
                          handleUpdateStatus(peserta.user_id, "Rejected", index)
                        }
                        className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded-lg hover:bg-red-600 hover:underline"
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

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

export default DataPengguna;
