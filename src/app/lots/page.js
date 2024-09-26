"use client";

import { useState, useEffect } from "react";
import { IoCarSport } from "react-icons/io5";
import Navbar from "../components/Navbar";
import BranchButton from "../components/BranchButton";
import { GiHomeGarage } from "react-icons/gi";
import Image from "next/image";
import AddNewCarModal from "./component/AddNewCar";
import LotDateComponent from "./component/LotDateComponent";
import { Supabase } from "/utils/supabase/client";
import { differenceInDays } from "date-fns";
import VehicleDrawer from "./component/VehicleDrawer";

export default function Lots() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isLotModalOpen, setLotModalOpen] = useState(false);
  const [isCarModalOpen, setCarModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedLot, setSelectedLot] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  );
  const [vehiclesData, setVehiclesData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [vehicleDrawerData, setVehicleDrawerData] = useState([]);
  const [filteredVehicleData, setFilteredVehicleData] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  const handleOpenCarModal = () => setCarModalOpen(true);
  const handleCloseCarModal = () => setCarModalOpen(false);

  const handleOpenLotModal = () => setLotModalOpen(true);
  const handleCloseLotModal = () => setLotModalOpen(false);

  const handleLotChange = (event) => {
    setSelectedLot(event.target.value);
  };

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedPhase || !selectedLot) {
      alert("Please select both phase and lot.");
      return;
    }

    const phaseMapping = {
      phase1: "p1",
      phase2: "p2",
      phase3: "p3",
    };

    const phaseCode = phaseMapping[selectedPhase];

    const spaceCode = `bxu-${phaseCode}${selectedLot.toLowerCase()}`;

    handleCloseLotModal();
  };

  // Handles clicks when a vehicle is present
  const handleVehicleItem = (vehicle) => {
    const vehicleId = vehicle.vehicle_id;
    console.log("Vehicle Item:", vehicleId);
    setSelectedVehicle(vehicleId);
    const filteredData = vehicleDrawerData.find(
      (item) => item.id === vehicleId
    );
    setFilteredVehicleData(filteredData || null);

    setOpenDrawer(true);
  };

  // Handles clicks when a vehicle is not present (lot is free)
  const handleLotItem = (lot) => {
    setCarModalOpen(true);
    console.log("Lot:", lot.space_code);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedVehicle(null);
  };

  const fetchVehicleDrawerData = async () => {
    try {
      const { data, error } = await Supabase.rpc("get_vehicle_drawer_data");
      if (error) throw error;
      setVehicleDrawerData(data);
    } catch (error) {
      console.error("Error fetching vehicle drawer data:", error);
    }
  };

  const fetchLotAndVehicles = async () => {
    try {
      const { data, error } = await Supabase.rpc("get_vehicles_list_for_lots");
      if (error) throw error;

      // Get all unique lots
      const allLots = [...new Set(data.map((item) => item.lot))];

      // Create an object to hold vehicle data by lot and phase
      const vehiclesByPhase = {};

      // Process vehicle data
      data.forEach((lotData) => {
        const checkinDate = lotData.checkin_date
          ? new Date(lotData.checkin_date)
          : null;
        const checkoutDate = lotData.checkout_date
          ? new Date(lotData.checkout_date)
          : null;

        // Determine if the vehicle is currently in custody based on startDate
        const isInCustody =
          checkinDate && checkoutDate
            ? startDate >= checkinDate && startDate <= checkoutDate
            : checkinDate && !checkoutDate && startDate >= checkinDate;

        const phase = lotData.phase || "Unassigned";

        if (!vehiclesByPhase[phase]) {
          vehiclesByPhase[phase] = [];
        }

        // If vehicle is not in custody, set relevant fields to null or dash
        if (!isInCustody) {
          vehiclesByPhase[phase].push({
            phase,
            lot: lotData.lot || "-",
            space_code: lotData.space_code || "-", // Store space_code but don't display it
            vehicle_id: null, // Set vehicle_id to null for free lots
            vehicle: null,
            owner: null,
            checkin_date: null,
            checkout_date: null,
            days: "-", // Explicitly set dash for no vehicle
            receivables: "-", // Explicitly set dash for no vehicle
            collected: "-", // Explicitly set dash for no vehicle
            status: false,
            branch_name: lotData.branch_name || "-",
          });
        } else {
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

          // Display dash if days, receivables, or collected are 0 or null
          const displayDays = days + 1 === 0 ? "-" : Math.round(days);
          const displayReceivables =
            receivables === 0 ? "-" : Number(receivables.toFixed(2));
          const displayCollected =
            collected === 0 ? "-" : Number(collected.toFixed(2));

          vehiclesByPhase[phase].push({
            phase,
            lot: lotData.lot || "-",
            space_code: lotData.space_code || "-", // Store space_code but don't display it
            vehicle_id: lotData.vehicle_id, // Store vehicle_id for occupied vehicles
            vehicle: lotData.vehicle || "-",
            owner: lotData.owner || "-",
            checkin_date: lotData.checkin_date || null,
            checkout_date: lotData.checkout_date || null,
            days: displayDays + 1,
            receivables: displayReceivables,
            collected: displayCollected,
            status: true,
            branch_name: lotData.branch_name || "-",
          });
        }
      });

      // Handle lots with no vehicles, setting default values with dash
      allLots.forEach((lot) => {
        const phase =
          data.find((item) => item.lot === lot)?.phase || "Unassigned";

        if (!vehiclesByPhase[phase]) {
          vehiclesByPhase[phase] = [];
        }

        const lotHasVehicle = data.some(
          (item) => item.lot === lot && item.checkin_date
        );

        if (!lotHasVehicle) {
          vehiclesByPhase[phase].push({
            phase,
            lot,
            space_code: "-", // Set dash for lots without vehicles
            vehicle_id: null, // Set vehicle_id to null for free lots
            vehicle: null,
            owner: null,
            checkin_date: null,
            checkout_date: null,
            days: "-", // Set dash for lots without vehicles
            receivables: "-", // Set dash for lots without vehicles
            collected: "-", // Set dash for lots without vehicles
            status: false,
            branch_name: selectedBranch || "-",
          });
        }
      });

      // Ensure uniqueness by lot (remove duplicates)
      for (const phase in vehiclesByPhase) {
        vehiclesByPhase[phase] = vehiclesByPhase[phase].filter(
          (v, index, self) => index === self.findIndex((t) => t.lot === v.lot)
        );
      }

      setVehiclesData(vehiclesByPhase);
    } catch (error) {
      console.error("Error in fetchLotAndVehicles:", error);
    }
  };

  useEffect(() => {
    fetchLotAndVehicles();
    fetchVehicleDrawerData();
    const intervalId = setInterval(
      fetchLotAndVehicles,
      fetchVehicleDrawerData,
      5000
    );
    return () => clearInterval(intervalId);
  }, [selectedBranch, startDate]);

  const renderVehiclesByPhase = () => {
    return Object.keys(vehiclesData).map((phase) => (
      <div key={phase}>
        <div className="border-y border-gray-200 text-center p-3 mb-3">
          <p className="font-semibold">{phase.toUpperCase()}</p>
        </div>
        {vehiclesData[phase].map((vehicle) => (
          <button
            key={vehicle.vehicle_id || vehicle.lot}
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              vehicle.vehicle
                ? handleVehicleItem(vehicle)
                : handleLotItem(vehicle)
            }
            aria-label={`Details for lot ${vehicle.lot}`}
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
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
              <div
                className={`mx-2 py-2 rounded-full ${
                  vehicle.status
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-100 text-amber-600"
                } font-semibold text-sm`}
              >
                {vehicle.status ? "OCCUPIED" : "FREE"}
              </div>
            </div>
          </button>
        ))}
      </div>
    ));
  };

  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center relative">
      <Navbar />
      {/* drawer */}
      <VehicleDrawer
        openDrawer={openDrawer}
        closeDrawer={closeDrawer}
        vehicleData={filteredVehicleData}
      />

      <div className="w-full max-w-[1440px] px-9 flex flex-col flex-1 pb-8 ">
        {/* top filters */}
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Parking Lots</p>
            <p className="">All branches overview</p>
          </div>

          <div className="flex">
            <div className="grid grid-cols-1 xl:grid-cols-1 gap-3 xl:gap-0">
              {/* <button
                onClick={handleOpenCarModal}
                className="ml-3 w-[160px] h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center"
              >
                <div className="text-2xl">
                  <IoCarSport />
                </div>
                <p className="text-sm ml-2">Add New Car</p>
              </button> */}
              <button
                onClick={handleOpenLotModal}
                className="ml-3 w-[160px] h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center"
              >
                <div className="text-2xl">
                  <GiHomeGarage />
                </div>
                <p className="text-sm ml-2">Add New Lot</p>
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-0">
              <BranchButton
                selectedBranch={selectedBranch}
                setSelectedBranch={setSelectedBranch}
              />
              <LotDateComponent
                startDate={startDate}
                onDateChange={handleDateChange}
              />
            </div>
          </div>

          {isCarModalOpen && (
            <AddNewCarModal
              isOpen={isCarModalOpen}
              handleCloseCarModal={handleCloseCarModal}
              handleSubmit={handleSubmit}
            />
          )}

          {/* Modal */}
          {isLotModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-2xl shadow-lg relative w-[480px]">
                <button
                  onClick={handleCloseLotModal}
                  className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold text-center">Add New Lot</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex justify-center items-center mx-auto">
                    <div className="mb-4 items-center justify-center w-full">
                      <label className="block font-medium text-neutral-800 pr-3">
                        Phase:
                      </label>
                      <select
                        id="phase"
                        value={selectedPhase}
                        onChange={handlePhaseChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                      >
                        <option value="">Select a phase</option>
                        <option value="phase1">Phase 1 (SUVs)</option>
                        <option value="phase2">Phase 2 (Trucks)</option>
                        <option value="phase3">Phase 3 (Motorcycles)</option>
                      </select>{" "}
                      <br></br>
                      <label className="block font-medium text-neutral-800 pr-3">
                        Lot:
                      </label>
                      <select
                        id="lot"
                        value={selectedLot}
                        onChange={handleLotChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
                      >
                        <option value="">Select a lot</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="w-2/3 bg-yellow-400 hover:bg-yellow-600 text-neutral-800 font-medium py-2 px-4 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* table */}
        <div className="border bg-white border-gray-200 pb-4 rounded-2xl">
          {/* labels */}
          <div className="grid grid-cols-9 gap-6 p-6 w-full text-center text-sm font-semibold">
            <p className="text-left">Lot</p>
            <p>Vehicle</p>
            <p>Owner</p>
            <p>Check-in-date</p>
            <p>Check-out-date</p>
            <p>Days</p>
            <p>Receivable</p>
            <p>Collected</p>
            <p>Status</p>
          </div>
          {renderVehiclesByPhase()}
        </div>
      </div>
    </main>
  );
}
