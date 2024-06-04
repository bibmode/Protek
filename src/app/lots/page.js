"use client";

import { useState } from "react";

// icons
import { IoMdCalendar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaCodeBranch } from "react-icons/fa6";

export default function Lots() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center relative">
      {/* drawer */}
      {openDrawer && (
        <div className="bg-slate-800/45 w-screen h-screen fixed z-10 right-0 top-0 ">
          {/* side bar */}
          <div className="h-screen bg-white shadow-lg w-[450px] absolute right-0 py-8 pl-4 pr-3">
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

      <nav className="w-full bg-neutral-800 flex justify-center text-white">
        <div className="container flex items-center py-2">
          <p className="mr-4 text-2xl font-bold">PROTEK</p>
          <p>Admin System</p>
          <p className="ml-auto">Jane Doe</p>
          <div className="ml-4 rounded-full w-10 h-10 bg-gray-400"></div>
        </div>
      </nav>

      <div className="container w-full flex flex-col flex-1 pb-8">
        {/* top filters */}
        <div className="flex w-full items-center">
          <div className="mr-auto py-8">
            <p className="text-2xl font-medium">Dashboard</p>
            <p>All branches overview</p>
          </div>

          <button className="ml-3 bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center">
            <FaCodeBranch />
            <p className="ml-2">All</p>
          </button>
          <button className="ml-3 bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center">
            <IoFilterSharp />
            <p className="ml-2">Filter</p>
          </button>
          <button className="ml-3 bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex items-center">
            <IoMdCalendar className="text-lg" />
            <p className="ml-2">August 2022 - September 2022</p>
          </button>
        </div>

        {/* table */}
        <div className="border bg-white border-gray-200 pb-4 rounded-lg">
          {/* labels */}
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 p-6 w-full text-center text-sm text-gray-500">
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
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">A-1</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">A-2</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">A-3</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">A-4</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">A-5</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>

          {/* phase 2 */}
          <div className="border-y border-gray-200 text-center p-3 my-3">
            <p className="font-semibold">PHASE 2 (Trucks)</p>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">B-1</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">B-2</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">B-3</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">B-4</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">B-5</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>

          {/* phase 3 */}
          <div className="border-y border-gray-200 text-center p-3">
            <p className="font-semibold">PHASE 3 (Motorcycles)</p>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">C-1</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">C-2</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">C-3</p>
            <p className="flex items-center justify-center">
              Jeep Wrangler 2022
            </p>
            <p className="flex items-center justify-center">Helena Carter</p>
            <p className="flex items-center justify-center">01-09-2024</p>
            <p className="flex items-center justify-center">01-31-2024</p>
            <p className="flex items-center justify-center">22</p>
            <p className="flex items-center justify-center">5,000.00</p>
            <p className="flex items-center justify-center">1,600.00</p>
            <div className="mx-4 py-2 rounded-full bg-green-200 text-green-700 font-semibold self-center">
              OCCUPYING
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">C-4</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
          <div className="grid grid-cols-[50px_repeat(8,1fr)] gap-6 px-6 py-4 w-full text-center text-sm">
            <p className="text-left flex items-center">C-5</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <p className="flex items-center justify-center">-</p>
            <div className="mx-4 py-2 rounded-full bg-yellow-100 text-amber-600 font-semibold self-center">
              FREE
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
