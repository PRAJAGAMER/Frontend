import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/navbar";

function SyaratKetentuan() {
  return (
    <div>
      <Navbar />

      <div className="p-6 bg-white">
        <div className="mt-24 px-16">
          <h1 className="text-4xl font-bold mb-4 text-center ">Syarat & Ketentuan</h1>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">A. Dokumen Terlapir</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Lampirkan dokumen yang dibutuhkan seperti CV, Surat Rekomendasi
                dan Portofolio (jika ada).
              </li>
              <li>Ukuran file yang di-upload max. 5 MB.</li>
              <li>
                Pastikan dokumen yang dilampirkan benar adanya, tanpa rekayasa.
              </li>
              <li>
                Jika dokumen tidak sesuai dengan ketentuan, maka kami,
                Disdukcapil Kota Semarang berhak menolak pendaftaran mahasiswa
                terkait.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">B. Tata Tertib</h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Saat sudah diterima magang, mahasiswa wajib menaati peraturan
                dan tata tertib yang antara lain:
              </li>
              <li>Berangkat tepat waktu.</li>
              <li>
                Memakai kemeja dan celana kain (pria) & sopan dan rapi (wanita)
                Sesuai yang telah ditentukan.
              </li>
              <li>Mengerjakan tugas yang diberikan.</li>
              <li>
                Berperilaku sopan dan santun terhadap seluruh karyawan di
                Disdukcapil Kota Semarang.
              </li>
              <li>
                Mahasiswa magang tidak terlibat dalam tindakan kriminal atau
                kegiatan politik dalam bentuk apapun.
              </li>
              <li>
                Jika mahasiswa magang tidak mengikuti peraturan yang ada, maka
                kami, Disdukcapil Kota Semarang berhak untuk memberi peringatan
                dan memberhentikan mahasiswa dari program magang mereka.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SyaratKetentuan;
