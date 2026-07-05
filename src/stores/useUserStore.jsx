import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,
  profile: null,
  csrfToken: null, 

  
  setUser: (user) => {
    set({ user });
  },

  setProfile: (profile) => {
    set({ profile });
  },

  setCsrfToken: (token) => {
    set({ csrfToken: token });
    console.log("🔐 CSRF Token saved:", token);
  },

  setAuthData: (userResponse, profileResponse = null) => {
    set({
      user: userResponse?.data ?? null,
      profile: profileResponse?.data ?? null,
    });

    console.log("📦 Auth hydrated:", {
      user: userResponse?.data,
      profile: profileResponse?.data,
    });
  },

  clear: () => {
    set({
      user: null,
      profile: null,
      csrfToken: null, 
    });

    console.log("🗑️ Auth cleared");
  },

  isLoggedIn: () => !!get().user,

  role: () => get().user?.role,

  isAdmin: () => get().user?.role === "admin",
  isDentist: () => get().user?.role === "dentist",
  isPatient: () => get().user?.role === "patient",

  hasProfile: () => !!get().profile,

  isProfileComplete: () => {
    const user = get().user;
    const profile = get().profile;

    if (user?.role === "dentist") {
      return !!(profile && profile.medicalCouncilNumber);
    }

    return true;
  },

  getDentistProfile: () => {
    const profile = get().profile;
    const user = get().user;

    if (!profile || user?.role !== "dentist") return null;

    return {
      userId: profile.userId,
      medicalCouncilNumber: profile.medicalCouncilNumber,
      birthDateShamsi: profile.birthDateShamsi,
      yearsOfExperience: profile.yearsOfExperience,
      specialization: profile.specialization,
      degree: profile.degree,
      portfolio: profile.portfolio,
      additionalPhoneNumbers: profile.additionalPhoneNumbers,
      address: profile.address,
      rating: {
        count: profile.ratingCount,
        avg: profile.averageRating,
      },
    };
  },
}));