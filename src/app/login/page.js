"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Supabase } from "/utils/supabase/client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassKey = (passKey) => {
    return passKey.length >= 6;
  };

  const recordLoginTime = async (tellerData) => {
    const currentDate = new Date();
    const date = format(currentDate, "yyyy-MM-dd");
    const loginTime = format(currentDate, "HH:mm:ss");

    try {
      const { data: existingLog, error: fetchError } = await Supabase.from(
        "tellers_log"
      )
        .select("log_id")
        .eq("teller_id", tellerData.id)
        .eq("date", date)
        .maybeSingle();

      if (fetchError) {
        console.error("Failed to check existing login record:", fetchError);
        return { success: false, message: "Failed to check login record." };
      }

      if (existingLog) {
        return { success: true, message: "Login already recorded for today." };
      }

      const { data: insertedData, error: insertError } = await Supabase.from(
        "tellers_log"
      )
        .insert({
          teller_id: tellerData.id,
          date,
          login_time: loginTime,
        })
        .select();

      if (insertError) {
        console.error("Failed to log login time:", insertError);
        return { success: false, message: "Failed to record login time." };
      } else {
        return { success: true, message: "Login time recorded successfully." };
      }
    } catch (error) {
      console.error("Unexpected error in recordLoginTime:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !passKey) {
      toast.error("Both email and passkey are required!");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      setIsLoading(false);
      return;
    }

    if (!validatePassKey(passKey)) {
      toast.error("Passkey must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    try {
      const { data: tellerData, error: tellerError } = await Supabase.from(
        "tellers"
      )
        .select("id, email, passKey")
        .eq("email", email)
        .single();

      if (tellerError || !tellerData || tellerData.passKey !== passKey) {
        throw new Error("Invalid email or passKey!");
      }

      const loginResult = await recordLoginTime(tellerData);
      if (loginResult.success) {
        console.log(loginResult.message);
      } else {
        console.error(loginResult.message);
      }

      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + 12 * 60 * 60 * 1000);
      const expires = `expires=${expirationDate.toUTCString()}`;

      document.cookie = `tellerId=${tellerData.id}; path=/; ${expires}; Secure; HttpOnly`;

      toast.success("Login successful!");
      if (loginResult.success) {
      }
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="bg-amber-400/70 bg-cover h-screen flex items-center justify-center"
      style={{ backgroundImage: "url(/pexels.jpg)" }}
    >
      <div className="w-[400px]">
        <Image
          src={"/protek logo.png"}
          width={410}
          height={100}
          alt="protek logo"
        />
        <form className="flex flex-col my-4" onSubmit={handleSubmit}>
          <label htmlFor="login-email" className="text-white">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            className="p-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="login-passkey" className="text-white mt-4">
            Passkey
          </label>
          <input
            id="login-passkey"
            className="p-2 rounded-lg"
            type="password"
            value={passKey}
            onChange={(e) => setPassKey(e.target.value)}
            required
          />
          <button
            type="submit"
            className="mt-8 mb-12 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold p-2 rounded-full"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "SUBMIT"}
          </button>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
}
