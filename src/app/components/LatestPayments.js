import React from "react";
import { IoIosArrowForward } from "react-icons/io";

const LatestPayments = ({ latestPayments = [], error = null }) => {
  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading payments: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 pb-4 h-[630px]">
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
      <div className="overflow-y-auto">
        <div className="grid grid-cols-4 gap-2 p-4 text-[0.8rem] text-gray-500">
          <p className="pl-2">Name</p>
          <p className="text-center">Amount</p>
          <p className="text-center">Method</p>
          <p className="text-center">Branch</p>
        </div>

        {/* items */}
        {latestPayments.length > 0 ? (
          latestPayments.map((payment, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-2 px-4 pt-1 pb-[0.8rem] text-[0.7rem]"
            >
              <p className="pl-2">{payment.owner_name}</p>
              <p className="text-center">
                ₱{" "}
                {parseFloat(payment.total).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>

              <p className="text-center first-letter:uppercase">
                {payment.method}
              </p>
              <p className="text-center">{payment.branch_name}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4 text-[0.8rem]">
            No recent payments.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestPayments;
