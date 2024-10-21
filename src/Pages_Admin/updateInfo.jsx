import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderAdmin from "../ComponentsAdmin/HeaderAdmin";

function UpdateInfo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // Preview URL for selected file
  const [uploadedBannerUrl, setUploadedBannerUrl] = useState(null); // URL for the uploaded banner
  const [bannerName, setBannerName] = useState("Lowongan"); // Banner name
  const [uploading, setUploading] = useState(false); // Loading state
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null); // State for error handling

  const getToken = () => localStorage.getItem("token");

  // Function to check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda belum login. Silakan login terlebih dahulu.");
      window.location.href = "/loginadmin"; // Redirect to login page if no token
    } else {
      fetchUploadedBanner(); // Fetch the banner if token exists
    }
  }, []);

  // Fetch banner from the server on component mount or after upload
  const fetchUploadedBanner = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/banner?nameBanner=${bannerName}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setUploadedBannerUrl(imageUrl); // Set the banner URL to state
      } else if (response.status === 404) {
        toast.error("Banner tidak ditemukan.");
      } else {
        toast.error("Gagal memuat banner.");
      }
    } catch (error) {
      console.error("Error fetching banner:", error);
      toast.error("Terjadi kesalahan saat memuat banner.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      toast.error(
        "Format file tidak didukung. Harap unggah file dengan format .jpg atau .png."
      );
      setSelectedFile(null);
      setPreviewUrl(null);
      fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the selected file
  };

  const handleBatalkan = () => {
    setSelectedFile(null); // Clear the selected file
    setPreviewUrl(null); // Clear the preview URL
    fileInputRef.current.value = ""; // Reset the input file field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!selectedFile) {
      toast.error("Harap pilih file untuk diunggah.");
      return;
    }
  
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file terlalu besar. Maksimum 5MB.");
      return;
    }
  
    const formData = new FormData();
    formData.append("banner", selectedFile);
    formData.append("bannerName", bannerName); // Include banner name
  
    try {
      const token = getToken();
      if (!token) {
        toast.error("Token tidak ditemukan. Silakan login kembali.");
        return;
      }
  
      setUploading(true);
  
      const response = await fetch("http://localhost:5000/api/banner", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        toast.success("Banner berhasil diunggah.");
        // Fetch the newly uploaded banner after successful upload
        fetchUploadedBanner();
        // Clear selected file and preview after successful upload
        setSelectedFile(null);
        setPreviewUrl(null);
        fileInputRef.current.value = ""; // Reset file input field
      } else {
        const errorMessage = await response.text();
        console.error("Error uploading file:", errorMessage);
        toast.error("Gagal mengunggah file. " + errorMessage);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Terjadi kesalahan saat mengunggah file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <HeaderAdmin className="relative z-20" />
      <div className="flex-1 flex flex-col ml-64 pt-16 p-6 mt-10 bg-gray-100">
        <h3 className="text-3xl font-bold mb-8">Data Pelamar</h3>
        <div className="flex-1 flex flex-row justify-between">
          {/* Left Side: Uploaded Banner */}
          <div className="bg-white p-4  w-[49%] rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Banner Terunggah:</h3>
            {uploadedBannerUrl ? (
              <img
                src={uploadedBannerUrl}
                alt="Uploaded Banner"
                className="w-full h-auto mb-2"
              />
            ) : (
              <p>Belum ada banner yang diunggah.</p>
            )}
          </div>

          {/* Right Side: Upload New Banner */}
          <div className="bg-white p-4  w-[49%] rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Upload Banner Baru:</h3>
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
                  className="mt-2 p-4 border border-gray-300 rounded-lg w-full"
                  ref={fileInputRef}
                />
              </div>

              {selectedFile && (
                <div className="mb-4">
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto mb-2"
                    />
                  )}
                  <p className="text-sm text-gray-600">
                    File yang dipilih: {selectedFile.name}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleBatalkan}
                    className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600"
                  >
                    Batalkan
                  </button>
                )}
                <button
                  type="submit"
                  className={`bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 ${
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

      <ToastContainer />
    </div>
  );
}

export default UpdateInfo;
