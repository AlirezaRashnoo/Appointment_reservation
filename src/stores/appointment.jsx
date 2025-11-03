// import { create } from "zustand";

// export const useAppointmentStore = create((set) => ({
//   selectedTime: null,
//   setSelectedTime: (time) => set({ selectedTime: time }),
//   clearSelectedTime: () => set({ selectedTime: null }),
// }));



// -=-----------------------------------------------------------

// stores/useAppointmentStore.js
// import { create } from "zustand";

// export const useAppointmentStore = create((set) => ({
//   selectedTime: null,
//   selectedDate: null,
//   setSelectedTime: (time) => set({ selectedTime: time }),
//   setSelectedDate: (date) => set({ selectedDate: date }),
//   clearSelection: () => set({ selectedTime: null, selectedDate: null }),
// }));

// -=-----------------------------------------------------------
// stores/appointment.js
// import { create } from "zustand";

// export const useAppointmentStore = create((set) => ({
//   selectedTime: null,
//   selectedDate: null,
//   setSelectedTime: (time) => set({ selectedTime: time }),
//   setSelectedDate: (date) => set({ selectedDate: date }),
//   clearSelectedTime: () => set({ selectedTime: null }),
//   clearSelectedDate: () => set({ selectedDate: null }),
// }));


// -=-----------------------------------------------------------


// stores/appointment.js
// import { create } from "zustand";

// export const useAppointmentStore = create((set) => ({
//   selectedTime: null,
//   selectedDate: null, // تاریخ به صورت { year, month, day }
//   setSelectedTime: (time) => set({ selectedTime: time }),
//   setSelectedDate: (date) => set({ selectedDate: date }),
//   clearSelectedTime: () => set({ selectedTime: null }),
//   clearSelectedDate: () => set({ selectedDate: null }),
// }));

// -=-----------------------------------------------------------

// stores/appointment.js
import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  selectedTime: null,
  selectedDate: null,
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  clearSelectedTime: () => set({ selectedTime: null }),
  clearSelectedDate: () => set({ selectedDate: null }),
}));






