// import { create } from "zustand";

// export const useUserStore = create((set, get) => ({
//   // ------------------------
//   // state
//   // ------------------------
//   user: null,        // اطلاعات پایه کاربر (/users/me)
//   profile: null,     // پروفایل اختصاصی (فقط برای دندانپزشک)

//   // ------------------------
//   // setters
//   // ------------------------
//   setUser: (user) => {
//     set({ user });
//   },

//   setProfile: (profile) => {
//     set({ profile });
//   },

//   // ------------------------
//   // hydrate کامل (مهم‌ترین بخش)
//   // ------------------------
//   setAuthData: (userResponse, profileResponse = null) => {
//     set({
//       user: userResponse?.data ?? null,
//       profile: profileResponse?.data ?? null,
//     });

//     console.log("📦 Auth hydrated:", {
//       user: userResponse?.data,
//       profile: profileResponse?.data,
//     });
//   },

//   // ------------------------
//   // clear
//   // ------------------------
//   clear: () => {
//     set({ user: null, profile: null });
//     console.log("🗑️ Auth cleared");
//   },

//   // ------------------------
//   // computed
//   // ------------------------
//   isLoggedIn: () => !!get().user,

//   role: () => get().user?.role,

//   isAdmin: () => get().user?.role === "admin",
//   isDentist: () => get().user?.role === "dentist",
//   isPatient: () => get().user?.role === "patient",

//   hasProfile: () => !!get().profile,
  
//   isProfileComplete: () => {
//     const user = get().user;
//     const profile = get().profile;
    
//     if (user?.role === 'dentist') {
//       // بررسی کامل بودن پروفایل دندانپزشک
//       return !!(profile && profile.medicalCouncilNumber);
//     }
    
//     return true; // برای بیمارها نیاز به پروفایل خاصی نیست
//   },

//   // ------------------------
//   // safe getters
//   // ------------------------
//   getDentistProfile: () => {
//     const profile = get().profile;
//     const user = get().user;
    
//     if (!profile || user?.role !== "dentist") return null;

//     return {
//       userId: profile.userId,
//       medicalCouncilNumber: profile.medicalCouncilNumber,
//       birthDateShamsi: profile.birthDateShamsi,
//       yearsOfExperience: profile.yearsOfExperience,
//       specialization: profile.specialization,
//       degree: profile.degree,
//       portfolio: profile.portfolio,
//       additionalPhoneNumbers: profile.additionalPhoneNumbers,
//       address: profile.address,
//       rating: {
//         count: profile.ratingCount,
//         avg: profile.averageRating,
//       },
//     };
//   },
// }));









import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  // ------------------------
  // state
  // ------------------------
  user: null,
  profile: null,
  csrfToken: null, // 👈 اضافه شد

  // ------------------------
  // setters
  // ------------------------
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

  // ------------------------
  // hydrate کامل
  // ------------------------
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

  // ------------------------
  // clear
  // ------------------------
  clear: () => {
    set({
      user: null,
      profile: null,
      csrfToken: null, // 👈 پاک شدن هنگام logout
    });

    console.log("🗑️ Auth cleared");
  },

  // ------------------------
  // computed
  // ------------------------
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