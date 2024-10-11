import React, { useState, useEffect } from 'react';

function ModalTambahAdmin({ isOpen, onClose, onAddAdmin }) {
  const [formData, setFormData] = useState({
    nama: '',
    nip: '',
    noTelp: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null); // State untuk menangani error

  // Reset the form data when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setFormData({
        nama: '',
        nip: '',
        noTelp: '',
        email: '',
        password: '',
      });
      setError(null); // Clear any existing errors when reopening the modal
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/admin/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Kirim token untuk autentikasi
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          admin_name: formData.nama, // Pastikan data yang dikirim sesuai dengan field yang diharapkan backend
          nip: formData.nip,
          telp_admin: formData.noTelp,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Gagal menambahkan admin');
      }

      const newAdmin = await response.json(); // Ambil data admin baru yang dikembalikan dari backend
      onAddAdmin(newAdmin);  // Kirim data admin baru ke parent (AkunAdmin)
      onClose(); // Tutup modal setelah berhasil menambahkan admin
    } catch (error) {
      console.error('Error menambahkan admin:', error);
      setError(error.message); // Tampilkan error jika ada
    }
  };

  if (!isOpen) return null; // Jika modal tidak terbuka, return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-80">
        <h2 className="text-xl font-bold mb-4">Tambah Admin</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nama">Nama</label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="nip">NIP</label>
            <input
              type="text"
              id="nip"
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="noTelp">No Telp</label>
            <input
              type="tel"
              id="noTelp"
              name="noTelp"
              value={formData.noTelp}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-red-500 text-gray-700 rounded shadow mr-2">
              Batalkan
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded shadow">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalTambahAdmin;