import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const VehiclesList = () => {
  const vehicles = [
    {
      type: "Sedan",
      quantity: 100,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "SUV",
      quantity: 30,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "Truck",
      quantity: 15,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "Motorcycle",
      quantity: 58,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "Van",
      quantity: 7,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "Sports car",
      quantity: 2,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
    {
      type: "Off-the-road",
      quantity: 10,
      fees: "₱ 519,300.00",
      receivables: "₱ 51,800.00",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border row-span-3 border-gray-200 pb-4">
      <div className="p-4 flex justify-between border-b border-gray-200">
        <div className="pl-3">
          <p className="text-[0.900rem] font-medium">Vehicles in Custody</p>
          <p className="text-[0.68rem] text-gray-600">
            See the vehicles for every branch
          </p>
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-300 pr-1">
          <p className="text-xs font-semibold">More details</p>
          <IoIosArrowForward className="text-2xl ml-2" />
        </button>
      </div>

      {/* labels */}
      <div className="grid grid-cols-4 gap-2 p-4 text-[0.8rem] text-gray-500">
        <p className="pl-3">Type</p>
        <p className="text-center">Quantity</p>
        <p className="text-center">Collected Fees</p>
        <p className="text-center">Receivables</p>
      </div>

      {/* items */}
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className={`grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem] ${
            index % 2 === 0 ? "pt-1" : ""
          }`}
        >
          <p className="pl-3">{vehicle.type}</p>
          <p className="text-center">{vehicle.quantity}</p>
          <p className="text-center">{vehicle.fees}</p>
          <p className="text-center">{vehicle.receivables}</p>
        </div>
      ))}
    </div>
  );
};

export default VehiclesList;
