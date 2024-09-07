"use client";

import { useState, useEffect, useRef } from "react";
import { IoMdCalendar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaChevronDown, FaCity } from "react-icons/fa6";
import Navbar from "../components/Navbar";
import BranchButton from "../components/BranchButton";
import { GiHomeGarage } from "react-icons/gi";
import Image from "next/image";

export default function Lots() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [selectedLot, setSelectedLot] = useState("");
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  );

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleLotChange = (event) => {
    setSelectedLot(event.target.value);
  };

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCloseModal();
  };

  const handleItemClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedVehicle(null);
  };

  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center relative">
      <Navbar />
      {/* drawer */}
      {openDrawer && (
        <div
          className="bg-slate-800/45 w-screen h-screen fixed z-10 right-0 top-0"
          onClick={closeDrawer}
        >
          <div className="ml-[1.06rem]">
            <Navbar />
          </div>

          {/* side bar */}
          <div
            className="w-[540px] absolute right-0 top-14 bottom-0 bg-white shadow-lg py-8 pl-4 pr-3 overflow-y-auto text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={
                "https://scngrphomkhxwdssipjb.supabase.co/storage/v1/object/public/vehicles/jeep_wrangler.jpg"
              }
              alt="vehicle"
              width={494}
              height={383}
              className="rounded-2xl"
            />

            {/* impound status */}
            <p className="pt-6 pb-2 px-5 text-gray-500">IMPOUND STATUS</p>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Check in</p>
              <p className="text-slate-600">07/29/2024 12:30</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Check out</p>
              <p className="text-slate-600">N/A</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">No. of days</p>
              <p className="text-slate-600">10</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Total Payments</p>
              <p className="text-slate-600">0</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Daily Rate</p>
              <p className="text-slate-600">300</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Branch</p>
              <p className="text-slate-600">Butuan City - Main</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Teller</p>
              <p className="text-slate-600">Janine Doe</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Parking Lot</p>
              <p className="text-slate-600">P1 - A2</p>
            </div>

            {/* vehicle info */}
            <p className="px-5 pt-6 pb-2 text-gray-500">VEHICLE INFO</p>
            <div className="px-5 flex justify-between py-2 text-sm">
              <p className="font-medium">Make</p>
              <p className="text-slate-600">Jeep</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Model</p>
              <p className="text-slate-600">Wrangler</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Type</p>
              <p className="text-slate-600">Midsize SUV</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Fuel Type</p>
              <p className="text-slate-600">Gas</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Year</p>
              <p className="text-slate-600">2022</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Plate Number</p>
              <p className="text-slate-600">JBU-994</p>
            </div>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Owner</p>
              <p className="text-slate-600">Jane Doe</p>
            </div>

            {/* vehicle status */}
            <p className="px-5 pt-6 pb-2 text-gray-500">VEHICLE STATUS</p>
            <div className="px-5 flex justify-between py-2">
              <p className="font-medium">Mileage</p>
              <p className="text-slate-600">18,000 KM</p>
            </div>
            <p className="px-5 pt-6 pb-2 text-gray-500">STATEMENT OF ACCOUNT</p>
            <p className="px-5 pt-6 pb-2 text-gray-500">VIOLATIONS</p>

            {/* damages */}
            <p className="px-5 pt-6 pb-2 text-gray-500">DAMAGES</p>
            <p className="px-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* checkout */}
            <div className="flex items-center justify-center mb-5">
              <button className="rounded-lg bg-yellow-400 hover:bg-yellow-600 text-black font-medium shadow-md py-2.5 w-[450px] h-[44px] mt-5">
                <p className="">C H E C K O U T</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[1440px] px-9 flex flex-col flex-1 pb-8 ">
        {/* top filters */}
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Dashboard</p>
            <p className="">All branches overview</p>
          </div>

          <button
            onClick={handleOpenModal}
            className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center"
          >
            <div className="text-2xl">
              <GiHomeGarage />
            </div>
            <p className="text-sm ml-2">Add New Lot</p>
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-2xl shadow-lg relative w-1/4">
                <button
                  onClick={handleCloseModal}
                  className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
                >
                  &times;
                </button>
                <h2 className="text-lg font-bold text-center">Add New Lot</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex justify-center items-center mx-auto">
                    <div className="mb-4 items-center justify-center w-full">
                      <label
                        htmlFor="phase"
                        className="block font-medium text-neutral-800 pr-3"
                      >
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
                      <label
                        htmlFor="phase"
                        className="block font-medium text-neutral-800 pr-3"
                      >
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
          <BranchButton />
          <button className="ml-3 h-[46px] w-[100px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center">
            <IoFilterSharp />
            <p className="text-sm ml-2">Filter</p>
          </button>
          <button className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center">
            <IoMdCalendar className="text-2xl" />
            <p className="text-sm mx-2">September 5, 2024</p>
            <FaChevronDown />
          </button>
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

          {/* phase 1 */}
          <div className="border-y border-gray-200 text-center p-3 mb-3">
            <p className="font-semibold">PHASE 1 (SUVs)</p>
          </div>
          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-1</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-2</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-3</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-1</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-2</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          {/* phase 2 */}
          <div className="border-y border-gray-200 text-center p-3 my-3">
            <p className="font-semibold">PHASE 2 (Trucks)</p>
          </div>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-1</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-2</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-3</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-1</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-2</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          {/* phase 3 */}
          <div className="border-y border-gray-200 text-center p-3 my-3">
            <p className="font-semibold">PHASE 3 (Motorcycles)</p>
          </div>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-1</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-2</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">A-3</p>
              <p className="truncate">Jeep Wrangler 2022</p>
              <p className="truncate">Helena Carter</p>
              <p>01-09-2024</p>
              <p>01-31-2024</p>
              <p>22</p>
              <p>5,000.00</p>
              <p>1,600.00</p>
              <div className="mx-2 py-2 rounded-full bg-green-200 text-green-700 font-semibold text-sm">
                OCCUPIED
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-1</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>

          <button
            className="w-full hover:bg-gray-50 transition-colors duration-150"
            onClick={() =>
              handleItemClick({
                lot: "A-1",
                vehicle: "Jeep Wrangler 2022",
                owner: "Helena Carter",
                checkInDate: "01-09-2024",
                checkOutDate: "01-31-2024",
                days: 22,
                receivable: 5000.0,
                collected: 1600.0,
                status: "OCCUPYING",
                make: "Jeep",
                model: "Wrangler",
              })
            }
          >
            <div className="grid grid-cols-9 gap-6 px-6 py-4 text-sm items-center">
              <p className="text-left">B-2</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <p>-</p>
              <div className="mx-2 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold text-sm">
                FREE
              </div>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
