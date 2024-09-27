import React from "react";
import { format, parse } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";

const TellersLog = ({ tellersLog, onMoreDetails }) => {
  // Function to safely parse and format time
  const parseAndFormatTime = (time) => {
    if (!time) return "-";
    // Attempt to parse and format the time
    try {
      const [hours, minutes] = time.split(":");
      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error("Invalid time format");
      }
      const date = parse(`${hours}:${minutes}`, "HH:mm", new Date());
      return format(date, "h:mm a");
    } catch {
      return "Invalid Time";
    }
  };

  return (
    <>
      <div className="p-4 flex justify-between border-b border-gray-200">
        <div className="py-1 pl-2">
          <p className="font-medium">Logs</p>
          <p className="text-[0.68rem] text-gray-600">
            See latest log ins from branch tellers
          </p>
        </div>
        <button
          className="flex items-center text-blue-500 hover:text-blue-300 pr-1"
          onClick={onMoreDetails}
        >
          <p className="text-xs font-semibold">More details</p>
          <IoIosArrowForward className="text-2xl ml-2" />
        </button>
      </div>
      <div className="overflow-y-auto h-[130px]">
        <div className="grid grid-cols-8 gap-2 px-4 pt-4 text-[0.8rem] text-gray-500">
          <p className="pl-2 col-span-2">Teller</p>
          <p className="text-center col-span-2">Date</p>
          <p className="text-center">Time-In</p>
          <p className="text-center">Time-Out</p>
          <p className="text-center col-span-2">Branch</p>
        </div>
        <div className="overflow-y-auto">
          {" "}
          {/* Adjust max height as needed */}
          {tellersLog.length > 0 ? (
            tellersLog.map((teller, index) => (
              <div
                key={index}
                className={`grid grid-cols-8 gap-2 px-4 py-1 text-[0.7rem] ${
                  index === 0 ? "pt-4" : ""
                }`}
              >
                <p className="pl-2 col-span-2">{teller.teller_name}</p>
                <p className="text-center col-span-2">{teller.log_date}</p>
                <p className="font-semibold text-green-600 text-center">
                  {parseAndFormatTime(teller.login_time)}
                </p>
                <p className="font-semibold text-red-600 text-center">
                  {parseAndFormatTime(teller.logout_time)}
                </p>
                <div className="col-span-2 text-center">
                  <p>{teller.branch_name}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 pt-6 text-[0.8rem]">
              No logs available.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TellersLog;
