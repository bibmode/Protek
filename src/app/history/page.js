"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BranchButton from "../components/BranchButton";
import { IoMdSearch } from "react-icons/io";
import { differenceInDays } from "date-fns";
import { Supabase } from "/utils/supabase/client";
import VehicleDrawer from "../lots/component/VehicleDrawer";

const History = () => {
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  );
  const [startDate, setStartDate] = useState(new Date());
  const [vehiclesData, setVehiclesData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleItem = (vehicle) => {
    const vehicleId = vehicle.vehicle_id;
    console.log("Vehicle Item:", vehicleId);
    setSelectedVehicle(vehicleId);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedVehicle(null);
  };

  const fetchLotAndVehiclesHistory = async () => {
    setError(null);
    try {
      const { data, error } = await Supabase.rpc("get_vehicles_list_for_lots");
      if (error) throw error;

      const filteredData = data.filter((item) => item.checkout_date !== null);
      filteredData.sort(
        (a, b) => new Date(b.checkout_date) - new Date(a.checkout_date)
      );

      const uniqueVehicles = filteredData.filter(
        (item, index, self) =>
          index === self.findIndex((v) => v.vehicle_id === item.vehicle_id)
      );

      const vehiclesByPhase = {};
      uniqueVehicles.forEach((lotData) => {
        const checkinDate = lotData.checkin_date
          ? new Date(lotData.checkin_date)
          : null;
        const checkoutDate = lotData.checkout_date
          ? new Date(lotData.checkout_date)
          : null;

        const phase = lotData.phase || "Unassigned";

        if (!vehiclesByPhase[phase]) {
          vehiclesByPhase[phase] = [];
        }

        const days = checkinDate
          ? checkoutDate
            ? differenceInDays(checkoutDate, checkinDate)
            : differenceInDays(new Date(), checkinDate)
          : 0;

        const dailyRate = parseFloat(lotData.daily_rate) || 0;
        const collected = parseFloat(lotData.collected) || 0;
        const receivables = Math.max(
          (days + 1) * dailyRate + (days + 1) * dailyRate * 0.41 - collected,
          0
        );

        vehiclesByPhase[phase].push({
          phase,
          lot: lotData.lot || "-",
          space_code: lotData.space_code || "-",
          vehicle_id: lotData.vehicle_id,
          vehicle: lotData.vehicle || "-",
          owner: lotData.owner || "-",
          checkin_date: lotData.checkin_date || null,
          checkout_date: lotData.checkout_date || null,
          days: days + 1,
          receivables: receivables,
          collected: collected,
          branch_name: lotData.branch_name || "-",
        });
      });

      setVehiclesData(vehiclesByPhase);
    } catch (error) {
      console.error("Error in fetchLotAndVehiclesHistory:", error);
      setError("Failed to fetch vehicle history. Please try again.");
    }
  };

  useEffect(() => {
    fetchLotAndVehiclesHistory();
    const intervalId = setInterval(fetchLotAndVehiclesHistory, 5000);
    return () => clearInterval(intervalId);
  }, [selectedBranch, startDate]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderVehiclesByPhase = () => {
    return Object.keys(vehiclesData).map((phase) => {
      const filteredVehicles = vehiclesData[phase].filter((vehicle) => {
        const vehicleStr =
          `${vehicle.vehicle} ${vehicle.owner} ${vehicle.lot}`.toLowerCase();
        return vehicleStr.includes(searchQuery.toLowerCase());
      });

      return (
        <div key={phase}>
          <div className="border-y border-gray-200 text-center p-3 mb-3">
            <p className="font-semibold">{phase.toUpperCase()}</p>
          </div>
          {filteredVehicles.map((vehicle) => (
            <button
              key={vehicle.vehicle_id || vehicle.lot}
              onClick={() => handleVehicleItem(vehicle)}
              className="w-full hover:bg-gray-50 transition-colors duration-150"
              aria-label={`Details for lot ${vehicle.lot}`}
            >
              <div className="grid grid-cols-8 gap-6 px-6 py-4 text-sm items-center">
                <p className="text-left">{vehicle.lot}</p>
                <p className="truncate">{vehicle.vehicle || "-"}</p>
                <p className="truncate">{vehicle.owner || "-"}</p>
                <p>
                  {vehicle.checkin_date
                    ? new Date(vehicle.checkin_date).toLocaleDateString()
                    : "-"}
                </p>
                <p>
                  {vehicle.checkout_date
                    ? new Date(vehicle.checkout_date).toLocaleDateString()
                    : "-"}
                </p>
                <p>{(vehicle.days || 0).toLocaleString()}</p>
                <p>
                  {(vehicle.receivables || 0) > 0
                    ? `₱${vehicle.receivables.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "-"}
                </p>
                <p>
                  {(vehicle.collected || 0) > 0
                    ? `₱${vehicle.collected.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}`
                    : "-"}
                </p>
              </div>
            </button>
          ))}
        </div>
      );
    });
  };

  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center relative">
      <Navbar />
      <VehicleDrawer openDrawer={openDrawer} closeDrawer={closeDrawer} />
      <div className="w-full max-w-[1440px] px-9 flex flex-col flex-1 pb-8 ">
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Inventory History</p>
            <p className="">All branches overview</p>
          </div>

          <div className="flex justify-center items-center w-[830px]">
            <div className="ml-auto xl:hidden flex xl:ml-3 h-[46px] bg-white border border-gray-200 px-4 py-2 rounded-md justify-center items-center">
              <div className="text-2xl ml-3">
                <IoMdSearch />
              </div>
              <input
                className="h-[46px] bg-white border-y px-4 py-2 flex justify-center items-center text-sm placeholder-gray-500 focus:outline-none"
                placeholder="Search Vehicle/Owner/Lot"
                value={searchQuery} // Bind value to searchQuery
                onChange={handleSearchChange} // Update on change
              />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 justify-center xl:justify-evenly xl:gap-0 ml-auto">
              <div className="hidden xl:flex ml-3 h-[46px] bg-white border border-gray-200 px-4 py-2 rounded-md justify-center items-center">
                <div className="text-2xl ml-3">
                  <IoMdSearch />
                </div>
                <input
                  className="h-[46px] bg-white border-y px-4 py-2 flex justify-center items-center text-sm placeholder-gray-500 focus:outline-none"
                  placeholder="Search Vehicle/Owner/Lot"
                  value={searchQuery} // Bind value to searchQuery
                  onChange={handleSearchChange} // Update on change
                />
              </div>

              <BranchButton
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
              />
            </div>
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="bg-white rounded-md shadow-md overflow-hidden p-3">
          <div className="grid grid-cols-8 gap-6 px-6 py-4 text-sm text-center font-semibold border-b border-gray-200">
            <p className="text-left">Lot</p>
            <p>Vehicle</p>
            <p>Owner</p>
            <p>Check-in Date</p>
            <p>Check-out Date</p>
            <p>Days of Stay</p>
            <p>Remaining Balance</p>
            <p>Paid</p>
          </div>
          {renderVehiclesByPhase()}
        </div>
      </div>
    </main>
  );
};

export default History;
