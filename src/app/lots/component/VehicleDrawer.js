import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Navbar from "/src/app/components/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const VehicleDrawer = ({ openDrawer, closeDrawer, vehicleData }) => {
  const pathname = usePathname();
  const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);

  function openCheckOutModal() {
    setIsCheckOutOpen(true);
  }

  function closeCheckOutModal() {
    setIsCheckOutOpen(false);
  }

  if (!openDrawer) return null;

  const calculateDays = () => {
    if (vehicleData.date_of_checkin) {
      const checkinDate = new Date(vehicleData.date_of_checkin);
      const checkoutDate = vehicleData.date_of_checkout
        ? new Date(vehicleData.date_of_checkout)
        : new Date(); // Use today if no checkout date

      // Ensure checkoutDate is after checkinDate
      if (checkoutDate >= checkinDate) {
        const diffTime = Math.abs(checkoutDate - checkinDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays + 1;
      }
    }
    return "-"; // Return "N/A" if no valid checkin date
  };

  // Function to add prefix to URLs
  const addPrefix = (url) => {
    if (url && (url.startsWith("vehicles/") || url.startsWith("papers/"))) {
      return `https://scngrphomkhxwdssipjb.supabase.co/storage/v1/object/public/${url}`;
    }
    return url;
  };

  // Settings for the carousel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Array of image URLs
  const imageUrls = [
    addPrefix(vehicleData.pic_front),
    addPrefix(vehicleData.pic_back),
    addPrefix(vehicleData.pic_left),
    addPrefix(vehicleData.pic_right),
    addPrefix(vehicleData.pic_interior),
  ].filter(Boolean); // This removes any undefined or null values

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div
      className="bg-slate-800/45 w-screen h-screen fixed z-10 right-0 top-0"
      onClick={closeDrawer}
    >
      <div className="">
        <Navbar />
      </div>

      {/* Side bar */}
      <div
        className="w-[570px] absolute right-0 top-14 bottom-0 bg-white shadow-lg py-8 pl-4 pr-3 overflow-y-auto text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image Carousel */}
        <div className="mb-6 w-[494px] h-[383px] mx-auto">
          <Slider {...settings} className="w-[494px] h-[383px]">
            {imageUrls.map((url, index) => (
              <div key={index} className="w-[494px] h-[383px]">
                <div className="relative w-[494px] h-[383px]">
                  <Image
                    src={url}
                    alt={`Vehicle image ${index + 1}`}
                    fill
                    sizes="494px"
                    style={{
                      objectFit: "cover",
                    }}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Impound status */}
        <p className="pt-6 pb-2 pl-5 text-gray-500">IMPOUND STATUS</p>
        <InfoRow
          label="Check in"
          value={formatDate(vehicleData.date_of_checkin) || "-"}
        />
        <InfoRow
          label="Check out"
          value={formatDate(vehicleData.date_of_checkout) || "-"}
        />
        <InfoRow label="No. of days" value={calculateDays()} />
        <InfoRow label="Total Payments" value={vehicleData.paid || "0"} />
        <InfoRow label="Daily Rate" value={vehicleData.daily_rate || "N/A"} />
        <InfoRow label="Branch" value={vehicleData.branch_name || "N/A"} />
        <InfoRow label="Teller" value={vehicleData.teller_name || "N/A"} />
        <InfoRow label="Parking Lot" value={vehicleData.lot || "N/A"} />

        {/* Vehicle info */}
        <p className="pl-5 pt-6 pb-2 text-gray-500">VEHICLE INFO</p>
        <InfoRow label="Make" value={vehicleData.make || "N/A"} />
        <InfoRow label="Series" value={vehicleData.series || "N/A"} />
        <InfoRow label="Type" value={vehicleData.type || "N/A"} />
        <InfoRow label="Year Model" value={vehicleData.year_model || "N/A"} />
        <InfoRow label="Plate Number" value={vehicleData.plate_no || "N/A"} />
        <InfoRow label="Engine No" value={vehicleData.engine_no || "N/A"} />
        <InfoRow label="Serial No" value={vehicleData.serial_no || "N/A"} />
        <InfoRow label="MV File No" value={vehicleData.mv_file_no || "N/A"} />
        <InfoRow label="CR No" value={vehicleData.cr_no || "N/A"} />

        {/* Vehicle status */}
        <p className="pl-5 pt-6 pb-2 text-gray-500">VEHICLE STATUS</p>
        <InfoRow label="Gas" value={vehicleData.gas || "N/A"} />
        <InfoRow label="Mileage" value={vehicleData.mileage || "N/A"} />

        {/* Damages */}
        <p className="pl-5 pt-6 pb-2 text-gray-500">DAMAGES</p>
        <p className="pl-5">
          {vehicleData.damages && vehicleData.damages.length > 0
            ? vehicleData.damages.join(", ")
            : "No damages reported"}
        </p>

        {pathname !== "/history" && (
          <div className="flex items-center justify-center mb-5">
            <button
              onClick={openCheckOutModal}
              className="rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-medium shadow-md py-2.5 w-[450px] h-[44px] mt-5"
            >
              <p>C H E C K O U T</p>
            </button>
          </div>
        )}
      </div>
      {isCheckOutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-end"></div>
            <div className="text-center">
              <p className="mb-8 font-medium">
                Scan the QR Code to complete the transaction via the mobile app
              </p>
              <div className="flex justify-center">
                <Image
                  src="https://scngrphomkhxwdssipjb.supabase.co/storage/v1/object/public/receipts/QR%20Code.png"
                  alt="QR Code"
                  width={200}
                  height={200}
                />
              </div>
              <div className="mt-10 mb-6 border-b border-gray-400"></div>
              <div className="flex justify-between">
                <p className="text-xs font-semibold">
                  TOTAL REMAINING PAYMENT:
                </p>
                <p className="text-sm font-bold">₱ 75,450.00</p>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={closeCheckOutModal}
                className="w-full py-2 text-sm font-medium bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="px-5 flex justify-between py-2">
    <p className="font-medium">{label}</p>
    <p className="text-slate-600">{value}</p>
  </div>
);

export default VehicleDrawer;
