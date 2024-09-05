"use client";

import { useState } from "react";

// icons
import { IoMdCalendar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaCodeBranch, FaCar, FaChevronDown } from "react-icons/fa6";
import Navbar from "../components/Navbar";

export default function Lots() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleItemClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
    setSelectedVehicle(null);
  };

  const gridClass =
    "grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 w-full text-sm";

  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center relative">
      {/* drawer */}
      {openDrawer && (
        <div
          className="bg-slate-800/45 w-screen h-screen fixed z-10 right-0 top-0"
          onClick={closeDrawer}
        >
          {/* side bar */}
          <div
            className="h-screen bg-white shadow-lg w-[450px] absolute right-0 py-8 pl-4 pr-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl bg-slate-400 w-full h-60"></div>

            {/* impound status */}
            <p className="pt-6 pb-2 text-gray-500">IMPOUND STATUS</p>
            <div className="flex justify-between py-2">
              <p>Check in</p>
              <p className="text-slate-600">07/29/2024 12:30</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Check out</p>
              <p className="text-slate-600">N/A</p>
            </div>

            {/* vehicle info */}
            <p className="pt-6 pb-2 text-gray-500">VEHICLE INFO</p>
            <div className="flex justify-between py-2">
              <p>Make</p>
              <p className="text-slate-600">Jeep</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Model</p>
              <p className="text-slate-600">Wrangler</p>
            </div>

            {/* vehicle status */}
            <p className="pt-6 pb-2 text-gray-500">VEHICLE STATUS</p>
            <div className="flex justify-between py-2">
              <p>Gas</p>
              <p className="text-slate-600">Jeep</p>
            </div>
            <div className="flex justify-between py-2">
              <p>Mileage</p>
              <p className="text-slate-600">Wrangler</p>
            </div>

            {/* damages */}
            <p className="pt-6 pb-2 text-gray-500">DAMAGES</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* checkout */}
            <button className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow-md py-2.5 w-full mt-4">
              CHECK-OUT
            </button>
          </div>
        </div>
      )}

      <Navbar />

      <div className="w-full max-w-[1440px] px-9 flex flex-col flex-1 pb-8 ">
        {/* top filters */}
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Dashboard</p>
            <p>All branches overview</p>
          </div>

          <button className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center">
            <FaCar />
            <p className="text-sm ml-2">Add New</p>
          </button>
          <button className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center">
            <FaCodeBranch />
            <p className="text-sm ml-2">All Branches</p>
          </button>
          <button className="ml-3 h-[46px] w-[100px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center">
            <IoFilterSharp />
            <p className="text-sm ml-2">Filter</p>
          </button>
          <button className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center">
            <IoMdCalendar className="text-lg" />
            <p className="text-sm mx-2">August 2022 - September 2022</p>
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
              <p className="text-left">A-4</p>
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
              <p className="text-left">A-5</p>
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
              <p className="text-left">B-3</p>
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
              <p className="text-left">B-4</p>
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
              <p className="text-left">B-5</p>
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
              <p className="text-left">C-1</p>
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
              <p className="text-left">C-2</p>
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
              <p className="text-left">C-3</p>
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
              <p className="text-left">C-4</p>
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
              <p className="text-left">C-5</p>
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
