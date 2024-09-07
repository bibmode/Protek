"use client";

import { Supabase } from "/utils/supabase/client";
import { IoIosArrowForward } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import BranchButton from "./components/BranchButton";
import DateComponent from "./components/DateComponent";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import RentalCollections from "./components/RentalCollections";
import Receivables from "./components/Receivables";
import VehiclesInCustody from "./components/VehiclesInCustody";
import CheckOuts from "./components/CheckOuts";
import {
  eachYearOfInterval,
  eachMonthOfInterval,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  format,
  parse,
  eachWeekOfInterval,
  isValid,
} from "date-fns";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  );
  const [selectedDateType, setSelectedDateType] = useState("monthly");
  const [totalRentalCollections, setTotalRentalCollections] = useState(
    Array(6).fill(0)
  );
  const [totalReceivables, setTotalReceivables] = useState(Array(6).fill(0));
  const [totalVehicles, setTotalVehicles] = useState(Array(6).fill(0));
  const [totalCheckOuts, setTotalCheckOuts] = useState(Array(6).fill(0));

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleDateTypeChange = (dateType) => {
    setSelectedDateType(dateType);
  };

  const parseDate = (dateString) => {
    const parsed = parse(dateString, "yyyy-MM-dd", new Date());
    const isValidDate = isValid(parsed);
    return isValidDate ? parsed : null;
  };

  const fetchTotalRentalCollections = async () => {
    try {
      const currentDate = new Date(startDate);

      const getDateRange = () => {
        switch (selectedDateType || "monthly") {
          case "yearly":
            return eachYearOfInterval({
              start: new Date(currentDate.getFullYear() - 5, 0, 1),
              end: new Date(currentDate.getFullYear(), 11, 31),
            })
              .map((date) => format(date, "yyyy"))
              .slice(-6);

          case "monthly":
            return eachMonthOfInterval({
              start: startOfMonth(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 5,
                  1
                )
              ),
              end: endOfMonth(currentDate),
            })
              .map((date) => format(date, "yyyy-MM"))
              .slice(-6);

          case "daily":
            return eachDayOfInterval({
              start: startOfDay(
                new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000)
              ),
              end: endOfDay(currentDate),
            })
              .map((date) => format(date, "yyyy-MM-dd"))
              .slice(-6);

          case "weekly":
            return eachWeekOfInterval({
              start: startOfWeek(
                new Date(currentDate.getTime() - 6 * 7 * 24 * 60 * 60 * 1000),
                { weekStartsOn: 0 }
              ),
              end: endOfWeek(currentDate, { weekStartsOn: 0 }),
            })
              .map((date) => ({
                start: format(
                  startOfWeek(date, { weekStartsOn: 0 }),
                  "yyyy-MM-dd"
                ),
                end: format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
              }))
              .slice(-6);

          default:
            return eachMonthOfInterval({
              start: startOfMonth(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 5,
                  1
                )
              ),
              end: endOfMonth(currentDate),
            })
              .map((date) => format(date, "yyyy-MM"))
              .slice(-6);
        }
      };

      const dateRange = getDateRange();

      const { data, error } = await Supabase.rpc(
        "get_total_rental_collections_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        throw error;
      }

      if (!data) {
        console.warn("No data returned from Supabase.");
        setTotalRentalCollections(Array(dateRange.length).fill(0)); // Default to array of 0
        return;
      }

      const totalCollections = dateRange.map((range) => {
        const rangeData = data.filter((item) => {
          const itemDate = parseDate(item.payment_date);
          if (!itemDate) {
            console.warn(`Invalid date encountered: ${item.payment_date}`);
            return false; // Skip this item
          }

          const formattedItemDate = format(itemDate, "yyyy-MM-dd");

          if (selectedDateType === "weekly") {
            return (
              formattedItemDate >= range.start &&
              formattedItemDate <= range.end &&
              item.branch_name === selectedBranch
            );
          } else {
            let isMatchingDate = false;
            switch (selectedDateType) {
              case "daily":
                isMatchingDate =
                  formattedItemDate === range &&
                  item.branch_name === selectedBranch;
                break;
              case "yearly":
                isMatchingDate =
                  format(itemDate, "yyyy") === range &&
                  item.branch_name === selectedBranch;
                break;
              default: // monthly
                isMatchingDate =
                  format(itemDate, "yyyy-MM") === range &&
                  item.branch_name === selectedBranch;
                break;
            }
            return isMatchingDate;
          }
        });

        return rangeData.reduce(
          (acc, item) => acc + parseFloat(item.total_rental_collections || 0),
          0
        );
      });

      setTotalRentalCollections(totalCollections);
    } catch (error) {
      console.error(
        "Error fetching total rental collections:",
        error.message || error
      );
      setTotalRentalCollections(Array(6).fill(0)); // Default to array of 0 in case of error
    }
  };

  const fetchTotalReceivables = async () => {
    try {
      let dateRange;
      const currentDate = new Date(startDate);

      switch (selectedDateType || "monthly") {
        case "yearly":
          dateRange = eachYearOfInterval({
            start: new Date(currentDate.getFullYear() - 5, 0, 1),
            end: new Date(currentDate.getFullYear(), 11, 31),
          })
            .map((date) => format(date, "yyyy"))
            .slice(-6);
          break;

        case "monthly":
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;

        case "daily":
          dateRange = eachDayOfInterval({
            start: startOfDay(
              new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000)
            ),
            end: endOfDay(currentDate),
          })
            .map((date) => format(date, "yyyy-MM-dd"))
            .slice(-6);
          break;

        case "weekly":
          const weeks = eachWeekOfInterval({
            start: startOfWeek(
              new Date(currentDate.getTime() - 6 * 7 * 24 * 60 * 60 * 1000),
              { weekStartsOn: 0 }
            ),
            end: endOfWeek(currentDate, { weekStartsOn: 0 }), // Weeks end on Saturday
          }).map((date) => ({
            start: format(startOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
            end: format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
          }));
          dateRange = weeks.slice(-6);
          break;

        default:
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;
      }

      const { data, error } = await Supabase.rpc(
        "get_total_receivables_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        throw new Error("Unexpected data format");
      }

      const totalReceivables = dateRange.map((range) => {
        const rangeData = data.filter((item) => {
          const itemDate = parseDate(item.payment_date);
          if (!itemDate) {
            console.warn(`Invalid date encountered: ${item.payment_date}`);
            return false; // Skip this item
          }

          const formattedItemDate = format(itemDate, "yyyy-MM-dd");

          let isMatchingDate = false;
          switch (selectedDateType) {
            case "daily":
              isMatchingDate = formattedItemDate === range;
              break;
            case "monthly":
              isMatchingDate = format(itemDate, "yyyy-MM") === range;
              break;
            case "yearly":
              isMatchingDate = format(itemDate, "yyyy") === range;
              break;
            case "weekly":
              isMatchingDate =
                formattedItemDate >= range.start &&
                formattedItemDate <= range.end;
              break;
            default:
              isMatchingDate = format(itemDate, "yyyy-MM") === range;
              break;
          }

          return isMatchingDate && item.branch_name === selectedBranch;
        });

        return rangeData.reduce(
          (acc, item) => acc + parseFloat(item.total_receivables || 0),
          0
        );
      });

      setTotalReceivables(totalReceivables);
    } catch (error) {
      console.error(
        "Error fetching total receivables:",
        error.message || error
      );
      console.error("Current state:", {
        startDate,
        selectedDateType,
        selectedBranch,
      });
      setTotalReceivables(Array(6).fill(0)); // Default to array of 0 in case of error
    }
  };

  const fetchTotalVehicles = async () => {
    try {
      let dateRange = [];
      const currentDate = new Date(startDate);

      // Generate date ranges based on selectedDateType
      switch (selectedDateType || "monthly") {
        case "yearly":
          dateRange = eachYearOfInterval({
            start: new Date(currentDate.getFullYear() - 5, 0, 1),
            end: new Date(currentDate.getFullYear(), 11, 31),
          })
            .map((date) => format(date, "yyyy"))
            .slice(-6);
          break;

        case "monthly":
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;

        case "daily":
          dateRange = eachDayOfInterval({
            start: startOfDay(
              new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000)
            ),
            end: endOfDay(currentDate),
          })
            .map((date) => format(date, "yyyy-MM-dd"))
            .slice(-6);
          break;

        case "weekly":
          const weeks = eachWeekOfInterval({
            start: startOfWeek(
              new Date(currentDate.getTime() - 6 * 7 * 24 * 60 * 60 * 1000),
              { weekStartsOn: 0 }
            ),
            end: endOfWeek(currentDate, { weekStartsOn: 0 }),
          }).map((date) => ({
            start: format(startOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
            end: format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
          }));
          dateRange = weeks.slice(-6);
          break;

        default:
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;
      }

      // Fetch data from Supabase
      const { data, error } = await Supabase.rpc(
        "get_total_vehicles_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        throw new Error("Unexpected data format");
      }

      // Initialize totalVehicles array
      const totalVehicles = dateRange.map(() => 0);

      // Process total vehicles
      data.forEach((item) => {
        const itemCheckinDate = parseDate(item.checkin_date);
        const itemCheckoutDate = item.checkout_date
          ? parseDate(item.checkout_date)
          : new Date(); // Use current date if checkout_date is null

        if (!itemCheckinDate) {
          console.warn(
            `Invalid check-in date encountered: ${item.checkin_date}`
          );
          return; // Skip this item
        }

        const formattedItemCheckinDate = format(itemCheckinDate, "yyyy-MM-dd");
        const formattedItemCheckoutDate = format(
          itemCheckoutDate,
          "yyyy-MM-dd"
        );

        dateRange.forEach((range, index) => {
          let isInRange = false;
          switch (selectedDateType) {
            case "daily":
              isInRange =
                formattedItemCheckinDate <= range &&
                formattedItemCheckoutDate >= range;
              break;
            case "monthly":
              const rangeMonth = range.split("-");
              isInRange =
                formattedItemCheckinDate <= range + "-01" &&
                formattedItemCheckoutDate >= range + "-01";
              break;
            case "yearly":
              isInRange =
                formattedItemCheckinDate.slice(0, 4) === range &&
                formattedItemCheckoutDate.slice(0, 4) === range;
              break;
            case "weekly":
              isInRange =
                formattedItemCheckinDate <= range.end &&
                formattedItemCheckoutDate >= range.start;
              break;
          }

          if (isInRange && item.branch_name === selectedBranch) {
            totalVehicles[index] += parseFloat(item.total_vehicles) || 0;
          }
        });
      });

      setTotalVehicles(totalVehicles);
    } catch (error) {
      console.error("Error fetching total vehicles:", error.message || error);
      console.error("Current state:", {
        startDate,
        selectedDateType,
        selectedBranch,
      });
      setTotalVehicles(Array(6).fill(0)); // Default to array of 0 in case of error
    }
  };

  const fetchTotalCheckOuts = async () => {
    try {
      let dateRange;
      const currentDate = new Date(startDate);

      switch (selectedDateType || "monthly") {
        case "yearly":
          dateRange = eachYearOfInterval({
            start: new Date(currentDate.getFullYear() - 5, 0, 1),
            end: new Date(currentDate.getFullYear(), 11, 31),
          })
            .map((date) => format(date, "yyyy"))
            .slice(-6);
          break;

        case "monthly":
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;

        case "daily":
          dateRange = eachDayOfInterval({
            start: startOfDay(
              new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000)
            ),
            end: endOfDay(currentDate),
          })
            .map((date) => format(date, "yyyy-MM-dd"))
            .slice(-6);
          break;

        case "weekly":
          const weeks = eachWeekOfInterval({
            start: startOfWeek(
              new Date(currentDate.getTime() - 6 * 7 * 24 * 60 * 60 * 1000),
              { weekStartsOn: 0 }
            ),
            end: endOfWeek(currentDate, { weekStartsOn: 0 }),
          }).map((date) => ({
            start: format(startOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
            end: format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
          }));
          dateRange = weeks.slice(-6);
          break;

        default:
          dateRange = eachMonthOfInterval({
            start: startOfMonth(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
            ),
            end: endOfMonth(currentDate),
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;
      }

      const { data, error } = await Supabase.rpc(
        "get_total_check_outs_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        throw new Error("Unexpected data format");
      }

      const totalCheckOuts = dateRange.map((range) => {
        const rangeData = data.filter((item) => {
          if (!item.checkout_date) {
            return false; // Skip items with null or undefined checkout_date
          }

          const itemDate = parseDate(item.checkout_date);
          if (!itemDate) {
            console.warn(`Invalid date encountered: ${item.checkout_date}`);
            return false; // Skip this item
          }

          const formattedItemDate = format(itemDate, "yyyy-MM-dd");
          if (!formattedItemDate) {
            console.warn(`Date formatting failed for: ${item.checkout_date}`);
            return false;
          }

          let isMatchingDate = false;
          switch (selectedDateType) {
            case "daily":
              isMatchingDate = formattedItemDate === range;
              break;
            case "monthly":
              isMatchingDate = format(itemDate, "yyyy-MM") === range;
              break;
            case "yearly":
              isMatchingDate = format(itemDate, "yyyy") === range;
              break;
            case "weekly":
              isMatchingDate =
                formattedItemDate >= range.start &&
                formattedItemDate <= range.end;
              break;
            default:
              isMatchingDate = format(itemDate, "yyyy-MM") === range;
              break;
          }

          return isMatchingDate && item.branch_name === selectedBranch;
        });

        return rangeData.reduce(
          (acc, item) => acc + parseFloat(item.total_check_outs || 0),
          0
        );
      });

      setTotalCheckOuts(totalCheckOuts);
    } catch (error) {
      console.error("Error fetching total check outs:", error.message || error);
      console.error("Current state:", {
        startDate,
        selectedDateType,
        selectedBranch,
      });
      setTotalCheckOuts(Array(6).fill(0)); // Default to array of 0 in case of error
    }
  };

  useEffect(() => {
    // Function to perform the initial and periodic fetching
    const fetchData = () => {
      fetchTotalRentalCollections();
      fetchTotalReceivables();
      fetchTotalVehicles();
      fetchTotalCheckOuts();
    };

    // Perform initial fetch
    fetchData();

    // Set up interval for periodic fetching
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [startDate, selectedDateType, selectedBranch]);

  return (
    <main className="bg-stone-50 w-full max-w-screen min-w-screen flex flex-col items-center">
      <Navbar />
      <div className="max-w-[1440px] w-full px-9 flex flex-col flex-1 pb-10">
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Dashboard</p>
            <p>All branches overview</p>
          </div>

          <BranchButton
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
          <button className="ml-3 h-[46px] w-[100px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center">
            <IoFilterSharp />
            <p className="text-sm ml-2">Filter</p>
          </button>
          <DateComponent
            onDateChange={handleDateChange}
            onDateTypeChange={handleDateTypeChange}
          />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <RentalCollections
            totalRentalCollections={totalRentalCollections}
            selectedDateType={selectedDateType}
          />

          <Receivables
            totalReceivables={totalReceivables}
            selectedDateType={selectedDateType}
          />

          <VehiclesInCustody
            totalVehicles={totalVehicles}
            selectedDateType={selectedDateType}
          />

          <CheckOuts
            totalCheckOuts={totalCheckOuts}
            selectedDateType={selectedDateType}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5 flex-1">
          {/* latest payments */}
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

          <div className="grid gap-5 grid-rows-5">
            {/* vehicles in custody */}
            <div className="bg-white rounded-2xl border row-span-3 border-gray-200 pb-4">
              <div className="p-4 flex justify-between border-b border-gray-200">
                <div className="pl-3">
                  <p className="text-[0.900rem] font-medium">
                    Vehicles in Custody
                  </p>
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
              <div className="grid grid-cols-4 gap-2 px-4 pt-1 pb-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Sedan</p>
                <p className="text-center">100</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">SUV</p>
                <p className="text-center">30</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Truck</p>
                <p className="text-center">15</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Motorcycle</p>
                <p className="text-center">58</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Van</p>
                <p className="text-center">7</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Sports car</p>
                <p className="text-center">2</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-[0.8rem] text-[0.7rem]">
                <p className="pl-3">Off-the-road</p>
                <p className="text-center">10</p>
                <p className="text-center">₱ 519,300.00</p>
                <p className="text-center">₱ 51,800.00</p>
              </div>
            </div>

            {/* logs */}
            <div className="bg-white rounded-2xl border row-span-2 border-gray-200 pb-4">
              <div className="p-4 flex justify-between border-b border-gray-200">
                <div className="py-1 pl-2">
                  <p className="font-medium">Logs</p>
                  <p className="text-[0.68rem] text-gray-600">
                    See latest log ins from branch tellers
                  </p>
                </div>
                <button className="flex items-center text-blue-500 hover:text-blue-300 pr-1">
                  <p className="text-xs font-semibold">More details</p>
                  <IoIosArrowForward className="text-2xl ml-2" />
                </button>
              </div>

              {/* logs */}
              <div className="grid grid-cols-4 gap-2 px-4 py-1 pt-4 text-[0.7rem]">
                <p className="pl-2">Jane Doe</p>
                <p className="font-semibold text-green-600 text-center">
                  IN 10:30 AM
                </p>
                <p className="font-semibold text-red-600 text-center">
                  OUT 5:30 PM
                </p>
                <p className="text-center">Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-1 text-[0.7rem]">
                <p className="pl-2">Jane Doe</p>
                <p className="font-semibold text-green-600 text-center">
                  IN 10:30 AM
                </p>
                <p className="font-semibold text-red-600 text-center">
                  OUT 5:30 PM
                </p>
                <p className="text-center">Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-1 text-[0.7rem]">
                <p className="pl-2">Jane Doe</p>
                <p className="font-semibold text-green-600 text-center">
                  IN 10:30 AM
                </p>
                <p className="font-semibold text-red-600 text-center">
                  OUT 5:30 PM
                </p>
                <p className="text-center">Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-1 text-[0.7rem]">
                <p className="pl-2">Jane Doe</p>
                <p className="font-semibold text-green-600 text-center">
                  IN 10:30 AM
                </p>
                <p className="font-semibold text-red-600 text-center">
                  OUT 5:30 PM
                </p>
                <p className="text-center">Butuan City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
