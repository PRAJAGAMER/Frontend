import axios from "axios";
import { setToken, setUser } from "../Reducers/loginReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = (data, navigate) => async (dispatch, getState) => {
  try {
    const response = await axios.post(`https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/user/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const user = response.data.user;


      // Jika status akun aktif, lanjutkan proses login
      dispatch(setToken(response.data.token));
      dispatch(setUser(user));
      toast.success("Login Berhasil", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Login gagal! NIK atau password salah.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (error.response.status === 500) {
          toast.error("Terjadi kesalahan server. Silakan coba lagi nanti.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (error.response.status === 403) {
          toast.error("Akun Anda belum diverifikasi. Silakan hubungi admin.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Terjadi kesalahan. Periksa koneksi Anda.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    }
  }
};

export const register = (data, navigate) => async (dispatch, getState) => {
  console.log("Isi data:", data);

  try {
    // Mengirimkan permintaan POST ke API register dengan formData dan header multipart/form-data
    const response = await axios.post(
      `https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/user/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Cek jika respons status adalah 201 (Created)
    if (response.status === 201) {
      console.log("Register Berhasil:", response);
      alert("Registrasi berhasil!");
      navigate("/loginopsi");
    }
  } catch (error) {
    // Penanganan kesalahan saat melakukan permintaan
    console.error("Error during registration:", error);

    // Tampilkan alert jika registrasi gagal
    alert("Registrasi gagal. Silakan coba lagi.");
  }
};