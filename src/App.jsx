import "./App.css";
import React from "react";
import { Provider } from "react-redux"; // Tambahkan import ini
import { store } from "./redux/store"; // Pastikan sudah mengimpor store
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Beranda from "./Pages/Beranda";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import InfoMitra from "./Pages/InfoMitra";
import FormPendaftaran1 from "./Pages/FormPendaftaran1";
import FormPendaftaran2 from "./Pages/FormPendaftaran2";
import DaftarMagang from "./Pages/DaftarMagang";
import ProfileUser from "./Pages/ProfileUser";
import EditProfile from "./Pages/EditProfile";
import InfoPendaftaran from "./Pages/InfoPendaftaran";
import DashboardAdmin from "./Pages_Admin/DashboardAdmin";
import DataPelamar from "./Pages_Admin/DataPelamar";
import UpdateInfo from "./Pages_Admin/updateInfo";
import AkunAdmin from "./Pages_Admin/akunAdmin";
import LoginAdmin from "./Pages_Admin/loginAdmin";
import DataPengguna from "./Pages_Admin/DataPengguna";
import EditProfilAdmin from "./Pages_Admin/EditProfilAdmin";
import SyaratKetentuan from "./Pages/syaratKetentuan";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Beranda />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "mitra",
      element: <InfoMitra />,
    },
    {
      path: "daftarmagang",
      element: <DaftarMagang />,
    },
    {
      path: "formpendaftaran1",
      element: <FormPendaftaran1 />,
    },
    {
      path: "formpendaftaran2",
      element: <FormPendaftaran2 />,
    },
    {
      path: "profileuser",
      element: <ProfileUser />,
    },
    {
      path: "editprofile",
      element: <EditProfile />,
    },
    {
      path: "infopendaftaran",
      element: <InfoPendaftaran />,
    },
    {
      path: "admin",
      element: <DashboardAdmin />,
    },
    {
      path: "datapelamar",
      element: <DataPelamar />,
    },
    {
      path: "updateinfo",
      element: <UpdateInfo />,
    },
    {
      path: "adminakun",
      element: <AkunAdmin />,
    },
    {
      path: "loginadmin",
      element: <LoginAdmin />,
    },
    {
      path: "datapengguna",
      element: <DataPengguna />,
    },
    {
      path: "editprofiladmin",
      element: <EditProfilAdmin />,
    },
    {
      path: "syaratdanketentuan",
      element: <SyaratKetentuan />,
    },
  ]);

  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
      
    </Provider>
  );
}
