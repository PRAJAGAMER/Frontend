import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalTambahAdmin({ isOpen, onClose, onAddAdmin }) {
  const [formData, setFormData] = useState({
    nama: "",
    nip: "",
    noTelp: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({}); // State untuk menangani error
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Reset the form data when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama: "",
        nip: "",
        noTelp: "",
        email: "",
        password: "",
      });
      setErrors({}); // Set errors to an empty object, not null
    }
  }, [isOpen]);

  const handleNama = (e) => {
    setFormData({ ...formData, nama: e.target.value });
    setErrors({ ...errors, nama: "" });
  };

  const handleNIP = (e) => {
    setFormData({ ...formData, nip: e.target.value });
    setErrors({ ...errors, nip: "" });
  };

  const handleNoTelp = (e) => {
    setFormData({ ...formData, noTelp: e.target.value });
    setErrors({ ...errors, noTelp: "" });
  };

  const handleEmail = (e) => {
    setFormData({ ...formData, email: e.target.value });
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
    setErrors({ ...errors, password: "" });
  };

  const validate = () => {
    let errors = {};

    const { nama, nip, noTelp, email, password } = formData;

    // Validasi NIP
    if (!nip) {
      errors.nip = "NIP harus diisi.";
    } else if (!/^\d{18}$/.test(nip)) {
      errors.nip = "NIP harus angka dan terdiri dari 18 angka.";
    }

    // Validasi Nama Lengkap
    if (!nama) {
      errors.nama = "Nama lengkap harus diisi.";
    } else if (!/^[A-Za-z\s]+$/.test(nama)) {
      errors.nama = "Nama hanya boleh terdiri dari huruf dan spasi.";
    }

    // Validasi Password
    if (!password) {
      errors.password = "Password harus diisi.";
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
      errors.password =
        "Password terdiri minimal 8 karakter, 1 huruf kapital dan 1 angka.";
    }

    // Validasi Email
    if (!email) {
      errors.email = "Email harus diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Format email tidak valid.";
    }

    // Validasi Nomor Telepon
    if (!noTelp) {
      errors.noTelp = "Nomor telepon harus diisi.";
    } else if (!/^\d+$/.test(noTelp)) {
      errors.noTelp = "Nomor telepon hanya boleh terdiri dari angka.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (validate()) {
      try {
        const response = await fetch(
          "https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/admin/register",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              admin_name: formData.nama,
              nip: formData.nip,
              telp_admin: formData.noTelp,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        console.log(response); // Periksa status respons server

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error("Error response:", errorMessage); // Tampilkan error yang dikirim server
          throw new Error(errorMessage || "Gagal menambahkan admin");
        }

        const newAdmin = await response.json(); // Ambil data admin baru yang dikembalikan dari backend
        onAddAdmin(newAdmin); // Kirim data admin baru ke parent (AkunAdmin)
        toast.success("Admin berhasil ditambahkan!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); // Notifikasi berhasil
        onClose(); // Tutup modal setelah berhasil menambahkan admin
      } catch (errors) {
        //  console.error("Error menambahkan admin:", errors);
        toast.error(`Gagal menambahkan admin: ${errors.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }); // notif gagal
        setErrors(errors.message); // Tampilkan error jika ada
      }
    }
  };

  if (!isOpen) return null; // Jika modal tidak terbuka, return null
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle show/hide password
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-gray-800 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-80">
        <h2 className="text-xl font-bold mb-4">Tambah Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nama"
            >
              Nama
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleNama}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
            ${errors.nama ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.nama && <p className="text-red-500">{errors.nama}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nip"
            >
              NIP
            </label>
            <input
              type="text"
              id="nip"
              name="nip"
              value={formData.nip}
              onChange={handleNIP}
              maxLength={18}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
            ${errors.nip ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.nip && <p className="text-red-500">{errors.nip}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="noTelp"
            >
              No Telp
            </label>
            <input
              type="tel"
              id="noTelp"
              name="noTelp"
              value={formData.noTelp}
              onChange={handleNoTelp}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
            ${errors.noTelp ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.noTelp && <p className="text-red-500">{errors.noTelp}</p>}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleEmail}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545]
            ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>

          <div className={`mb-4 relative ${errors.password ? "pt-3" : ""}`}>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"} // Ubah type input berdasarkan state
              id="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D24545] ${
                errors.password ? " border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-14 right-3 flex items-center text-gray-500"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>

            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded shadow mr-2"
            >
              Batalkan
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white  font-semibold rounded shadow"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTambahAdmin;
