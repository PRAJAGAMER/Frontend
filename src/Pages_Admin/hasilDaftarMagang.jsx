import React, { useState, useEffect } from "react";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";
import * as XLSX from "xlsx";

const PAGE_SIZE = 10;

function HasilDaftarMagang() {
  const [pesertaData, setPesertaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Get token from local storage
  const getToken = () => localStorage.getItem("token");

  const fetchPesertaData = async () => {
    const token = getToken();
    if (!token) {
      console.warn("Token tidak ditemukan. Silakan login ulang.");
      return;
    }

    try {
      console.log("Fetching data...");
      const response = await fetch("http://localhost:5000/api/users2", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the status of the response
      console.log("Response status:", response.status);

      // Check if response is ok
      if (response.ok) {
        const data = await response.json();

        // Log the fetched data
        console.log("Fetched data:", data);

        if (data) {
          setPesertaData(data);
        } else {
          console.warn(
            "Data applicantsList tidak ditemukan dalam respons API."
          );
          setPesertaData([]); // Set empty array if data is not found
        }
      } else {
        console.error("Failed to fetch data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPesertaData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(pesertaData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data Pelamar Magang");
    XLSX.writeFile(wb, "Data_Pelamar_Magang.xlsx");
  };

  const updateUserStatus = async (userId, status) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/status2",
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ userId, status }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        alert(`Status updated to ${status}`);
        // Refresh data after update
        fetchPesertaData();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = pesertaData;
  const totalPages = Math.ceil(pesertaData.length / PAGE_SIZE);
  console.log("currentData", currentData);
  console.log("currentData", currentData);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateString
      ? new Date(dateString).toLocaleDateString("id-ID", options)
      : "Kosong";
  };

  const handleOpenPDF = async (filePath) => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank"); // Membuka file PDF di tab baru
    } catch (error) {
      console.error("Error fetching the PDF:", error);
      console.log("filePath", filePath);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderAdmin className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Data Pelamar</h3>
          <button
            onClick={handleExportToExcel}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Export to Excel
          </button>
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
                  <th className="py-2 px-4 border-b">
                    Ketersediaan Penempatan
                  </th>
                  <th className="py-2 px-4 border-b">Surat Rekomendasi</th>
                  <th className="py-2 px-4 border-b">Curriculum Vitae</th>
                  <th className="py-2 px-4 border-b">Link Portofolio</th>
                  <th className="py-2 px-4 border-b">Durasi Awal Magang</th>
                  <th className="py-2 px-4 border-b">Durasi Akhir Magang</th>
                  <th className="py-2 px-4 border-b">Tanggal Pengajuan</th>
                  <th className="py-2 px-4 border-b">Status Lamaran</th>
                  <th className="py-2 px-4 border-b">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((peserta) => (
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
                      {peserta?.Regist?.available_space || "Kosong"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                          handleOpenPDF(
                            `prajagamer/Backend/ ${peserta.Regist.recommend_letter}`
                          )
                        }
                      >
                        {peserta.Regist.recommend_letter
                          ? "Lihat Surat"
                          : "Tidak tersedia"}
                      </button>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={peserta.Regist.cv || "#"}
                        className="text-blue-500 hover:underline"
                      >
                        {peserta.Regist.cv ? "Lihat CV" : "Tidak tersedia"}
                      </a>
                    </td>
                    <td className="py-2 px-4 border-b">
                      <a
                        href={peserta.Regist.portofolio || "#"}
                        className="text-blue-500 hover:underline"
                      >
                        {peserta.Regist.portofolio
                          ? "Lihat Portofolio"
                          : "Tidak tersedia"}
                      </a>
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
                    <td className="py-2 px-4 border-b">{peserta.status}</td>
                    <td className="py-2 px-4 border-b flex flex-row w-72">
                      <button
                        className="ml-2 px-4 py-2 w-full bg-green-500 text-white rounded hover:bg-green-600 hover:underline"
                        onClick={() => updateUserStatus(peserta.id, "Accepted")}
                      >
                        Terima
                      </button>
                      <button
                        className="ml-2 px-4 py-2 w-full bg-red-500 text-white rounded hover:bg-red-600 hover:underline"
                        onClick={() => updateUserStatus(peserta.id, "Rejected")}
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
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
}

export default HasilDaftarMagang;
