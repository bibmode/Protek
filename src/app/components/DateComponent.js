import React, { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, endOfToday, startOfWeek, endOfWeek } from "date-fns";

const DateComponent = ({ onDateChange, onDateTypeChange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState("monthly");

  const handleDateChange = (date) => {
    if (date) {
      setStartDate(date);
      setIsOpen(false);
      if (onDateChange) {
        onDateChange(date);
      }
    }
  };

  const handleDateTypeSelect = (dateType) => {
    setSelectedDateType(dateType);
    if (onDateTypeChange) {
      onDateTypeChange(dateType);
    }
  };

  const getDatePickerProps = () => {
    switch (selectedDateType) {
      case "yearly":
        return {
          dateFormat: "yyyy",
          showYearPicker: true,
          showMonthYearPicker: false,
          showDayPicker: false,
        };
      case "monthly":
        return {
          dateFormat: "MMMM yyyy",
          showMonthYearPicker: true,
          showDayPicker: false,
        };
      case "weekly":
        return {
          dateFormat: "MMMM d, yyyy",
          showMonthYearPicker: false,
          showDayPicker: true,
        };
      case "daily":
        return {
          dateFormat: "MMMM d, yyyy",
          showMonthYearPicker: false,
          showDayPicker: true,
        };
      default:
        return {};
    }
  };

  const datePickerProps = getDatePickerProps();

  // Calculate start and end of the week based on the selected date
  const getWeekRange = (date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
    const end = endOfWeek(date, { weekStartsOn: 1 }); // Sunday
    return { start, end };
  };

  // Adjust the filterDate to allow any past week up to today
  const filterDate = (date) => {
    if (selectedDateType === "weekly") {
      const { start, end } = getWeekRange(date);
      return date <= endOfToday() && date >= start;
    }
    return true; // Allow all dates for other types
  };

  return (
    <div className="flex ml-3">
      <select
        value={selectedDateType}
        onChange={(e) => handleDateTypeSelect(e.target.value)}
        className="p-2 border rounded-md rounded-r-none text-sm cursor-pointer"
      >
        <option value="yearly">Yearly</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="daily">Daily</option>
      </select>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md rounded-l-none border-l-0 flex items-center"
      >
        <IoMdCalendar className="text-2xl" />
        <p className="text-sm mx-2">
          {format(startDate, datePickerProps.dateFormat)}
        </p>
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
              filterDate={filterDate} // Apply filter for weekly
              {...datePickerProps}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateComponent;
