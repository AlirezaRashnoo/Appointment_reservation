// hooks/useLogout.js

// import { useNavigate } from "react-router-dom";
// import { api } from "../services/api";
// import { useAuthStore } from "../store/authStore";
// import { useUserStore } from "@/stores/useUserStore";

// export const useLogout = () => {
//   const navigate = useNavigate();
//   const setCsrfToken = useUserStore((state) => state.setCsrfToken);

//   const { csrfToken, clearAuth } = useAuthStore();

//   const logout = async () => {
//     try {
//       await api.post(
//         "/auth/logout",
//         {},
//         {
//           headers: {
//             "X-CSRF-Token": csrfToken,
//           },
//           withCredentials: true,
//         }
//       );

//     } catch (error) {
//       console.log(error);
//     } finally {
//       // همیشه پاک شود
//       clearAuth();

//       navigate("/", {
//         replace: true,
//       });
//     }
//   };

//   return logout;
// };




// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuthStore } from "../store/authStore";

// export const useLogout = () => {
//   const navigate = useNavigate();

//   const { csrfToken, clearAuth } = useAuthStore();

//   const logout = async () => {
//     try {
//       await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/auth/logout`,
//         {},
//         {
//           headers: {
//             "X-CSRF-Token": csrfToken,
//           },
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       clearAuth();

//       navigate("/", {
//         replace: true,
//       });
//     }
//   };

//   return logout;
// };











import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

export const useLogout = () => {
  const navigate = useNavigate();

  const csrfToken = useUserStore(
    (state) => state.csrfToken
  );

  const clear = useUserStore(
    (state) => state.clear
  );

  const logout = async () => {
    try {
      await axios.post(
        "https://dentist-reyn.onrender.com/api/v1/auth/logout",
        {},
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clear();

      navigate("/", {
        replace: true,
      });
    }
  };

  return logout;
};