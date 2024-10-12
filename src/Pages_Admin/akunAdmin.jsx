import React, { useState, useEffect } from "react";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";
import {
  PlusCircleIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/solid";
import ModalTambahAdmin from "../ComponentsAdmin/modalTambahAdmin";

function AkunAdmin() {
  const [adminData, setAdminData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const [error, setError] = useState(null); // State for error handling

  // Function to check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      localStorage.removeItem("token"); // Hapus token jika tidak ada
      window.location.href = "/loginadmin"; // Redirect ke halaman login
    } else {
      fetchAdminData();
    }
  }, []);

  const fetchAdminData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      localStorage.removeItem("token"); // Hapus token jika tidak ada
      window.location.href = "/loginadmin";
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError("Akses tidak diizinkan. Silakan login ulang.");
          localStorage.removeItem("token"); // Hapus token jika tidak valid
          window.location.href = "/loginadmin"; // Redirect ke halaman login
        } else {
          throw new Error("Gagal mengambil data admin");
        }
      }

      const data = await response.json();
      setAdminData(data);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5000/api/admin/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus admin");
      }

      setAdminData(adminData.filter((admin) => admin.id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddAdmin = async (newAdmin) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data admin setelah penambahan");
      }

      const updatedAdminData = await response.json();
      setAdminData(updatedAdminData);
    } catch (error) {
      console.error("Error fetching updated admin data:", error);
    }

    handleCloseModal();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortData = (data) => {
    if (sortOption === "newest") {
      return [...data].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortOption === "oldest") {
      return [...data].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortOption === "alphabetical") {
      return [...data].sort((a, b) => a.admin_name.localeCompare(b.admin_name));
    }
    return data;
  };

  const filteredData = sortData(
    adminData.filter(
      (admin) =>
        admin.admin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.nip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin className="relative z-20" />

      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <h3 className="text-3xl font-bold mb-5">Akun Admin</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 font-semibold text-md">
            <span>Jumlah setiap halaman</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded-lg p-1"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Cari admin..."
                className="pl-10 pr-4 py-2 border rounded"
              />
              <MagnifyingGlassIcon className="absolute left-2 top-2 w-6 h-6 text-gray-400" />
            </div>

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

            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold flex justify-center items-center gap-2"
              onClick={handleOpenModal}
            >
              <PlusCircleIcon className="h-5 w-5" />
              Tambah Admin
            </button>

            <ModalTambahAdmin
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onAddAdmin={handleAddAdmin}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
          <div className="w-full mx-auto">
            {" "}
            {/* Set the fixed-width container */}
            <table className="min-w-full bg-white table-fixed">
              {" "}
              {/* Added table-fixed class for equal-width columns */}
              <thead>
                <tr>
                  <th className="py-2 pb-4 border-b w-1/5">Nama</th>
                  <th className="py-2 pb-4 border-b w-1/5">NIP</th>
                  <th className="py-2 pb-4 border-b w-1/5">No. Telp</th>
                  <th className="py-2 pb-4 border-b w-1/5">Email</th>
                  <th className="py-2 pb-4 border-b w-1/5">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((admin) => (
                    <tr key={admin.id}>
                      <td className="py-2 px-4 border-b">{admin.admin_name}</td>
                      <td className="py-2 px-4 border-b">{admin.nip}</td>
                      <td className="py-2 px-4 border-b">{admin.telp_admin}</td>
                      <td className="py-2 px-4 border-b">{admin.email}</td>
                      <td className="py-2 border-b flex items-center justify-center">
                        <button
                          onClick={() => handleDelete(admin.id)}
                          className="ml-2 px-4 py-2 w-50 bg-red-500 text-white rounded-lg hover:bg-red-600 flex justify-center items-center"
                        >
                          Hapus Akun
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Tidak ada data admin
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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

export default AkunAdmin;
