import React, { useState, useEffect } from "react";

const VehiclesInCustody = ({
  totalVehiclesInCustody = [],
  selectedDateType,
}) => {
  const [activeIndex, setActiveIndex] = useState(
    totalVehiclesInCustody.length > 0 ? 5 : 0
  );

  // Validate totalVehiclesInCustody
  if (
    !Array.isArray(totalVehiclesInCustody) ||
    totalVehiclesInCustody.some(isNaN)
  ) {
    return null;
  }

  // Compute highestTotalVehicles
  const highestTotalVehiclesInCustody = Math.max(
    ...totalVehiclesInCustody.map(Number),
    1
  );

  // Calculate percentage change
  const calculatePercentageChange = () => {
    const previousPeriod = totalVehiclesInCustody[4] || 0;
    const currentPeriod = totalVehiclesInCustody[5] || 0;

    if (previousPeriod === 0 && currentPeriod === 0)
      return { percentage: 0, isPositive: true };
    if (previousPeriod === 0) return { percentage: 100, isPositive: true };
    if (currentPeriod === 0) return { percentage: -100, isPositive: false };

    const percentageChange =
      ((currentPeriod - previousPeriod) / previousPeriod) * 100;
    return {
      percentage: parseFloat(percentageChange.toFixed(2)),
      isPositive: percentageChange >= 0,
    };
  };

  const { percentage, isPositive } = calculatePercentageChange();

  // Determine display percentage
  const prev = totalVehiclesInCustody[4];
  const current = totalVehiclesInCustody[5];

  // Determine if the value has changed
  const hasChanged = prev !== current;

  const displayPercentage =
    percentage === 0
      ? !hasChanged
        ? "0%"
        : isPositive
        ? "+100%"
        : "-100%"
      : `${Math.abs(percentage)}%`;

  // Determine current vehicles
  const currentVehicles =
    typeof totalVehiclesInCustody[activeIndex] === "number"
      ? totalVehiclesInCustody[activeIndex]
      : 0;

  // Determine comparison text based on selectedDateType
  const getComparisonText = () => {
    switch (selectedDateType) {
      case "yearly":
        return "Compared to previous year";
      case "monthly":
        return "Compared to previous month";
      case "daily":
        return "Compared to previous day";
      case "weekly":
        return "Compared to previous week";
      default:
        return "Compared to previous month";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-[152px]">
      <p className="p-4 pb-0 text-[0.900rem] font-medium">
        Vehicles in Custody
      </p>
      <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
        <p className="text-2xl font-semibold">
          {Number(currentVehicles).toLocaleString()}
        </p>

        <div className="h-[49px] flex items-end ml-auto">
          {totalVehiclesInCustody.map((count, index) => {
            const barHeight =
              count === 0 ? 10 : (count / highestTotalVehiclesInCustody) * 49;

            return (
              <div
                key={index}
                className={`w-[15px] rounded ${
                  index === activeIndex ? "bg-blue-500" : "bg-gray-300"
                } hover:bg-blue-500 transition-all duration-200 ml-[6px]`}
                style={{ height: `${barHeight}px` }}
                onMouseEnter={() => {
                  setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  setActiveIndex(totalVehiclesInCustody.length > 0 ? 5 : 0);
                }}
                role="button"
                aria-label={`Period ${
                  index + 1
                }: ${count.toLocaleString()} vehicles`}
              >
                &nbsp;
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex p-3 items-center">
        <div
          className={`rounded-full h-[23px] px-3 mr-2 text-[0.60rem] flex font-medium items-center ${
            percentage === 0
              ? "bg-green-100 text-green-700"
              : isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {percentage === 0 ? "" : isPositive ? "+" : "-"}
          {displayPercentage}
        </div>
        <p className="text-[0.68rem] items-center">{getComparisonText()}</p>
      </div>
    </div>
  );
};

export default VehiclesInCustody;
