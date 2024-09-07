"use client";

import { useState, useEffect, useRef } from "react";
import { FaCity } from "react-icons/fa";
import { Supabase } from "/utils/supabase/client"; // Ensure this is the correct path

const BranchButton = () => {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(
    "Butuan City (Main Branch)"
  ); // Initial branch
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown container

  useEffect(() => {
    // Fetch branches with id, branch_name, contact_info, and address from Supabase
    const fetchBranches = async () => {
      const { data, error } = await Supabase.from("branches").select(
        "id, branch_name, contact_info, address"
      );

      if (error) {
        console.error("Error fetching branches:", error);
      } else {
        setBranches(data);
        // Check if "Butuan City (Main Branch)" exists in the fetched data and set it as the selected branch
        const defaultBranch = data.find(
          (branch) => branch.branch_name === "Butuan City (Main Branch)"
        );
        if (defaultBranch) {
          setSelectedBranch(defaultBranch.branch_name);
        }
      }
    };

    fetchBranches();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the dropdown if the user clicks outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectBranch = (branchName) => {
    setSelectedBranch(branchName);
    setIsOpen(false); // Close dropdown after selecting
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="ml-3 h-[46px] bg-white hover:bg-neutral-100 border border-gray-200 px-4 py-2 rounded-md flex justify-center items-center"
      >
        <FaCity className="text-2xl" />
        <p className="text-sm ml-2">{selectedBranch}</p>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-60 left-3 top-10 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul>
            {branches.map((branch) => (
              <li
                key={branch.id}
                className="px-4 py-2 hover:bg-neutral-100 cursor-pointer"
                onClick={() => handleSelectBranch(branch.branch_name)}
              >
                <p className="text-sm text-center">{branch.branch_name}</p>
                {branch.address && (
                  <p className="text-sm text-gray-600">
                    Address: {branch.address}
                  </p>
                )}
                {branch.contact_info && (
                  <p className="text-sm text-gray-600">
                    Contact: {branch.contact_info}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BranchButton;
