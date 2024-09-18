import React, { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, endOfToday } from "date-fns";

const LotDateComponent = ({ startDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (date) => {
    if (date) {
      onDateChange(date);
      setIsOpen(false);
    }
  };

  return (
    <div className="flex ml-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center"
      >
        <IoMdCalendar className="text-2xl" />
        <p className="text-sm mx-2">{format(startDate, "MMMM d, yyyy")}</p>
        <FaChevronDown className="text-xs" />
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 top-[9.2rem] bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="p-2">
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              inline
              maxDate={endOfToday()} // Restrict selection to dates up to today
              dateFormat="MMMM d, yyyy"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LotDateComponent;
