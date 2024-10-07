import React, { useState } from "react";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";

function UpdateInfo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false); // Tambahkan state untuk loading

  // Get token from local storage
  const getToken = () => localStorage.getItem("token");

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file upload
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if file is selected
    if (!selectedFile) {
      alert("Harap pilih file untuk diunggah.");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("banner", selectedFile); // Pastikan nama file sesuai dengan yang diterima server

    try {
      const token = getToken(); // Get token from local storage
      if (!token) {
        alert("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      setUploading(true); // Set loading to true

      const response = await fetch("http://localhost:5000/api/banner", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Attach Authorization header with Bearer token
        },
        body: formData, // Send FormData with the file
      });

      // Cek status response
      if (response.ok) {
        const result = await response.json();
        alert("File uploaded successfully.");
        console.log("Upload response:", result);
      } else {
        const errorMessage = await response.text();
        console.error("Error uploading file:", errorMessage);
        alert("Failed to upload file. " + errorMessage);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setUploading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderAdmin className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100 rounded shadow">
        <h2 className="text-xl font-bold mb-5">Upload Foto</h2>
        <div className="bg-white p-4 h-[215px] w-[500px] rounded shadow">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-700"
              >
                Pilih Foto
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 p-4 border border-gray-300 rounded w-full"
              />
            </div>
            {selectedFile && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  File yang dipilih: {selectedFile.name}
                </p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="submit"
                className={`bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 ${
                  uploading ? "cursor-not-allowed opacity-50" : ""
                }`}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Unggah"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateInfo;
