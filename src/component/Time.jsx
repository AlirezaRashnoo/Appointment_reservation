// import React from "react";


// function Time() {
//     return ( 
//         <div className="flex items-center justify-between">
//             <label htmlFor="14:30">14:30</label>
//             <input 
//             type="radio" 
//             id='14:30'
//             name="option" 
//             value='14:30'
//             className=''
//             // checked={patient.gender === 'female'}
//             // {patient.gender? patient.gender == "female" : gender === "female"}
//             />
//         </div>
//      );
// }

// export default Time;



// ---------------------------------------------------------------------------------



import React from "react";
import { useAppointmentStore } from "@/stores/appointment";

function Time({ time }) {
  const { selectedTime, setSelectedTime } = useAppointmentStore();
  const isSelected = selectedTime === time;

  return (
    <button
      className={`w-20 h-9 border px-1.5 py-1 rounded-xl ${
        isSelected ? "bg-blue-500 text-white" : "border-gray-400"
      }`}
      onClick={() => setSelectedTime(time)}
    >
      {time}
    </button>
  );
}

export default Time;
