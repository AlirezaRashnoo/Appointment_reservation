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