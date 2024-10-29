import React, { useState, useEffect } from "react";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20]; // Opsi untuk jumlah item per halaman

function DataPelamar() {
  const [pesertaData, setPesertaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const [itemsPerPage, setItemsPerPage] = useState(10); // State untuk jumlah item per halaman
  const [sortOption, setSortOption] = useState("newest"); // State untuk sorting
  const [error, setError] = useState(null); // State untuk error handling
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to check if user is logged in and fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      localStorage.removeItem("token"); // Hapus token jika tidak ada
      window.location.href = "/loginadmin"; // Redirect ke halaman login
    } else {
      fetchPesertaData(token);
    }
  }, []); // This only runs once, on component mount

  // Fetch data again if status or pesertaData changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchPesertaData(token);
    }
  }, [pesertaData, sortOption]);

  const fetchPesertaData = async (token) => {
    try {
      const response = await fetch("https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/users2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data) {
          setPesertaData(data);
        } else {
          console.warn(
            "Data applicantsList tidak ditemukan dalam respons API."
          );
          setPesertaData([]);
        }
      } else if (response.status === 401) {
        // Jika token tidak valid, hapus token dan redirect ke login
        setError("Akses tidak diizinkan. Silakan login ulang.");
        localStorage.removeItem("token"); // Hapus token
        window.location.href = "/loginadmin"; // Redirect ke halaman login
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
      "Ketersediaan Penempatan": peserta?.Regist?.available_space || "Kosong",
      "Surat Rekomendasi": peserta.Regist.recommend_letter
        ? "Ada"
        : "Tidak Ada",
      "Curriculum Vitae": peserta.Regist.cv ? "Ada" : "Tidak Ada",
      Portofolio: peserta.Regist.portofolio ? "Ada" : "Tidak Ada",
      "Durasi Awal Magang": formatDate(peserta.Regist.first_period),
      "Durasi Akhir Magang": formatDate(peserta.Regist.last_period),
      "Tanggal Pengajuan": formatDate(peserta.Regist.updateAt),
      "Status Lamaran": peserta.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pelamar");

    XLSX.writeFile(workbook, "Data_Pelamar_Magang.xlsx");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset ke halaman pertama saat jumlah per halaman berubah
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

  // Mengelola perubahan halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Update the current page
  };

  const sortOptions = [
    { value: "newest", label: "Data Terbaru" },
    { value: "oldest", label: "Data Terlama" },
    { value: "alphabetical", label: "Berdasarkan Abjad" },
  ];

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
        (a, b) => new Date(b.Regist.updateAt) - new Date(a.Regist.updateAt)
      );
    } else if (sortOption === "oldest") {
      return [...filteredData].sort(
        (a, b) => new Date(a.Regist.updateAt) - new Date(b.Regist.updateAt)
      );
    } else if (sortOption === "alphabetical") {
      return [...filteredData].sort((a, b) => a.name.localeCompare(b.name));
    }
    return filteredData;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedData().slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  console.log("first", currentData);

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
      fetchPesertaData(token);
    } catch (error) {
      console.error("Error updating status:", error);
    }
    console.log(pesertaData); // Cek struktur data
    const notelp = pesertaData[index]?.Profile?.telp_user; // Cek apakah 'notelp' valid
    sendWhatsAppMessage(notelp, status);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderAdmin className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <h3 className="text-3xl font-bold mb-5">Data Pelamar</h3>
        {/* Teks paling atas */}
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

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Cari pelamar..."
                className="pl-10 pr-4 py-2 border rounded"
              />
              <MagnifyingGlassIcon className="absolute left-2 top-2 w-6 h-6 text-gray-400" />
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
                    sortOptions.find((option) => option.value === sortOption)
                      ?.label
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
                  <th className="py-2 px-4 border-b">
                    Ketersediaan Penempatan
                  </th>
                  <th className="py-2 px-4 border-b">Surat Rekomendasi</th>
                  <th className="py-2 px-4 border-b">Curriculum Vitae</th>
                  <th className="py-2 px-4 border-b">Portofolio</th>
                  <th className="py-2 px-4 border-b">Durasi Awal Magang</th>
                  <th className="py-2 px-4 border-b">Durasi Akhir Magang</th>
                  <th className="py-2 px-4 border-b">Tanggal Pengajuan</th>
                  <th className="py-2 px-4 border-b">Status Lamaran</th>
                  <th className="py-2 px-4 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((peserta, index) => (
                  <tr key={peserta.id}>
                    <td className="py-2 px-4 border-b">{peserta.name}</td>
                    <td className="py-2 px-4 border-b">
                      {peserta.University.nim || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Profile.nik || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">{peserta.email}</td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Profile.telp_user || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.University.univ_name || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.University.major || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta?.Regist?.available_space
                        ? "Bersedia"
                        : "Tidak Bersedia"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Regist.recommend_letter ? (
                        <a
                          href={
                            "https://backend-prajagamer-920196572245.asia-southeast2.run.app/uploads/" +
                            peserta.Regist.recommend_letter
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat Surat Rekomendasi
                        </a>
                      ) : (
                        "File Tidak Tersedia"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Regist.cv ? (
                        <a
                          href={
                            "https://backend-prajagamer-920196572245.asia-southeast2.run.app/uploads/" + peserta.Regist.cv
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat CV
                        </a>
                      ) : (
                        "File Tidak Tersedia"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Regist.portofolio ? (
                        <a
                          href={
                            "https://backend-prajagamer-920196572245.asia-southeast2.run.app/uploads/" +
                            peserta.Regist.portofolio
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          Lihat Portofolio
                        </a>
                      ) : (
                        "Tidak Melampirkan"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(peserta.Regist.first_period)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(peserta.Regist.last_period)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {formatDate(peserta.Regist.updateAt)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`${
                          peserta.status === "Accepted"
                            ? "text-green-500"
                            : peserta.status === "Rejected"
                            ? "text-red-500"
                            : peserta.status === "Verifying"
                            ? "text-black"
                            : ""
                        }`}
                      >
                        {peserta.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                    <div className="flex items-center justify-center space-x-2">
                        {/* Tampilkan tombol "Terima" hanya jika statusnya bukan "Accepted" */}
                        {peserta.status !== "Rejected" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(peserta.id, "Accepted", index)
                            }
                            className={`px-3 py-1 text-white rounded ${
                              peserta.status === "Accepted"
                                ? "bg-gray-400 cursor-not-allowed" // Jika status Accepted, tombol Terima disabled
                                : "bg-green-500" // Tombol aktif jika status bukan Accepted
                            }`}
                            disabled={peserta.status === "Accepted"} // Disabled jika status Accepted
                          >
                            Terima
                          </button>
                        )}

                        {/* Tampilkan tombol "Tolak" hanya jika statusnya bukan "Accepted" */}
                        {peserta.status !== "Accepted" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                peserta.id,
                                "Rejected",
                                index
                              )
                            }
                            className={`px-3 py-1 text-white rounded ${
                              peserta.status === "Rejected"
                                ? "bg-gray-400 cursor-not-allowed" // Jika status Rejected, tombol Tolak disabled
                                : "bg-red-500" // Tombol aktif jika status bukan Rejected
                            }`}
                            disabled={peserta.status === "Rejected"} // Disabled jika status Rejected
                          >
                            Tolak
                          </button>
                        )}
                      </div>
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
}

export default DataPelamar;
