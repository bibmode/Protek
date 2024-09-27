"use client";

import { Supabase } from "/utils/supabase/client";
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
import AllPaymentsDrawer from "./components/AllPaymentsDrawer";
import AllTellersLog from "./components/AllTellersLog";

export default function Home() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  );
  const [selectedDateType, setSelectedDateType] = useState("daily");
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
  const [paymentsDrawer, setPaymentsDrawer] = useState([]);
  const [isPaymentsDrawerOpen, setIsPaymentsDrawerOpen] = useState(false);
  const [allTellersLog, setAllTellersLog] = useState([]);
  const [isTellersLogDrawerOpen, setIsTellersLogDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const togglePaymentsDrawer = () => {
    setIsPaymentsDrawerOpen(!isPaymentsDrawerOpen);
  };

  const toggleTellersLogDrawer = () => {
    setIsTellersLogDrawerOpen(!isTellersLogDrawerOpen);
  };

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
        switch (selectedDateType || "daily") {
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
      const dateType = selectedDateType || "daily";

      // Robust date parsing
      let currentDate;
      if (startDate instanceof Date) {
        currentDate = startDate;
      } else if (typeof startDate === "string") {
        currentDate = parseISO(startDate);
        if (isNaN(currentDate.getTime())) {
          if (/^\d{4}$/.test(startDate)) {
            currentDate = new Date(parseInt(startDate), 0, 1);
          } else if (/^\d{4}-\d{2}$/.test(startDate)) {
            const [year, month] = startDate.split("-");
            currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
          } else {
            console.warn("Invalid date format. Using current date.");
            currentDate = new Date();
          }
        }
      } else {
        console.warn("Invalid startDate. Using current date.");
        currentDate = new Date();
      }

      // Define date range
      let dateRange;
      switch (dateType) {
        case "yearly":
          dateRange = eachYearOfInterval({
            start: new Date(currentDate.getFullYear() - 5, 0, 1),
            end: currentDate,
          }).slice(-6);
          break;
        case "monthly":
          dateRange = eachMonthOfInterval({
            start: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() - 5,
              1
            ),
            end: currentDate,
          }).slice(-6);
          break;
        case "weekly":
          dateRange = eachWeekOfInterval(
            {
              start: new Date(
                currentDate.getTime() - 5 * 7 * 24 * 60 * 60 * 1000
              ),
              end: currentDate,
            },
            { weekStartsOn: 0 }
          ).slice(-6);
          break;
        case "daily":
          dateRange = eachDayOfInterval({
            start: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000),
            end: currentDate,
          }).slice(-6);
          break;
        default:
          throw new Error("Invalid date type");
      }

      // Fetch data from Supabase
      const { data, error } = await Supabase.rpc(
        "get_vehicle_list_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        return;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return;
      }

      // Calculate receivables for each period
      const result = dateRange.map((periodDate) => {
        let periodStart, periodEnd;
        switch (dateType) {
          case "yearly":
            periodStart = startOfYear(periodDate);
            periodEnd = endOfYear(periodDate);
            break;
          case "monthly":
            periodStart = startOfMonth(periodDate);
            periodEnd = endOfMonth(periodDate);
            break;
          case "weekly":
            periodStart = startOfWeek(periodDate, { weekStartsOn: 0 });
            periodEnd = endOfWeek(periodDate, { weekStartsOn: 0 });
            break;
          case "daily":
            periodStart = startOfDay(periodDate);
            periodEnd = endOfDay(periodDate);
            break;
        }

        // Ensure periodEnd does not go beyond today's date
        if (isAfter(periodEnd, currentDate)) {
          periodEnd = currentDate;
        }

        const periodReceivables = data.reduce((total, item) => {
          const checkinDate = parseISO(item.checkin_date);
          const checkoutDate = item.checkout_date
            ? parseISO(item.checkout_date)
            : addYears(currentDate, 1);

          // Check if the period overlaps with the vehicle's rental period
          if (
            isAfter(periodStart, checkoutDate) ||
            isBefore(periodEnd, checkinDate)
          ) {
            return total;
          }

          if (selectedBranch && item.branch_name !== selectedBranch) {
            return total;
          }

          const daysInPeriod = Math.min(
            Math.ceil((periodEnd - checkinDate) / (1000 * 60 * 60 * 24)),
            Math.ceil((checkoutDate - periodStart) / (1000 * 60 * 60 * 24))
          );

          const totalCharge = daysInPeriod * parseFloat(item.daily_rate);
          const fees = totalCharge * 0.41;
          const overall = totalCharge + fees;

          // Only subtract paid amount if startDate is within the vehicle's rental period
          let paidAmount = 0;
          if (
            isWithinInterval(startDate, {
              start: checkinDate,
              end: checkoutDate,
            })
          ) {
            paidAmount = parseFloat(item.paid) || 0;
          }

          return total + (overall - paidAmount);
        }, 0);

        return parseFloat(periodReceivables.toFixed(2));
      });

      // Ensure we always have exactly 6 values
      const finalResult = result.slice(-6);
      while (finalResult.length < 6) {
        finalResult.unshift(0);
      }

      setTotalReceivables(finalResult);
    } catch (error) {
      console.error("Error in fetchTotalReceivables:", error.message || error);
      setTotalReceivables(Array(6).fill(0)); // Reset to initial state on error
    }
  };

  const fetchTotalVehiclesInCustody = async () => {
    try {
      let dateRange = [];
      const currentDate = new Date(startDate);

      // Generate date ranges based on selectedDateType
      switch (selectedDateType || "daily") {
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

      switch (selectedDateType || "daily") {
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
      const dateType = selectedDateType || "daily";

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
          periodStart = startOfWeek(currentDate, { weekStartsOn: 0 });
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
      const dateType = selectedDateType || "daily";

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

  const fetchVehiclesList = async () => {
    try {
      const dateType = selectedDateType || "daily";

      // Robust date parsing
      let currentDate;
      if (startDate instanceof Date) {
        currentDate = startDate;
      } else if (typeof startDate === "string") {
        // Try parsing as ISO date first
        currentDate = parseISO(startDate);

        // If parsing fails (invalid date), try alternative formats
        if (isNaN(currentDate.getTime())) {
          // For YYYY format
          if (/^\d{4}$/.test(startDate)) {
            currentDate = new Date(parseInt(startDate), 0, 1);
          }
          // For YYYY-MM format
          else if (/^\d{4}-\d{2}$/.test(startDate)) {
            const [year, month] = startDate.split("-");
            currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
          }
          // If all parsing attempts fail, use current date
          else {
            console.warn("Invalid date format. Using current date.");
            currentDate = new Date();
          }
        }
      } else {
        console.warn("Invalid startDate. Using current date.");
        currentDate = new Date();
      }

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
          periodStart = startOfWeek(currentDate, { weekStartsOn: 0 });
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

      // Fetch data from Supabase
      const { data, error } = await Supabase.rpc(
        "get_vehicle_list_for_dashboard"
      );

      if (error) {
        console.error("Error fetching data:", error.message || error);
        return;
      }

      if (!data || !Array.isArray(data)) {
        console.error("Unexpected data format:", data);
        return;
      }

      // Client-side filtering
      const filteredData = data.filter((item) => {
        const checkinDate = parseISO(item.checkin_date);
        const checkoutDate = item.checkout_date
          ? parseISO(item.checkout_date)
          : addYears(currentDate, 1); // Add 1 year for null checkout dates

        // Check if startDate is beyond checkoutDate
        if (isAfter(currentDate, checkoutDate)) {
          return false;
        }

        let isInCustody;
        switch (dateType) {
          case "yearly":
            isInCustody =
              checkinDate.getFullYear() <= currentDate.getFullYear() &&
              checkoutDate.getFullYear() > currentDate.getFullYear();
            break;
          case "monthly":
            isInCustody =
              isBefore(checkinDate, endOfMonth(currentDate)) &&
              isAfter(checkoutDate, endOfMonth(currentDate));
            break;
          case "weekly":
            isInCustody =
              isBefore(
                checkinDate,
                endOfWeek(currentDate, { weekStartsOn: 0 })
              ) &&
              isAfter(
                checkoutDate,
                endOfWeek(currentDate, { weekStartsOn: 0 })
              );
            break;
          case "daily":
            isInCustody =
              isBefore(checkinDate, endOfDay(currentDate)) &&
              isAfter(checkoutDate, endOfDay(currentDate));
            break;
          default:
            isInCustody =
              isBefore(checkinDate, endOfMonth(currentDate)) &&
              isAfter(checkoutDate, endOfMonth(currentDate));
        }

        return (
          (!selectedBranch || item.branch_name === selectedBranch) &&
          isInCustody
        );
      });

      // Process and group data
      const groupedData = filteredData.reduce((acc, item) => {
        if (!acc[item.type]) {
          acc[item.type] = {
            type: item.type,
            quantity: 0,
            collectedFees: 0,
            receivables: 0,
          };
        }

        // Increment quantity
        acc[item.type].quantity += 1;

        // Add to collectedFees
        acc[item.type].collectedFees += parseFloat(item.paid) || 0;

        // Calculate receivables
        const checkinDate = parseISO(item.checkin_date);
        const checkoutDate = item.checkout_date
          ? parseISO(item.checkout_date)
          : endOfDay(currentDate); // Use current date for null checkout dates

        const days = Math.ceil(
          (checkoutDate - checkinDate) / (1000 * 60 * 60 * 24)
        );

        const totalCharge = days * parseFloat(item.daily_rate);
        const paid = parseFloat(item.paid) || 0;
        const fees = totalCharge * 0.41;
        const overall = totalCharge + fees;
        acc[item.type].receivables += overall - paid;

        return acc;
      }, {});

      // Convert to array and sort by type
      const result = Object.values(groupedData).sort((a, b) =>
        a.type.localeCompare(b.type)
      );

      setVehiclesList(result);
    } catch (error) {
      console.error("Error in fetchVehiclesList:", error.message || error);
    }
  };

  const fetchAllPaymentsDrawer = async () => {
    try {
      const { data, error } = await Supabase.rpc(
        "get_all_payments_data_for_drawer"
      ); // Call the Supabase function
      if (error) throw error;
      setPaymentsDrawer(data);
    } catch (error) {
      console.error("Error fetching payments drawer data:", error);
    }
  };

  const fetchAllTellersLog = async () => {
    try {
      const { data, error } = await Supabase.rpc("get_all_tellers_log");
      if (error) throw error;
      setAllTellersLog(data);
    } catch (error) {
      console.error("Error fetching payments drawer data:", error);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllTellersLog();
      fetchAllPaymentsDrawer();
      fetchVehiclesList();
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
      <AllTellersLog
        allTellersLog={allTellersLog}
        isOpen={isTellersLogDrawerOpen}
        onClose={() => setIsTellersLogDrawerOpen(false)}
      />
      <AllPaymentsDrawer
        paymentsDrawer={paymentsDrawer}
        isOpen={isPaymentsDrawerOpen}
        onClose={() => setIsPaymentsDrawerOpen(false)}
      />
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

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
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
          <LatestPayments
            latestPayments={latestPayments}
            onMoreDetails={togglePaymentsDrawer}
          />

          <div className="grid gap-5">
            {/* vehicles in custody */}
            <VehiclesList vehiclesList={vehiclesList} />

            {/* logs */}
            <div className="bg-white rounded-2xl border row-span-2 border-gray-200 pb-4">
              {/* logs */}
              <TellersLog
                tellersLog={tellersLog}
                onMoreDetails={toggleTellersLogDrawer}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
