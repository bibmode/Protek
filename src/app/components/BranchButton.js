"use client";

import { useState, useEffect, useRef } from "react";
import { FaCity } from "react-icons/fa";
import { Supabase } from "/utils/supabase/client"; // Ensure this is the correct path

const BranchButton = ({ selectedBranch, setSelectedBranch }) => {
  const [branches, setBranches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for dropdown container

  useEffect(() => {
    const fetchBranches = async () => {
      const { data, error } = await Supabase.from("branches").select(
        "id, branch_name, contact_info, address"
      );

      if (error) {
        console.error("Error fetching branches:", error);
      } else {
        setBranches(data);
        const defaultBranch = data.find(
          (branch) => branch.branch_name === "Butuan City (Main Branch)"
        );
        if (defaultBranch && !selectedBranch) {
          setSelectedBranch(defaultBranch.branch_name);
        }
      }
    };

    fetchBranches();
  }, [selectedBranch, setSelectedBranch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
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
    <div
      className="relative inline-block ml-3 justify-center xl:justify-left"
      ref={dropdownRef}
    >
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
