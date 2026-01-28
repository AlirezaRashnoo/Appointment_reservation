import React, { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { useNavigate } from "react-router-dom";

export default function AuthInit() {
  // const setProfile = useUserStore((state) => state.setProfile);
  // const clearProfile = useUserStore((state) => state.clearProfile);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   async function fetchUserProfile() {
  //     const {
  //       data: { user },
  //       error: userError,
  //     } = await supabase.auth.getUser();

  //     if (userError || !user) {
  //       clearProfile();
  //       // navigate("/login");
  //       return;
  //     }

  //     const { data: profile, error: profileError } = await supabase
  //       .from("profiles")
  //       .select("*")
  //       .eq("user_id", user.id)
  //       .single();

  //     if (profileError || !profile) {
  //       clearProfile();
  //       // navigate("/login");
  //       return;
  //     }

  //     setProfile(profile);
  //   }

  //   fetchUserProfile();
  // }, [clearProfile, navigate, setProfile]);

  // return null;


  return(
    <div>Authinit</div>
  )
}