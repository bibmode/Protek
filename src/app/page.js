// icons
import { IoIosArrowForward, IoMdCalendar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaCodeBranch, FaChevronDown } from "react-icons/fa6";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="bg-stone-50 w-full max-w-screen min-w-screen flex flex-col items-center">
      <Navbar />
      <div className="max-w-[1440px] w-full px-9 flex flex-col flex-1 pb-10">
        <div className="flex w-full items-center">
          <div className="mr-auto pt-11 pb-9">
            <p className="text-3xl font-regular">Dashboard</p>
            <p>All branches overview</p>
          </div>

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

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-[152px]">
            <p className="p-4 pb-0 text-[0.900rem] font-medium">
              Rental Collections
            </p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">₱ 1,350,000</p>
              <div className="h-[49px] flex items-end ml-auto">
                <div className="w-[15px] h-[50%] rounded bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-auto"></div>
                <div className="w-[15px] h-[40%] rounded bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-[6px]"></div>
                <div className="w-[15px] h-[60%] rounded bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-[6px]"></div>
                <div className="w-[15px] h-[80%] rounded bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-[6px]"></div>
                <div className="w-[15px] h-[70%] rounded bg-yellow-500 hover:bg-yellow-500 transition-all duration-200 ml-[6px]"></div>
                <div className="w-[15px] h-[100%] rounded bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-[6px]"></div>
              </div>
            </div>
            <div className="flex p-3 items-center">
              <div className="rounded-full h-[23px] bg-green-100 px-3 mr-2 text-[0.60rem] flex font-medium items-center text-green-700">
                +8.15%
              </div>
              <p className="text-[0.68rem] items-center">
                Compared to previous month
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-[152px]">
            <p className="p-4 pb-0 text-[0.900rem] font-medium">Receivable</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">₱ 620,000</p>
              <div className="h-[49px] flex items-end ml-auto">
                <div className="w-[15px] h-[50%] rounded bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-auto"></div>
                <div className="w-[15px] h-[40%] rounded bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[60%] rounded bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[80%] rounded bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[70%] rounded bg-red-500 hover:bg-red-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[100%] rounded bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-[6px]"></div>
              </div>
            </div>
            <div className="flex p-3 items-center">
              <div className="rounded-full h-[23px] bg-green-100 px-3 mr-2 text-[0.60rem] flex font-medium items-center text-green-700">
                +8.15%
              </div>
              <p className="text-[0.68rem] items-center">
                Compared to previous month
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-[152px]">
            <p className="p-4 pb-0 text-[0.900rem] font-medium">
              Vehicles in Custody
            </p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">360</p>
              <div className="h-[49px] flex items-end ml-auto">
                <div className="w-[15px] h-[50%] rounded bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-auto"></div>
                <div className="w-[15px] h-[40%] rounded bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[60%] rounded bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[80%] rounded bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[70%] rounded bg-blue-500 hover:bg-blue-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[100%] rounded bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-[6px]"></div>
              </div>
            </div>
            <div className="flex p-3 items-center">
              <div className="rounded-full h-[23px] bg-green-100 px-3 mr-2 text-[0.60rem] flex font-medium items-center text-green-700">
                +8.15%
              </div>
              <p className="text-[0.68rem] items-center">
                Compared to previous month
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col h-[152px]">
            <p className="p-4 pb-0 text-[0.900rem] font-medium">Check-outs</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">160</p>
              <div className="h-[49px] flex items-end ml-auto">
                <div className="w-[15px] h-[50%] rounded bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-auto"></div>
                <div className="w-[15px] h-[40%] rounded bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[60%] rounded bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[80%] rounded bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[70%] rounded bg-green-500 hover:bg-green-500 transition-all duration-200  ml-[6px]"></div>
                <div className="w-[15px] h-[100%] rounded bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-[6px]"></div>
              </div>
            </div>
            <div className="flex p-3 items-center">
              <div className="rounded-full h-[23px] bg-green-100 px-3 mr-2 text-[0.60rem] flex font-medium items-center text-green-700">
                +8.15%
              </div>
              <p className="text-[0.68rem] items-center">
                Compared to previous month
              </p>
            </div>
          </div>
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
