import { create } from "zustand";

export const useAppointmentStore = create((set) => ({
  selectedTime: null,
  selectedDate: null,
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  clearSelectedTime: () => set({ selectedTime: null }),
  clearSelectedDate: () => set({ selectedDate: null }),
}));






