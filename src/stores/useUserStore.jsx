// import { create } from "zustand";


// export const useUserStore = create((set) => ({
//     profile: null,
//     setProfile: (profile) => set({ profile }),
//     clearProfile: () => set({ profile: null }),
  
//     isLoggedIn: () => !!useUserStore.getState().profile,
//     isAdmin: () => useUserStore.getState().profile?.role === 'admin',
//     isDentist: () => useUserStore.getState().profile?.role === 'dentist',
//   }));

  



// -----------------------------------------------------------------------











// import { create } from "zustand";
// import Cookies from 'js-cookie';

// export const useUserStore = create((set) => ({
//   profile: null,  // فقط پروفایل ذخیره می‌شود (توکن‌ها در کوکی‌ها ذخیره می‌شوند)

//   // برای تنظیم پروفایل کاربر
//   setProfile: (profile) => {
//     set({ profile }); // فقط پروفایل ذخیره می‌شود
//     // توکن‌ها در کوکی‌ها ذخیره می‌شوند
//     Cookies.set('access_token', profile.access_token, { secure: true, httpOnly: true, expires: 7 });
//     Cookies.set('csrf_token', profile.csrf_token, { secure: true, httpOnly: true, expires: 7 });
//     Cookies.set('refresh_token', profile.refresh_token, { secure: true, httpOnly: true, expires: 7 });
//   },

//   // برای پاک کردن پروفایل
//   clearProfile: () => {
//     set({ profile: null });
//     // حذف توکن‌ها از کوکی‌ها
//     Cookies.remove('access_token');
//     Cookies.remove('csrf_token');
//     Cookies.remove('refresh_token');
//   },

//   // متد برای بررسی وضعیت ورود کاربر
//   isLoggedIn: () => !!useUserStore.getState().profile,

//   // متد برای چک کردن نقش کاربر
//   isAdmin: () => useUserStore.getState().profile?.role === 'admin',
//   isDentist: () => useUserStore.getState().profile?.role === 'dentist',
// }));

// // متد برای دریافت توکن‌ها از کوکی‌ها
// export const getToken = () => {
//   const access_token = Cookies.get('access_token');
//   const csrf_token = Cookies.get('csrf_token');
//   const refresh_token = Cookies.get('refresh_token');
//   return { access_token, csrf_token, refresh_token };
// };









// import { create } from "zustand";

// export const useUserStore = create((set, get) => ({
//   profile: null,

//   setProfile: (profile) => set({ profile }),

//   clearProfile: () => set({ profile: null }),

//   isLoggedIn: () => !!get().profile,

//   isAdmin: () => get().profile?.role === 'admin',
//   isDentist: () => get().profile?.role === 'dentist',
// }));







import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  profile: null,

  setProfile: (profile) => {
    set({ profile });
    console.log('📦 store به‌روزرسانی شد:', profile);
  },

  clearProfile: () => {
    set({ profile: null });
    console.log('🗑️ store پاک شد');
  },

  isLoggedIn: () => !!get().profile,

  isAdmin: () => get().profile?.role === 'admin',
  
  isDentist: () => get().profile?.role === 'dentist',
}));