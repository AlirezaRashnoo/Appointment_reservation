import { create } from "zustand";


export const useUserStore = create((set) => ({
    profile: null,
    setProfile: (profile) => set({ profile }),
    clearProfile: () => set({ profile: null }),
  
    isLoggedIn: () => !!useUserStore.getState().profile,
    isAdmin: () => useUserStore.getState().profile?.role === 'admin',
    isDentist: () => useUserStore.getState().profile?.role === 'dentist',
  }));

  