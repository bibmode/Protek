import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddNewCarModal = ({ isOpen, handleCloseCarModal, handleSubmit }) => {
  const [dragging, setDragging] = useState(false);
  if (!isOpen) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 overflow-y-auto">
      <div className="bg-white p-4 rounded-2xl shadow-lg relative w-[920px] top-[69rem]">
        <button
          onClick={handleCloseCarModal}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <p className="text-[2rem] text-center mt-5">
          Input New Vehicle (Phase 1 - A2)
        </p>
        <p className="text-center font-medium">Butuan City Branch</p>
        <form className="my-4">
          <p className="pl-[8rem] text-left text-sm text-gray-500 mt-4">
            OWNER INFORMATION
          </p>
          <div className="flex justify-center items-center mx-auto">
            <div className="mb-4 mt-4 mx-auto">
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto">
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    First Name
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Last Name
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
              </div>

              <label className="block text-neutral-800 pr-3 text-sm pl-3 mt-5">
                Email
              </label>
              <div className="flex justify-center items-center">
                <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[650px]"></input>
              </div>

              <label className="block text-neutral-800 pr-3 text-sm pl-3 mt-5">
                Phone
              </label>
              <div className="flex justify-center items-center">
                <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[650px]"></input>
              </div>

              <p className="pl-3 text-left my-5 pt-2 text-sm text-gray-500">
                VEHICLE INFORMATION
              </p>
              <div className="grid grid-cols-2 gap-2 justify-center items-center mx-auto">
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Make
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Model
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Type
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Series
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Year
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Plate Number
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Engine Number
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Serial/Chassis Number
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    MV File No.
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    C.R. No.
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
              </div>

              <p className="pl-3 text-left my-5 pt-2 text-sm text-gray-500">
                VEHICLE STATUS
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Gas
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>
                <div className="col-span-1">
                  <label className="block text-neutral-800 text-sm pl-3">
                    Mileage
                  </label>
                  <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[320px]"></input>
                </div>{" "}
              </div>
              <label className="block text-neutral-800 pr-3 text-sm pl-3 mt-5">
                Damages
              </label>
              <div className="flex justify-center items-center">
                <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[600px] mr-2"></input>
                <button className="border bg-[#F2C94C] rounded-2xl text-white text-3xl items-center flex justify-center h-12 px-3 mt-1 w-30">
                  +
                </button>
              </div>
              <label className="block text-neutral-800 pr-3 text-sm pl-3 mt-5">
                Violations
              </label>
              <div className="flex justify-center items-center">
                <input className="border border-gray-400 rounded-2xl h-12 px-3 mt-1 w-[650px]"></input>
              </div>
              <button className="mt-5 rounded-xl border-[#FFE69A] bg-[#FFFBF0] border-2 h-8 w-[650px]">
                <div className="flex items-center justify-center text-xs">
                  <p className="mr-5">Add Violation</p>
                  <FaPlus />
                </div>
              </button>
              <div className="py-12">
                <div className="mx-auto">
                  <p className="text-center pl-3 font-semibold leading-tight text-gray-800 mb-4">
                    ADD IMAGES
                  </p>
                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    Front Pic
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select Image
                      <input type="image" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    Back Pic
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select Image
                      <input type="image" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    Left Pic
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select Image
                      <input type="image" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    Right Pic
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select Image
                      <input type="image" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    Interior Pic
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select Image
                      <input type="image" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <p className="text-center pl-3 font-semibold leading-tight text-gray-800 mt-10">
                    PAPERS
                  </p>
                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    AFFIDAVIT
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select File
                      <input type="file" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    MEMORANDUM OF AGREEMENT
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select File
                      <input type="file" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>

                  <label className="block font-medium text-neutral-800 pr-3 text-sm pl-3 mt-6">
                    ACKNOWLEDGEMENT
                  </label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`flex flex-col items-center py-2 px-6 rounded-2xl border-2 border-dashed ${
                      dragging ? "border-indigo-500" : "border-gray-400"
                    }`}
                  >
                    <svg
                      className="w-7 h-7 text-gray-500"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>

                    <p className="text-sm text-gray-700">
                      Drop files to upload
                    </p>

                    <p className="mb-2 text-gray-700 text-xs">or</p>

                    <label className="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      Select File
                      <input type="file" name="file" className="sr-only" />
                    </label>

                    <p className="text-xs text-gray-600 mt-4">
                      Maximum upload file size: 20MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-2/3 bg-yellow-400 hover:bg-yellow-600 text-neutral-800 font-medium py-2 px-4 rounded-xl mr-3"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCarModal;
