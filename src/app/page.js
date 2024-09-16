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
  parse,
  subDays,
  isValid,
  addYears,
  eachDayOfInterval,
  startOfDay,
  endOfDay,
  eachMonthOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  subMonths,
  subWeeks,
  startOfYear,
  endOfYear,
  isSameYear,
  isWithinInterval,
} from "date-fns";
import LatestPayments from "./components/LatestPayments";
import VehiclesList from "./components/VehiclesList";
import TellersLog from "./components/TellersLog";

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
  const [totalVehiclesInCustody, setTotalVehiclesInCustody] = useState(
    Array(6).fill(0)
  );
  const [totalCheckOuts, setTotalCheckOuts] = useState(Array(6).fill(0));
  const [latestPayments, setLatestPayments] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [tellersLog, setTellersLog] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchTotalVehiclesInCustody = async () => {
    try {
      let dateRange = [];
      const currentDate = new Date(startDate);

      // Generate date ranges based on selectedDateType
      switch (selectedDateType || "monthly") {
        case "yearly":
          dateRange = eachYearOfInterval({
            start: new Date(currentDate.getFullYear() - 5, 0, 1),
            end: currentDate,
          })
            .map((date) => format(date, "yyyy"))
            .slice(-6);
          break;

        case "monthly":
          dateRange = eachMonthOfInterval({
            start: startOfMonth(subMonths(currentDate, 5)),
            end: currentDate,
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;

        case "daily":
          dateRange = eachDayOfInterval({
            start: subDays(currentDate, 5),
            end: currentDate,
          })
            .map((date) => format(date, "yyyy-MM-dd"))
            .slice(-6);
          break;

        case "weekly":
          dateRange = eachWeekOfInterval({
            start: startOfWeek(subWeeks(currentDate, 5), { weekStartsOn: 0 }),
            end: currentDate,
          })
            .map((date) => ({
              start: format(
                startOfWeek(date, { weekStartsOn: 0 }),
                "yyyy-MM-dd"
              ),
              end: format(endOfWeek(date, { weekStartsOn: 0 }), "yyyy-MM-dd"),
            }))
            .slice(-6);
          break;

        default:
          dateRange = eachMonthOfInterval({
            start: startOfMonth(subMonths(currentDate, 5)),
            end: currentDate,
          })
            .map((date) => format(date, "yyyy-MM"))
            .slice(-6);
          break;
      }

      // Fetch data from Supabase
      const { data, error } = await Supabase.rpc(
        "get_vehicle_data_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        throw error;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        throw new Error("Unexpected data format");
      }

      // Initialize totalVehiclesInCustody array
      const totalVehiclesInCustody = Array(dateRange.length).fill(0);

      // Process total vehicles
      data.forEach((item) => {
        if (item.branch_name !== selectedBranch) return;

        const itemCheckinDate = parseISO(item.checkin_date);
        const itemCheckoutDate = item.checkout_date
          ? parseISO(item.checkout_date)
          : addYears(currentDate, 1);

        dateRange.forEach((range, index) => {
          let isInCustody = false;

          switch (selectedDateType) {
            case "daily":
              const rangeDate = parseISO(range);
              isInCustody =
                (isSameDay(itemCheckinDate, rangeDate) ||
                  isBefore(itemCheckinDate, rangeDate)) &&
                isAfter(itemCheckoutDate, rangeDate);
              break;

            case "weekly":
              const startOfWeekRange = parseISO(range.start);
              const endOfWeekRange = parseISO(range.end);
              isInCustody =
                (isSameDay(itemCheckinDate, startOfWeekRange) ||
                  isBefore(itemCheckinDate, endOfWeekRange)) &&
                isAfter(itemCheckoutDate, endOfWeekRange);
              break;

            case "monthly":
              const rangeMonth = parseISO(range + "-01");
              isInCustody =
                (isBefore(itemCheckinDate, endOfMonth(rangeMonth)) ||
                  isSameMonth(itemCheckinDate, rangeMonth)) &&
                isAfter(itemCheckoutDate, endOfMonth(rangeMonth));
              break;

            case "yearly":
              const rangeYear = parseInt(range);
              isInCustody =
                itemCheckinDate.getFullYear() <= rangeYear &&
                itemCheckoutDate.getFullYear() !== rangeYear;
              break;
          }

          if (isInCustody) {
            totalVehiclesInCustody[index]++;
          }
        });
      });

      setTotalVehiclesInCustody(totalVehiclesInCustody);
    } catch (error) {
      console.error("Error fetching total vehicles:", error.message || error);
      setTotalVehiclesInCustody(Array(6).fill(0)); // Default to array of 0 in case of error
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
            return false;
          }

          const itemDate = parseDate(item.checkout_date);
          if (!itemDate) {
            console.warn(`Invalid date encountered: ${item.checkout_date}`);
            return false;
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

  const fetchLatestPayments = async () => {
    try {
      const dateType = selectedDateType || "monthly";

      // Use the provided startDate or default to current date
      const currentDate = startDate ? new Date(startDate) : new Date();

      // Calculate the start of the period based on dateType
      let periodStart;
      switch (dateType) {
        case "yearly":
          periodStart = startOfYear(currentDate);
          break;
        case "monthly":
          periodStart = startOfMonth(currentDate);
          break;
        case "weekly":
          periodStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Assuming weeks start on Sunday
          break;
        case "daily":
          periodStart = startOfDay(currentDate);
          break;
        default:
          periodStart = startOfMonth(currentDate);
      }

      const { data, error } = await Supabase.rpc(
        "get_latest_payments_for_dashboard"
      );

      if (error) throw error;

      // Client-side filtering
      const filteredData = data.filter((item) => {
        if (!item.verified_date) return false;

        const itemDate = new Date(item.verified_date);

        let isInPeriod;
        switch (dateType) {
          case "yearly":
            isInPeriod = isSameYear(itemDate, currentDate);
            break;
          case "monthly":
            isInPeriod = isSameMonth(itemDate, currentDate);
            break;
          case "weekly":
            isInPeriod = isWithinInterval(itemDate, {
              start: periodStart,
              end: endOfWeek(currentDate, { weekStartsOn: 0 }),
            });
            break;
          case "daily":
            isInPeriod = isSameDay(itemDate, currentDate);
            break;
          default:
            isInPeriod = isSameMonth(itemDate, currentDate);
        }

        return (
          (!selectedBranch || item.branch_name === selectedBranch) && isInPeriod
        );
      });

      // Sort and format as before
      const sortedPayments = filteredData.sort(
        (a, b) => new Date(b.verified_date) - new Date(a.verified_date)
      );

      const formattedPayments = sortedPayments.map((payment) => ({
        branch_name: payment.branch_name,
        verified_date: format(
          parseISO(payment.verified_date),
          "MMMM d, yyyy @ hh:mm a"
        ),
        total: payment.total,
        owner_name: payment.owner_name,
        method: payment.method,
      }));

      setLatestPayments(formattedPayments);
    } catch (error) {
      console.error("Error fetching recent payments:", error);
      setLatestPayments([]);
    }
  };

  const fetchTellersLog = async () => {
    try {
      const dateType = selectedDateType || "monthly";

      const currentDate = startDate ? new Date(startDate) : new Date();

      // Calculate the start and end of the period based on dateType
      let periodStart, periodEnd;
      switch (dateType) {
        case "yearly":
          periodStart = startOfYear(currentDate);
          periodEnd = endOfYear(currentDate);
          break;
        case "monthly":
          periodStart = startOfMonth(currentDate);
          periodEnd = endOfMonth(currentDate);
          break;
        case "weekly":
          periodStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Assuming weeks start on Sunday
          periodEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
          break;
        case "daily":
          periodStart = startOfDay(currentDate);
          periodEnd = endOfDay(currentDate);
          break;
        default:
          periodStart = startOfMonth(currentDate);
          periodEnd = endOfMonth(currentDate);
      }

      const { data, error } = await Supabase.rpc(
        "get_tellers_log_for_dashboard"
      );

      if (error) throw error;

      // Client-side filtering
      const filteredData = data.filter((item) => {
        if (!item.log_date) return false;

        const itemDate = new Date(item.log_date);

        const isInPeriod = isWithinInterval(itemDate, {
          start: periodStart,
          end: periodEnd,
        });

        return (
          (!selectedBranch || item.branch_name === selectedBranch) && isInPeriod
        );
      });

      // Sort and format as before
      const sortedTellersLogs = filteredData.sort(
        (a, b) => new Date(b.log_date) - new Date(a.log_date)
      );

      const formattedTellersLogs = sortedTellersLogs.map((log) => ({
        teller_name: log.teller_name,
        log_date: format(parseISO(log.log_date), "MMMM d, yyyy"),
        login_time: log.login_time,
        logout_time: log.logout_time,
        branch_name: log.branch_name,
      }));

      setTellersLog(formattedTellersLogs);
    } catch (error) {
      console.error("Error fetching tellers log:", error);
      setTellersLog([]);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchTellersLog();
      fetchLatestPayments();
      fetchTotalRentalCollections();
      fetchTotalReceivables();
      fetchTotalVehiclesInCustody();
      fetchTotalCheckOuts();
    };

    // Perform initial fetch
    fetchData();

    // Set up interval for periodic fetching
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); // 5000 ms = 5 seconds

    setLoading(false);
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [startDate, selectedDateType, selectedBranch]);

  if (loading) {
    return (
      <div className="flex gap-2 w-screen h-screen m-auto justify-center items-center bg-amber-400/70">
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
      </div>
    );
  }

  return (
    <main className="bg-stone-50 w-full max-w-screen min-w-screen items-center">
      <Navbar />
      <div className="max-w-[1440px] w-full px-9 grid pb-10  mx-auto">
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Dashboard</p>
            <p>All branches overview</p>
          </div>

          <BranchButton
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
          />
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
            totalVehiclesInCustody={totalVehiclesInCustody}
            selectedDateType={selectedDateType}
          />

          <CheckOuts
            totalCheckOuts={totalCheckOuts}
            selectedDateType={selectedDateType}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* latest payments */}
          <LatestPayments latestPayments={latestPayments} />

          <div className="grid gap-5">
            {/* vehicles in custody */}
            <VehiclesList />

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
              <TellersLog tellersLog={tellersLog} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
