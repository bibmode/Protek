import React from "react";
import { format, parse } from "date-fns";

const TellersLog = ({ tellersLog }) => {
  // Function to safely parse and format time
  const parseAndFormatTime = (time) => {
    if (!time) return "N/A";
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
    <div>
      <div>
        <div className="grid grid-cols-8 gap-2 px-4 pt-4 text-[0.8rem] text-gray-500">
          <p className="pl-2 col-span-2">Teller</p>
          <p className="text-center col-span-2">Date</p>
          <p className="text-center">Time-In</p>
          <p className="text-center">Time-Out</p>
          <p className="text-center col-span-2">Branch</p>
        </div>
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
  );
};

export default TellersLog;
