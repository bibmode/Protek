import React from "react";

const TellersLog = () => {
  const tellers = [
    {
      name: "Jane Doe",
      inTime: "10:30 AM",
      outTime: "5:30 PM",
      location: "Butuan City",
    },
    {
      name: "Jane Doe",
      inTime: "10:30 AM",
      outTime: "5:30 PM",
      location: "Butuan City",
    },
    {
      name: "Jane Doe",
      inTime: "10:30 AM",
      outTime: "5:30 PM",
      location: "Butuan City",
    },
    {
      name: "Jane Doe",
      inTime: "10:30 AM",
      outTime: "5:30 PM",
      location: "Butuan City",
    },
  ];

  return (
    <div>
      {tellers.map((teller, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 gap-2 px-4 py-1 text-[0.7rem] ${
            index === 0 ? "pt-4" : ""
          }`}
        >
          <p className="pl-2">{teller.name}</p>
          <p className="font-semibold text-green-600 text-center">
            IN {teller.inTime}
          </p>
          <p className="font-semibold text-red-600 text-center">
            OUT {teller.outTime}
          </p>
          <p className="text-center">{teller.location}</p>
        </div>
      ))}
    </div>
  );
};

export default TellersLog;
