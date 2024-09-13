import axios from "axios";
import {
  setDataFormPendaftaran,
  setPendaf,
} from "../Reducers/pendaftaranMagangReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getDataPendaftaran = () => async (dispatch, getState) => {
  try {
    console.log("Starting fetch data pendaftaran"); // Debug log

    // Get token from the Redux state (assuming it's stored in state.auth.token)
    const token = getState().auth.token;
    console.log("Token from state:", token); // Debug log

    // Set Authorization header with the token
    const response = await axios.get(
      "http://localhost:5000/api/internship-form",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );

    console.log("Response status:", response.status); // Debug log
    // Check for successful response
    if (response.status === 200) {
      console.log("Data pendaftaran:", response.data.formData); // Debug log
      dispatch(setPendaf(response.data.formData));
    }
  } catch (error) {
    // Handle error and dispatch error state
    console.error("Error fetching data:", error);
  }
};

export const postPendaftaranMagang =
  (formData, navigate) => async (dispatch, getState) => {
    console.log("form Data Form", formData);

    try {
      // Get token from the Redux state
      const token = getState().auth.token;
      console.log("Token from state:", token); // Debug log

      // Create FormData instance
      const data = new FormData();

      // Append form data
      data.append("available_space", formData.available_space);
      data.append("first_period", formData.first_period);
      data.append("last_period", formData.last_period);

      // Append files if they exist
      if (formData.recommend_letter) {
        data.append("recommend_letter", formData.recommend_letter);
      }
      if (formData.portofolio) {
        data.append("portofolio", formData.portofolio);
      }
      if (formData.cv) {
        data.append("cv", formData.cv);
      }

      // Get token from the Redux state (assuming it's stored in state.auth.token)

      console.log("Token from state:", token); // Debug log

      // Set Authorization header with the token
      const response = await axios.post(
        "http://localhost:5000/api/apply-internship",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );
      console.log("response postPendaftaranMagang", response);

     // Check for successful response
     if (response.status === 200) {
      console.log("Data profile login:", response.data); // Debug log
      dispatch(setDataFormPendaftaran(response.data));
      navigate("/");

      // Show success toast notification
      toast.success("Pendaftaran magang berhasil!", {
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
  } catch (error) {
    // Handle error and show error toast notification
    console.error("Error fetching data:", error);

    toast.error("Gagal melakukan pendaftaran magang. Coba lagi nanti!", {
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
};