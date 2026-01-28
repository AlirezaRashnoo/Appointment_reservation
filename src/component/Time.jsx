// import React from "react";
// import { useAppointmentStore } from "@/stores/appointment";

// function Time({ time }) {
//   const { selectedTime, setSelectedTime } = useAppointmentStore();
//   const isSelected = selectedTime === time;

//   return (
//     <button
//       className={`w-20 h-9 border px-1.5 py-1 rounded-xl ${
//         isSelected ? "bg-blue-500 text-white" : "border-gray-400"
//       }`}
//       onClick={() => setSelectedTime(time)}
//     >
//       {time}
//     </button>
//   );
// }

// export default Time;











import React from "react";
// import { useAppointmentStore } from "@/stores/appointment";

function Time() {
  // const { selectedTime, setSelectedTime } = useAppointmentStore();
  // const isSelected = selectedTime === time;

  return (
    <button
      className='w-20 h-9 border px-1.5 py-1 rounded-xl'
       
      onClick={() => setSelectedTime(time)}
    >
      {/* {time} */}
      زمان
    </button>
  );
}

export default Time;