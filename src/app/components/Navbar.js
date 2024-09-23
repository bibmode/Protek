"use client";

import Link from "next/link";
import { FaRegWindowClose, FaSignOutAlt } from "react-icons/fa";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
      <div className="flex w-full justify-between items-center text-sm p-2 mx-7 z-10">
        <div className="md:flex items-center">
          <div className="xl:hidden">
            <button
              className="rounded-2xl shadow-inherit navbar-burger flex items-center text-amber-600 pr-3"
              onClick={toggleMobileMenu}
            >
              <svg
                className="block h-6 w-6 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <div
            className={`text-neutral-800 absolute top-0 left-0 w-full h-auto opacity-100 bg-stone-50 transform ${
              isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            } transition-transform duration-300 xl:hidden`}
          >
            {isMobileMenuOpen && (
              <div className="mobile-menu mt-5">
                <button
                  onClick={toggleMobileMenu}
                  className="flex w-full items-right pr-5"
                >
                  <div className="text-2xl flex justify-between items-center w-full px-5">
                    <div className="bg-neutral-700 rounded-lg p-[2px]">
                      <Image
                        src="/icon.ico"
                        alt="logo"
                        width={25}
                        height={25}
                      />
                    </div>
                    <p className="pl-3 text-2xl font-bold mr-auto">PROTEK</p>
                    <FaRegWindowClose />
                  </div>
                </button>
              </div>
            )}

            <ul className="p-5 mb-5 md:mb-2">
              <li className="block p-2 text-center font-semibold hover:bg-amber-50 hover:text-amber-600 rounded border-t border-b">
                <Link
                  className={`py-2 ${
                    router.pathname === "/" ? "font-semibold text-2xl" : ""
                  }`}
                  href="/"
                >
                  Dashboard
                </Link>
              </li>
              <li className="block p-2 text-center font-semibold hover:bg-amber-50 hover:text-amber-600 rounded border-b">
                <Link
                  className={`py-2 ${
                    router.pathname === "/lots" ? "font-semibold text-2xl" : ""
                  }`}
                  href="/lots"
                >
                  Parking Lots
                </Link>
              </li>
              <li className="block p-2 text-center font-semibold hover:bg-amber-50 hover:text-amber-600 rounded border-b">
                <Link
                  className={`py-2 ${
                    router.pathname === "/history"
                      ? "font-semibold text-2xl"
                      : ""
                  }`}
                  href="/history"
                >
                  History
                </Link>
              </li>
              <li className="block p-2 text-center font-semibold hover:bg-amber-50 hover:text-amber-600 rounded border-b">
                <p className="">Payments</p>
              </li>
              <li className="block p-2 text-center font-semibold hover:bg-amber-50 hover:text-amber-600 rounded border-b">
                <p className="">Financial</p>
              </li>
            </ul>
          </div>
        </div>

        <Link href="/" className="text-2xl font-bold mr-auto flex items-center">
          <div className="bg-neutral-700 rounded-lg p-[2px] mr-3">
            <Image src="/icon.ico" alt="logo" width={25} height={25} />
          </div>
          PROTEK
        </Link>
        <div className="hidden xl:flex justify-between w-[600px] mr-auto">
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
          <Link
            className={`py-2 ${
              router.pathname === "/history" ? "font-semibold text-2xl" : ""
            }`}
            href="/history"
          >
            History
          </Link>
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
