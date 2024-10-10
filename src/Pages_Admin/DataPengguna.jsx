import React, { useState, useEffect } from "react";
import Header from "../ComponentsAdmin/HeaderAdmin";
import * as XLSX from "xlsx";
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Import ikon search dari Heroicons

const PAGE_SIZE = 10;

const DataPengguna = () => {
  const [pesertaData, setPesertaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPesertaData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [token]);

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

  const filteredData = pesertaData.filter((peserta) =>
    peserta.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peserta.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peserta?.Profile?.nik?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    peserta?.University?.univ_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = filteredData.slice(startIndex, startIndex + PAGE_SIZE);
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateString ? new Date(dateString).toLocaleDateString("id-ID", options) : "Kosong";
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
      await axios.put(
        "http://localhost:5000/api/users/status",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Data Pengguna</h3>
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
            <button
              onClick={handleExportToExcel}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
            >
              Export to Excel
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
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
                    <td className="py-2 px-4 border-b">{peserta?.University?.nim || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">{peserta?.Profile?.nik || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">{peserta?.email || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">{peserta?.Profile?.telp_user || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">{peserta?.University?.univ_name || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">{peserta?.University?.major || "tidak terisi"}</td>
                    <td className="py-2 px-4 border-b">
                      {peserta.Profile.photo ? (
                        <a
                          href={"http://localhost:5000/uploads/" + peserta.Profile.photo}
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
                          href={"http://localhost:5000/uploads/" + peserta.Regist.cv}
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
                          href={"http://localhost:5000/uploads/" + peserta.Regist.score_list}
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
                    <td className="py-2 px-4 border-b">{formatDate(peserta.createdAt)}</td>
                    <td className="py-2 px-4 border-b">{peserta.status}</td>
                    <td className="py-2 px-4 border-b flex flex-row w-72">
                      <button
                        onClick={() => handleUpdateStatus(peserta.user_id, "Accepted", index)}
                        className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-600 hover:underline"
                      >
                        Terima
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(peserta.user_id, "Rejected", index)}
                        className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 hover:underline"
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPengguna;
