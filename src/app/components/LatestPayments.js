import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const LatestPayments = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 pb-4 h-full">
      <div className="p-4 flex justify-between border-b border-gray-200">
        <div className="pl-2">
          <p className="text-[0.900rem] font-medium">Latest Payments</p>
          <p className="text-[0.68rem] text-gray-600">
            See latest payment transactions
          </p>
        </div>
        <button className="flex items-center text-blue-500 hover:text-blue-300 pr-1">
          <p className="text-xs font-semibold">More details</p>
          <IoIosArrowForward className="text-xl ml-2" />
        </button>
      </div>

      {/* labels */}
      <div className="grid grid-cols-4 gap-2 p-4 text-[0.8rem] text-gray-500">
        <p className="pl-2">Name</p>
        <p className="text-center">Amount</p>
        <p className="text-center">Method</p>
        <p className="text-center">Branch</p>
      </div>

      {/* items */}
      <div className="grid grid-cols-4 gap-2 px-4 pt-1 pb-[0.8rem] text-[0.7rem]">
        <p className="pl-2">Jane Doe</p>
        <p className="text-center">₱ 5,000.00</p>
        <p className="text-center">GCash</p>
        <p className="text-center">Butuan City</p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
        <p className="pl-2">Jane Doe</p>
        <p className="text-center">₱ 5,000.00</p>
        <p className="text-center">GCash</p>
        <p className="text-center">Butuan City</p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
        <p className="pl-2">Jane Doe</p>
        <p className="text-center">₱ 5,000.00</p>
        <p className="text-center">GCash</p>
        <p className="text-center">Butuan City</p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
        <p className="pl-2">Jane Doe</p>
        <p className="text-center">₱ 5,000.00</p>
        <p className="text-center">GCash</p>
        <p className="text-center">Butuan City</p>
      </div>
      <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
        <p className="pl-2">Jane Doe</p>
        <p className="text-center">₱ 5,000.00</p>
        <p className="text-center">GCash</p>
        <p className="text-center">Butuan City</p>
      </div>
    </div>
  );
};

export default LatestPayments;
