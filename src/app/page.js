// icons
import { IoIosArrowForward, IoMdCalendar } from "react-icons/io";
import { IoFilterSharp } from "react-icons/io5";
import { FaCodeBranch } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="bg-stone-50 flex min-h-screen flex-col items-center">
      <nav className="w-full bg-neutral-800 flex justify-center text-white">
        <div className="container flex items-center py-2">
          <p className="mr-4 text-2xl font-bold">PROTEK</p>
          <p>Admin System</p>
          <p className="ml-auto">Jane Doe</p>
          <div className="ml-4 rounded-full w-10 h-10 bg-gray-400"></div>
        </div>
      </nav>
      <div className="container w-full flex flex-col flex-1 pb-8">
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

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white rounded-xl border border-gray-200 flex flex-col">
            <p className="p-4 pb-0">Rental Collections</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">₱ 1,350,000</p>
              <div className="w-[18px] h-[50%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-auto"></div>
              <div className="w-[18px] h-[40%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-2"></div>
              <div className="w-[18px] h-[60%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-2"></div>
              <div className="w-[18px] h-[80%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-2"></div>
              <div className="w-[18px] h-[70%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-2"></div>
              <div className="w-[18px] h-[100%] rounded-md bg-gray-300 hover:bg-yellow-500 transition-all duration-200 ml-2"></div>
            </div>
            <div className="flex p-4">
              <div className="rounded-full bg-green-200 px-2 mr-2 text-sm font-medium">
                +8.5%
              </div>
              <p className="text-sm">Compared to previous month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col">
            <p className="p-4 pb-0">Receivable</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">₱ 620,000</p>
              <div className="w-[18px] h-[50%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-auto"></div>
              <div className="w-[18px] h-[40%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[60%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[80%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[70%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[100%] rounded-md bg-gray-300 hover:bg-red-500 transition-all duration-200  ml-2"></div>
            </div>
            <div className="flex p-4">
              <div className="rounded-full bg-green-200 px-2 mr-2 text-sm font-medium">
                +8.5%
              </div>
              <p className="text-sm">Compared to previous month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col">
            <p className="p-4 pb-0">Vehicles in Custody</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">360</p>
              <div className="w-[18px] h-[50%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-auto"></div>
              <div className="w-[18px] h-[40%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[60%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[80%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[70%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[100%] rounded-md bg-gray-300 hover:bg-blue-500 transition-all duration-200  ml-2"></div>
            </div>
            <div className="flex p-4">
              <div className="rounded-full bg-green-200 px-2 mr-2 text-sm font-medium">
                +8.5%
              </div>
              <p className="text-sm">Compared to previous month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 flex flex-col">
            <p className="p-4 pb-0">Check-outs</p>
            <div className="p-4 pt-0 border-b border-gray-200 flex items-end h-16">
              <p className="text-2xl font-semibold">160</p>
              <div className="w-[18px] h-[50%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-auto"></div>
              <div className="w-[18px] h-[40%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[60%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[80%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[70%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-2"></div>
              <div className="w-[18px] h-[100%] rounded-md bg-gray-300 hover:bg-green-500 transition-all duration-200  ml-2"></div>
            </div>
            <div className="flex p-4">
              <div className="rounded-full bg-green-200 px-2 mr-2 text-sm font-medium">
                +8.5%
              </div>
              <p className="text-sm">Compared to previous month</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mt-5 flex-1">
          {/* latest payments */}
          <div className="bg-white rounded-xl border border-gray-200 pb-4 h-full">
            <div className="p-4 flex justify-between border-b border-gray-200">
              <div>
                <p className="text-xl font-semibold">Latest Payments</p>
                <p className="text-sm">See latest payment transactions</p>
              </div>
              <button className="flex items-center text-blue-500 hover:text-blue-300">
                <p className="text-sm font-semibold">More details</p>
                <IoIosArrowForward className="text-2xl ml-2" />
              </button>
            </div>

            {/* labels */}
            <div className="grid grid-cols-4 gap-2 p-4 text-sm text-gray-500">
              <p>Name</p>
              <p>Amount</p>
              <p>Method</p>
              <p>Branch</p>
            </div>
            {/* items */}
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
              <p>Jane Doe</p>
              <p>₱ 5,000.00</p>
              <p>GCash</p>
              <p>Butuan City</p>
            </div>
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
              <p>Jane Doe</p>
              <p>₱ 5,000.00</p>
              <p>GCash</p>
              <p>Butuan City</p>
            </div>
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
              <p>Jane Doe</p>
              <p>₱ 5,000.00</p>
              <p>GCash</p>
              <p>Butuan City</p>
            </div>
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
              <p>Jane Doe</p>
              <p>₱ 5,000.00</p>
              <p>GCash</p>
              <p>Butuan City</p>
            </div>
            <div className="grid grid-cols-4 gap-2 px-4 py-2">
              <p>Jane Doe</p>
              <p>₱ 5,000.00</p>
              <p>GCash</p>
              <p>Butuan City</p>
            </div>
          </div>

          <div className="grid gap-5 grid-rows-5">
            {/* vehicles in custody */}
            <div className="bg-white rounded-xl border row-span-3 border-gray-200 pb-4">
              <div className="p-4 flex justify-between border-b border-gray-200">
                <div>
                  <p className="text-xl font-semibold">Vehicles in Custody</p>
                  <p className="text-sm">See the vehicles for every branch</p>
                </div>
                <button className="flex items-center text-blue-500 hover:text-blue-300">
                  <p className="text-sm font-semibold">More details</p>
                  <IoIosArrowForward className="text-2xl ml-2" />
                </button>
              </div>

              {/* labels */}
              <div className="grid grid-cols-4 gap-2 p-4 text-sm text-gray-500">
                <p>Type</p>
                <p>Quantity</p>
                <p>Collected Fees</p>
                <p>Receivables</p>
              </div>
              {/* items */}
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Sedan</p>
                <p>100</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>SUV</p>
                <p>30</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Truck</p>
                <p>15</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Motorcycle</p>
                <p>58</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Van</p>
                <p>7</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Sports car</p>
                <p>2</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
              <div className="grid grid-cols-4 gap-2 px-4 py-2">
                <p>Off-the-road</p>
                <p>10</p>
                <p>₱ 519,300.00</p>
                <p>₱ 51,800.00</p>
              </div>
            </div>

            {/* logs */}
            <div className="bg-white rounded-xl border row-span-2 border-gray-200 pb-4">
              <div className="p-4 flex justify-between border-b border-gray-200">
                <div>
                  <p className="text-xl font-semibold">Logs</p>
                  <p className="text-sm">
                    See latest log ins from branch tellers
                  </p>
                </div>
                <button className="flex items-center text-blue-500 hover:text-blue-300">
                  <p className="text-sm font-semibold">More details</p>
                  <IoIosArrowForward className="text-2xl ml-2" />
                </button>
              </div>

              {/* logs */}
              <div className="grid grid-cols-4 gap-2 p-4 pb-2 text-sm">
                <p>Jane Doe</p>
                <p className="font-semibold text-green-600">IN 10:30 AM</p>
                <p className="font-semibold text-red-600">OUT 5:30 PM</p>
                <p>Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 pb-2 text-sm">
                <p>Jane Doe</p>
                <p className="font-semibold text-green-600">IN 10:30 AM</p>
                <p className="font-semibold text-red-600">OUT 5:30 PM</p>
                <p>Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 pb-2 text-sm">
                <p>Jane Doe</p>
                <p className="font-semibold text-green-600">IN 10:30 AM</p>
                <p className="font-semibold text-red-600">OUT 5:30 PM</p>
                <p>Butuan City</p>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 pb-2 text-sm">
                <p>Jane Doe</p>
                <p className="font-semibold text-green-600">IN 10:30 AM</p>
                <p className="font-semibold text-red-600">OUT 5:30 PM</p>
                <p>Butuan City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
