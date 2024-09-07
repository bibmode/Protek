import React, { useState } from "react";

const Receivables = ({ totalReceivables = [], selectedDateType }) => {
  const [activeIndex, setActiveIndex] = useState(
    totalReceivables.length > 0 ? 5 : 0
  );

  if (!Array.isArray(totalReceivables) || totalReceivables.some(isNaN)) {
    console.error("Invalid totalReceivables: expected an array of numbers");
    return null;
  }

  const highestTotalReceivables = Math.max(...totalReceivables.map(Number), 1); // Default to 1 to avoid division by zero

  const calculatePercentageChange = () => {
    const previousPeriod = totalReceivables[4] || 0;
    const currentPeriod = totalReceivables[5] || 0;

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
  const displayPercentage =
    percentage === 0
      ? totalReceivables[5] === 0
        ? "0%"
        : isPositive
        ? "+100%"
        : "-100%"
      : `${Math.abs(percentage)}%`;

  const currentReceivables =
    typeof totalReceivables[activeIndex] === "number"
      ? totalReceivables[activeIndex]
      : 0;

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
      <p className="p-4 pb-0 text-[0.900rem] font-medium">Receivables</p>
      <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
        <p className="text-2xl font-semibold">
          {(() => {
            const [integerPart, decimalPart] = Number(currentReceivables)
              .toFixed(2)
              .split(".");
            return (
              <>
                ₱ {Number(integerPart).toLocaleString()}
                <span className="text-lg">.{decimalPart}</span>
              </>
            );
          })()}
        </p>

        <div className="h-[49px] flex items-end ml-auto">
          {totalReceivables.map((fee, index) => {
            const barHeight =
              fee === 0 ? 10 : (fee / highestTotalReceivables) * 49;

            return (
              <div
                key={index}
                className={`w-[15px] rounded ${
                  index === activeIndex ? "bg-red-500" : "bg-gray-300"
                } hover:bg-red-500 transition-all duration-200 ml-[6px]`}
                style={{ height: `${barHeight}px` }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() =>
                  setActiveIndex(totalReceivables.length > 0 ? 5 : 0)
                }
                role="button"
                aria-label={`Period ${index + 1}: ₱ ${fee.toLocaleString()}`}
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

export default Receivables;
