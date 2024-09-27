import React from "react";

const AllTellersLog = ({ allTellersLog = [], isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 px-9 transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white w-full max-w-[1365px] h-2/3 mx-auto rounded-t-2xl shadow-lg transform transition-transform duration-500 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 pt-6 flex justify-between items-center">
          <h2 className="text-[0.900rem] font-medium">All Tellers Log</h2>
          <button onClick={onClose} className="text-gray-600 font-extrabold">
            ✕
          </button>
        </div>
        <p className="px-6 pb-2 text-[0.68rem] text-gray-600 border-gray-200">
          See all log ins and log outs of tellers
        </p>

        <div className="overflow-x-auto p-4">
          <div className="max-h-[530px] overflow-y-auto">
            <table className="min-w-full text-left table-auto">
              <thead>
                <tr className="text-[0.8rem] text-gray-500 border-t text-center">
                  <th className="py-3 px-4 text-left font-normal">Name</th>
                  <th className="py-3 px-4 font-normal">Date</th>
                  <th className="py-3 px-4 font-normal">Log in</th>
                  <th className="py-3 px-4 font-normal">Log out</th>
                  <th className="py-3 px-4 font-normal">Role</th>
                  <th className="py-3 px-4 font-normal">Branch</th>
                </tr>
              </thead>
              <tbody className="text-xs text-center">
                {allTellersLog.map((teller, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer">
                    <td className="py-3 px-4 text-left">
                      {teller.teller_name}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(teller.log_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      {teller.login_time
                        ? new Date(
                            `1970-01-01T${teller.login_time}+08:00`
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "-"}
                    </td>
                    <td className="py-3 px-4">
                      {teller.logout_time
                        ? new Date(
                            `1970-01-01T${teller.logout_time}+08:00`
                          ).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                        : "-"}
                    </td>

                    <td className="py-3 px-4">Teller</td>
                    <td className="py-3 px-4">{teller.branch_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTellersLog;
