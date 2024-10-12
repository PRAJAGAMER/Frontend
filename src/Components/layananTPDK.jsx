import React, { useState } from "react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Logo from "../assets/Pictures/logodisdukcapil.png";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Semarang Barat
import SemarangBrt from "../assets/Pictures/smgbarat/semarangbarat.jpg";
import SemarangBrt1 from "../assets/Pictures/smgbarat/smgbrt1.jpg";
import SemarangBrt2 from "../assets/Pictures/smgbarat/smgbrt2.jpg";
import SemarangBrt3 from "../assets/Pictures/smgbarat/smgbrt3.jpg";
// Semarang Timur
import SemarangTmr from "../assets/Pictures/smgtimur/semarangtimur.jpg";
import SemarangTmr1 from "../assets/Pictures/smgtimur/smgtmr1.jpg";
import SemarangTmr2 from "../assets/Pictures/smgtimur/smgtmr2.jpg";
import SemarangTmr3 from "../assets/Pictures/smgtimur/smgtmr3.jpg";
// Semarang Utara
import SemarangUtr from "../assets/Pictures/smgutara/semarangutara.jpg";
import SemarangUtr1 from "../assets/Pictures/smgutara/smgutr1.jpg";
import SemarangUtr2 from "../assets/Pictures/smgutara/smgutr2.jpg";
import SemarangUtr3 from "../assets/Pictures/smgutara/smgutr3.jpg";
// Semarang Selatan
import SemarangSlt from "../assets/Pictures/smgselatan/semarangselatan.jpg";
import SemarangSlt1 from "../assets/Pictures/smgselatan/smgslt1.jpg";
import SemarangSlt2 from "../assets/Pictures/smgselatan/smgslt2.jpg";
import SemarangSlt3 from "../assets/Pictures/smgselatan/smgslt3.jpg";
// Semarang Tengah
import SemarangTgh from "../assets/Pictures/smgtengah/semarangtengah.jpg";
import SemarangTgh1 from "../assets/Pictures/smgtengah/smgtgh1.jpg";
import SemarangTgh2 from "../assets/Pictures/smgtengah/smgtgh2.jpg";
import SemarangTgh3 from "../assets/Pictures/smgtengah/smgtgh3.jpg";
// Gajahmungkur
import Gajahmungkur from "../assets/Pictures/gajahmungkur/gajahmungkur.jpg";
import Gajahmungkur1 from "../assets/Pictures/gajahmungkur/gjh1.jpg";
import Gajahmungkur2 from "../assets/Pictures/gajahmungkur/gjh2.jpg";
import Gajahmungkur3 from "../assets/Pictures/gajahmungkur/gjh3.jpg";
// Candisari
import Candisari from "../assets/Pictures/candisari/candisari.jpg";
import Candisari1 from "../assets/Pictures/candisari/candisari1.jpg";
import Candisari2 from "../assets/Pictures/candisari/candisari2.jpg";
import Candisari3 from "../assets/Pictures/candisari/candisari3.jpg";
// Tembalang
import Tembalang from "../assets/Pictures/tembalang/tembalang.jpg";
import Tembalang1 from "../assets/Pictures/tembalang/tembalang1.jpg";
import Tembalang2 from "../assets/Pictures/tembalang/tembalang2.jpg";
import Tembalang3 from "../assets/Pictures/tembalang/tembalang3.jpg";
// Pedurungan
import Pedurungan from "../assets/Pictures/pedurungan/pedurungan.jpg";
import Pedurungan1 from "../assets/Pictures/pedurungan/pedurungan1.jpg";
import Pedurungan2 from "../assets/Pictures/pedurungan/pedurungan2.jpg";
import Pedurungan3 from "../assets/Pictures/pedurungan/pedurungan3.jpg";
//Genuk
import Genuk from "../assets/Pictures/genuk/genuk.jpg";
import Genuk1 from "../assets/Pictures/genuk/genuk1.jpg";
import Genuk2 from "../assets/Pictures/genuk/genuk2.jpg";
import Genuk3 from "../assets/Pictures/genuk/genuk3.jpg";
// MPP
import Mpp from "../assets/Pictures/mpp/mpp.jpeg";
import Mpp1 from "../assets/Pictures/mpp/mpp1.jpeg";
import Mpp2 from "../assets/Pictures/mpp/mpp2.jpeg";
import Mpp3 from "../assets/Pictures/mpp/mpp3.jpg";
// Mijen
import Mijen from "../assets/Pictures/mijen/mijen.jpg";
import Mijen1 from "../assets/Pictures/mijen/mijen1.jpg";
import Mijen2 from "../assets/Pictures/mijen/mijen2.jpg";
import Mijen3 from "../assets/Pictures/mijen/mijen3.jpg";
//Ngaliyan
import Ngaliyan from "../assets/Pictures/ngaliyan/ngaliyan.jpg";
import Ngaliyan1 from "../assets/Pictures/ngaliyan/ngaliyan1.jpg";
import Ngaliyan2 from "../assets/Pictures/ngaliyan/ngaliyan2.jpg";
import Ngaliyan3 from "../assets/Pictures/ngaliyan/ngaliyan3.jpg";
// Gunungpati
import Gpati from "../assets/Pictures/gpati/gunungpati.jpg";
import Gpati1 from "../assets/Pictures/gpati/gunungpati1.jpg";
import Gpati2 from "../assets/Pictures/gpati/gunungpati2.jpg";
import Gpati3 from "../assets/Pictures/gpati/gunungpati3.jpg";
//Banyumanik
import Banyumanik from "../assets/Pictures/banyumanik/banyumanik.jpg";
import Banyumanik1 from "../assets/Pictures/banyumanik/banyumanik1.jpg";
import Banyumanik2 from "../assets/Pictures/banyumanik/banyumanik2.jpg";
import Banyumanik3 from "../assets/Pictures/banyumanik/banyumanik3.jpg";
// Tugu
import Tugu from "../assets/Pictures/tugu/tugu.jpg";
import Tugu1 from "../assets/Pictures/tugu/tugu1.jpg";
import Tugu2 from "../assets/Pictures/tugu/tugu2.jpg";
import Tugu3 from "../assets/Pictures/tugu/tugu3.jpg";
//Kantor
import Kantor from "../assets/Pictures/kantor/kantor1.jpg";
import Kantor1 from "../assets/Pictures/kantor/kantor.jpeg";
import Kantor2 from "../assets/Pictures/kantor/kantor2.png";
import Kantor3 from "../assets/Pictures/kantor/kantor3.png";

const subdistricts = [
  {
    name: "Semarang Tengah",
    image: SemarangTgh,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2204687804237!2d110.4173063747576!3d-6.983288893017581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bf506344767%3A0x5174998e8d5c5a90!2sDinas%20Kependudukan%20dan%20Catatan%20Sipil%20Kecamatan%20Semarang%20Tengah!5e0!3m2!1sid!2sid!4v1724573958758!5m2!1sid!2sid",
    photos: [SemarangTgh, SemarangTgh1, SemarangTgh2, SemarangTgh3],
    address:
      "Jl. Taman Seteran Barat No.1, Miroto, Semarang Tengah, Kota Semarang, Jawa Tengah 50134, Indonesia",
  },
  {
    name: "Semarang Utara",
    image: SemarangUtr,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.84191058169!2d110.36862565839913!3d-6.982134801977767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f5000f061e3d%3A0xdcc31b0280995d38!2sDispendukcapil%20kecamatan%20Semarang%20utara!5e0!3m2!1sid!2sid!4v1724574069338!5m2!1sid!2sid",

    photos: [SemarangUtr, SemarangUtr1, SemarangUtr2, SemarangUtr3],
    address:
      "Jl. Taman Brotojoyo No.2, Panggung Kidul, Semarang Utara, Kota Semarang, Jawa Tengah 50178, Indonesia",
  },
  {
    name: "Semarang Barat",
    image: SemarangBrt,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.2302198525877!2d110.3866504247576!3d-6.982137043018722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b0022c45cd1%3A0x6c69a8782b5b07f8!2sDinas%20Dukcapil%20Semarang%20Barat!5e0!3m2!1sid!2sid!4v1724573832751!5m2!1sid!2sid",
    photos: [SemarangBrt, SemarangBrt1, SemarangBrt2, SemarangBrt3],
    address:
      "Jl. Ronggolawe Baru. Gisikdrono Semarang Kota Semarang, Jawa Tengah 50149 Indonesia",
  },
  {
    name: "Semarang Timur",
    image: SemarangTmr,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.1685309361505!2d110.43466757499705!3d-6.989420893011616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d19fd2bc845%3A0xf858cbf1577e57a9!2sKantor%20Disdukcapil%20Semarang%20Timur!5e0!3m2!1sid!2sid!4v1724569057803!5m2!1sid!2sid",
    photos: [SemarangTmr, SemarangTmr1, SemarangTmr2, SemarangTmr3],
    address:
      "Jl. Krakatau VIII, Karangtempel, Semarang Tim., Kota Semarang, Jawa Tengah 50232, Indonesia",
  },
  {
    name: "Semarang Selatan",
    image: SemarangSlt,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.012423156699!2d110.43697287475787!3d-7.007819492993582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c8f0b493597%3A0xe5b8f7d5bb4f83b3!2sKantor%20Dinas%20Kependudukan%20dan%20Catatan%20Sipil%20Semarang%20Selatan!5e0!3m2!1sid!2sid!4v1724574119630!5m2!1sid!2sid",
    photos: [SemarangSlt, SemarangSlt1, SemarangSlt2, SemarangSlt3],
    address:
      "Jl. Durian I No.14, Lamper Kidul, Semarang Sel., Kota Semarang, Jawa Tengah 50249, Indonesia",
  },
  {
    name: "Gajahmungkur",
    image: Gajahmungkur,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495.00544325674707!2d110.40842682228612!3d-7.004155238733822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b6e7c58ba63%3A0xcd7c0efff6f97971!2sKantor%20Kecamatan%20Gajah%20Mungkur!5e0!3m2!1sid!2sid!4v1724574259742!5m2!1sid!2sid",
    photos: [Gajahmungkur, Gajahmungkur1, Gajahmungkur2, Gajahmungkur3],
    address: "Jl. S. Parman Semarang",
  },
  {
    name: "Candisari",
    image: Candisari,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.852488645765!2d110.42510247475799!3d-7.026619392975121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d9940e8ddff%3A0xbdbe15fff8c566d2!2sDisdukcapil%20Kecamatan%20Candisari!5e0!3m2!1sid!2sid!4v1724574318981!5m2!1sid!2sid",
    photos: [Candisari, Candisari1, Candisari2, Candisari3],
    address:
      "Jl. Kesatrian No.18, Jatingaleh, Kec. Candisari, Kota Semarang, Jawa Tengah 50254",
  },
  {
    name: "Tembalang",
    image: Tembalang,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.570833907863!2d110.44458407475842!3d-7.059606092942845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708ea19e89b313%3A0xf3f9d027b1fb35d3!2sDinas%20Kependudukan%20dan%20Pencatatan%20Sipil%20Kecamatan%20Tembalang!5e0!3m2!1sid!2sid!4v1724574360104!5m2!1sid!2sid",
    photos: [Tembalang, Tembalang1, Tembalang2, Tembalang3],
    address: "Jl. Imam Suparto Semarang",
  },
  {
    name: "Pedurungan",
    image: Pedurungan,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7920.088634428072!2d110.45219184033682!3d-7.004064421988934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708d3f1c62ad0b%3A0x44ca8eb7f2abfddb!2sDisdukcapil%20Kecamatan%20Pedurungan!5e0!3m2!1sid!2sid!4v1724574403548!5m2!1sid!2sid",
    photos: [Pedurungan, Pedurungan1, Pedurungan2, Pedurungan3],
    address: "Jl. Brigjend Sudiarto no.357 Semarang",
  },
  {
    name: "Genuk",
    image: Genuk,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31681.845763696103!2d110.43659139075011!3d-6.982077903191431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f31d664bbe97%3A0x348aed2e5022e223!2sTPDK%20Kecamatan%20Genuk!5e0!3m2!1sid!2sid!4v1724574462503!5m2!1sid!2sid",
    photos: [Genuk, Genuk1, Genuk2, Genuk3],
    address:
      "Jl. Dong Biru No. 12 Kelurahan Genuksari Kecamatan Genuk Kota Semarang Jawa Tengah 50117, Indonesia",
  },
  {
    name: "Mijen",
    image: Mijen,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.382790223194!2d110.30688107475862!3d-7.081544192921356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7063007bf3c437%3A0x5788aa565c9b1ea!2sTPDK%20DUKCAPIL%20MIJEN!5e0!3m2!1sid!2sid!4v1724574522920!5m2!1sid!2sid",
    photos: [Mijen, Mijen1, Mijen2, Mijen3],
    address:
      "Jalan Raya Semarang – Boja, Kel.Tambangan, Kec. Mijen, Kota Semarang, Jawa Tengah",
  },
  {
    name: "Ngaliyan",
    image: Ngaliyan,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126700.25128057359!2d110.22705381491494!3d-7.081536936507428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708bca9650e409%3A0xd00e8e45758f31a7!2sDukcapil%20Kecamatan%20Ngaliyan!5e0!3m2!1sid!2sid!4v1724574557072!5m2!1sid!2sid",
    photos: [Ngaliyan, Ngaliyan1, Ngaliyan2, Ngaliyan3],
    address: "JL. Prof Hamka No.233 Semarang",
  },
  {
    name: "Gunungpati",
    image: Gpati,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.1920760828925!2d110.38429697475883!3d-7.10372499289964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7088fc7a3a6f0d%3A0xb21ea15711159166!2sKantor%20Disdukcapil%20Gunungpati!5e0!3m2!1sid!2sid!4v1724574648504!5m2!1sid!2sid",
    photos: [Gpati, Gpati1, Gpati2, Gpati3],
    address:
      "Jl. MR Wuyanto No.33, Gunungpati, Gunung Pati, Sumurrejo, Semarang, Kota Semarang, Jawa Tengah 50226, Indonesia",
  },
  {
    name: "Banyumanik",
    image: Banyumanik,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.627424273391!2d110.4261209747582!3d-7.052990692949314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708c00e646c8c7%3A0xe73a6c9d622ed918!2sDispendukcapil%20Kecamatan%20Banyumanik%20Semarang!5e0!3m2!1sid!2sid!4v1724574688870!5m2!1sid!2sid",
    photos: [Banyumanik, Banyumanik1, Banyumanik2, Banyumanik3],
    address: "Jl. Ngesrep Timur V  Semarang",
  },
  {
    name: "Tugu",
    image: Tugu,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63363.23492676787!2d110.26872396469118!3d-6.985448409044181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b005b185129%3A0xd6e96beac36319c1!2sTpdk%20Dispenduk%20Capil%20tugu!5e0!3m2!1sid!2sid!4v1724574611651!5m2!1sid!2sid",
    photos: [Tugu, Tugu1, Tugu2, Tugu3],
    address:
      "Jl. Walisongo No.KM 10, Tugurejo, Kec. Tugu, Kota Semarang, Jawa Tengah",
  },
  {
    name: "Kantor Dinas",
    image: Kantor,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63354.0390362826!2d110.38749599174528!3d-7.052988880827344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708cbff9e4d3b5%3A0x4ba935bdc97951e5!2sDinas%20Kependudukan%20dan%20Pencatatan%20Sipil%20Kota%20Semarang!5e0!3m2!1sid!2sid!4v1724574739712!5m2!1sid!2sid",
    photos: [Kantor1, Kantor, Kantor2, Kantor3],
    address: "Jl. Kanguru Raya No. 3 Semarang - 50161 - Jawa Tengah ",
  },
  {
    name: "Mall Pelayanan Publik",
    image: Mpp,
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3410372577123!2d110.28510567737044!3d-6.969033375063926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705f5c71587f8f%3A0x7fce909d6d0a52f3!2sMal%20Pelayanan%20Publik%20Kota%20Semarang!5e0!3m2!1sid!2sid!4v1724574772944!5m2!1sid!2sid",
    photos: [Mpp1, Mpp, Mpp2, Mpp3],
    address:
      "Terminal Tipe A Mangkang , Kel. Mangkang Kulon, Kec. Tugu, Kota Semarang, Jawa Tengah",
  },
];

const layananTPDK = () => {
  const [activeSubdistrict, setActiveSubdistrict] = useState(subdistricts[0].name);
  const [index, setIndex] = useState(0);

  const subdistrict = subdistricts.find(
    (subdistrict) => subdistrict.name === activeSubdistrict
  );

  let districtSelected = subdistrict?.photos;

  const renderContent = () => {
    const { name, mapUrl, photos } = subdistrict || {};

    return (
      <div className="p-6 bg-white rounded-xl border-4 border-[#C54441] shadow-lg overflow-hidden">
        <h2 className="text-4xl font-bold mb-4 text-center pb-3 border-b-4 border-[#C54441]">
          {name}
        </h2>
        <div className="flex flex-col-reverse sm:flex-col md:flex-row lg:flex-row-reverse lg:justify-between py-5">
          <div className="flex lg:w-1/2 items-start">
            <div className="ml-4">
              <p className="text-lg font-bold">Alamat :</p>
              <p>{subdistrict?.address}</p>
            </div>
          </div>
          <div className="hidden lg:flex lg:items-start">
            <img src={Logo} alt="" className="h-11 mt-2" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">
                Dinas Kependudukan Dan Pencatatan Sipil
              </p>
              <p>Kota Semarang</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse sm:flex-col md:flex-row lg:flex-row">
          {/* Google Maps */}
          <div className="pt-5 lg:pt-0 md:w-1/2 md:pr-5 md:pt-0 lg:w-1/2 lg:pr-4">
            <div className="mb-6">
              <iframe
                src={mapUrl}
                style={{ border: 0, width: '100%', height: '300px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0 rounded-lg"
              ></iframe>
            </div>
          </div>
          {/* Photos */}
          <div className="grid grid-cols-2 gap-4">
            {photos?.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Foto ${index + 1}`}
                className={`h-32 w-60 object-cover rounded-lg ${
                  index === 0 || index === 3 ? 'col-span-1' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const sliderSettings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    beforeChange: (current, next) => {
      setActiveSubdistrict(subdistricts[next].name);
      setIndex(next);
    },
    responsive: [
      {
        breakpoint: 1024, // iPad and tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center bg-[#C54441] py-10">
      <div className="flex justify-center mb-10 gap-10">
        <Slider {...sliderSettings} className="w-full max-w-4xl">
          {subdistricts.map((subdistrict) => (
            <div
              key={subdistrict.name}
              onClick={() => setActiveSubdistrict(subdistrict.name)}
              className="px-2 py-5"
            >
              <div
                className={`cursor-pointer rounded-lg overflow-hidden border-2 border-red-500 ${
                  activeSubdistrict === subdistrict.name
                    ? 'transform scale-105'
                    : ''
                } hover:scale-105 transition-transform duration-300`}
              >
                <img
                  src={subdistrict.image}
                  alt={subdistrict.name}
                  className="w-full h-40 object-cover"
                />
                <div
                  className={`p-4 text-center ${
                    activeSubdistrict === subdistrict.name
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <span className="font-bold text-lg">{subdistrict.name}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full max-w-4xl mx-auto">{renderContent()}</div>
    </div>
  );
};

export default layananTPDK;