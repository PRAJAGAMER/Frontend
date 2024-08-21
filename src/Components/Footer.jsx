import React from "react";
import Instagram from "../assets/Pictures/instagram.svg";
import Twitter from "../assets/Pictures/twitter.svg";

function Footer() {
  return (
    <div className="bg-[#FCFAFA] h-[365px]">
      <div className="grid grid-cols-3 py-10 px-20 gap-5">
        <div>
          <p className="font-bold text-3xl pt-2">Kontak Kami</p>
          <p className="text-lg">
            {" "}
            Jl. Kanguru Raya No. 3  Semarang - 50161 - Jawa Tengah 
          </p>
          <p className="text-lg">Whatsapp 089676309299 </p>
          <p className="text-lg">Fax. 024 6707203</p>
          <div className="flex space-x-4 pt-4">
            <a
              href="https://www.instagram.com/disdukcapilkotasemarang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="Instagram" className="h-8 w-8" />
            </a>
            <a
              href="https://x.com/i/flow/login?redirect_after_login=%2FDUKCAPILKOTASMG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Twitter} alt="Twitter" className="h-8 w-8" />
            </a>
          </div>
        </div>
        <div>
          <p className="font-bold text-3xl"> Jam Pelayanan</p>
          <p className="text-lg pt-2"> Senin - Kamis : 08.15 - 15.00 </p>
          <p className="text-lg">Jumat : 08.00 - 13.00 </p>
          <p className="text-lg py-6">Istirahat : 11.30 - 12.30 </p>
          <p className="text-lg">Sabtu dan Minggu : Libur </p>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15840.67412777143!2d110.42694274375839!3d-6.989420774207459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cbff9e4d3b5%3A0x4ba935bdc97951e5!2sDinas%20Kependudukan%20dan%20Pencatatan%20Sipil%20Kota%20Semarang!5e0!3m2!1sid!2sid!4v1724258942370!5m2!1sid!2sid"
            width="470"
            height="220"
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <p className="text-center py-5 font-bold">
        Copyright © 2024 Dinas Kependudukan dan Pencatatan Sipil Kota Semarang.
        All rights reserved
      </p>
    </div>
  );
}

export default Footer;
