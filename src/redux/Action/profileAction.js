import axios from "axios";
import { setPostUpdateProfile, setProfil } from "../Reducers/profileReducers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const getDataProfil = () => async (dispatch, getState) => {
  try {
    // console.log("Starting fetch data profil"); // Debug log

    // Get token from the Redux state (assuming it's stored in state.auth.token)
    const token = getState().auth.token;
    // console.log("Token from state:", token); // Debug log

    // Set Authorization header with the token
    const response = await axios.get("https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token here
      },
    });

    // Check for successful response
    if (response.status === 200) {
      // console.log("Data profile login:", response.data); // Debug log
      dispatch(setProfil(response.data));
    }
  } catch (error) {
    // Handle error and dispatch error state
    // console.error("Error fetching data:", error);
  }
};

export const postUpdateProfil =
  (data, navigate) => async (dispatch, getState) => {
    // console.log("form Data 111", data);
    try {
      // Get token from the Redux state
      const token = getState().auth.token;
      // console.log("Token from state:", token);

      // Set Authorization header with the token
      const response = await axios.post(
        "https://backend-prajagamer-920196572245.asia-southeast2.run.app/api/profile",
        data,
        {
          headers: {
              'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );

      // Check for successful response
      if (response.status === 200) {
        // Dispatch the profile update action
        dispatch(setPostUpdateProfile(response.data));

        // Navigate to the user profile page
        navigate("/profileuser");

        // Show success toast notification
        toast.success("Profil berhasil diperbarui!", {
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
      // console.error("Error fetching data:", error);

      toast.error("Gagal memperbarui profil. Coba lagi nanti!", {
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
