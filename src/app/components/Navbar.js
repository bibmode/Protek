"use client";

import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Supabase } from "/utils/supabase/client"; // Adjust this import path as needed
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../authContext";
import { format } from "date-fns";
import { toast } from "react-toastify";

const Navbar = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [tellerId, setTellerId] = useState(null);

  useEffect(() => {
    // Retrieve tellerId from both localStorage and cookie when component mounts
    const storedTellerId = localStorage.getItem("tellerId");
    const cookieTellerId = document.cookie.replace(
      /(?:(?:^|.*;\s*)tellerId\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (storedTellerId || cookieTellerId) {
      setTellerId(storedTellerId || cookieTellerId);
    }
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      if (!tellerId) {
        throw new Error("Teller ID not found. Please log in again.");
      }

      const currentDate = new Date();
      const date = format(currentDate, "yyyy-MM-dd");
      const logoutTime = format(currentDate, "HH:mm:ss");

      const { error: updateError } = await Supabase.from("tellers_log")
        .update({ logout_time: logoutTime })
        .eq("teller_id", tellerId)
        .eq("date", date);

      if (updateError) {
        console.error("Failed to update logout time:", updateError);
        throw new Error("Failed to record logout time. Please try again.");
      }

      const { error } = await Supabase.auth.signOut();
      if (error) throw error;

      // Clear tellerId from both localStorage and cookie
      localStorage.removeItem("tellerId");
      document.cookie =
        "tellerId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error.message || "Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render the navbar if not authenticated
  }

  return (
    <div className="w-full bg-neutral-800 flex justify-center text-white">
      <div className="flex w-full justify-between items-center text-sm p-2 mx-7">
        <p className="mr-4 text-2xl font-bold">PROTEK</p>
        <div className="flex justify-between w-[600px]">
          <Link
            className={`py-2 ${
              router.pathname === "/" ? "font-semibold text-2xl" : ""
            }`}
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className={`py-2 ${
              router.pathname === "/lots" ? "font-semibold text-2xl" : ""
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
