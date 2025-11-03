// import React, { useEffect } from "react";
// import { useUserStore } from "@/stores/useUserStore";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// import supabase from "@/api/supabase";

// export default function AuthInit() {
//   const setProfile = useUserStore((state) => state.setProfile);
//   const clearProfile = useUserStore((state) => state.clearProfile);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = Cookies.get("token");

//     if (!token) {
//       clearProfile();
//       // navigate("/login");
//       return;
//     }

//     async function fetchUserProfile() {
//       try {
//         // ست کردن توکن به صورت دستی
//         await supabase.auth.setSession({
//           access_token: token,
//           refresh_token: "", // اگر نداری، خالی بذار
//         });

//         const { data: userData, error: userError } = await supabase.auth.getUser();

//         if (userError || !userData?.user?.id) {
//           throw new Error("User not found");
//         }

//         const userId = userData.user.id;

//         const { data: profile, error: profileError } = await supabase
//           .from("profiles")
//           .select("*")
//           .eq("user_id", userId)
//           .single();

//         if (profileError || !profile) {
//           throw new Error("Profile not found");
//         }

//         setProfile(profile);
//       } catch (error) {
//         clearProfile();
//         Cookies.remove("token");
//         navigate("/login");
//       }
//     }

//     fetchUserProfile();
//   }, [clearProfile, navigate, setProfile]);

//   return null;
// }

import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";
import supabase from "@/api/supabase";

export default function AuthInit() {
  const setProfile = useUserStore((state) => state.setProfile);
  const clearProfile = useUserStore((state) => state.clearProfile);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserProfile() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        clearProfile();
        // navigate("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError || !profile) {
        clearProfile();
        // navigate("/login");
        return;
      }

      setProfile(profile);
    }

    fetchUserProfile();
  }, [clearProfile, navigate, setProfile]);

  return null;
}