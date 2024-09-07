"use client";

import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use 'next/navigation' here
import { Supabase } from "/utils/supabase/client"; // Adjust this import path as needed
import { useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Sign out from Supabase
      const { error } = await Supabase.auth.signOut();
      if (error) throw error;

      // Clear any local storage items
      localStorage.removeItem("tellerId");

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="w-full bg-neutral-800 flex justify-center text-white">
      <div className="flex w-full justify-between items-center text-sm p-2 mx-7">
        <p className="mr-4 text-2xl font-bold">PROTEK</p>
        <div className="flex justify-between w-[600px]">
          <Link
            className={`py-2 ${
              router.asPath === "/" ? "font-semibold text-2xl" : ""
            }`}
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className={`py-2 ${
              router.asPath === "/lots" ? "font-semibold text-2xl" : ""
            }`}
            href="/lots"
          >
            Parking Lots
          </Link>
          <p className="py-2">History</p>
          <p className="py-2">Payments</p>
          <p className="py-2">Financial</p>
        </div>
        <div className="flex items-center">
          <Image
            src="https://scngrphomkhxwdssipjb.supabase.co/storage/v1/object/public/profile/reignme.jpg"
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full mr-3"
          />
          <p>Reignme Burdeos</p>
          <button
            className="text-xl text-gray-800 rounded-xl bg-white ml-4 w-auto h-8 items-center justify-center flex px-2"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <FaSignOutAlt />
            <p className="text-sm ml-2">
              {isLoggingOut ? "Logging out..." : "Logout"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
