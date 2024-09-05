"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "/utils/supabase/client";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passKey, setPassKey] = useState("");
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassKey = (passKey) => {
    return passKey.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !passKey) {
      toast.error("Both email and passkey are required!", {
        position: "top-right",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!", {
        position: "top-right",
      });
      return;
    }

    if (!validatePassKey(passKey)) {
      toast.error("Passkey must be at least 6 characters long!", {
        position: "top-right",
      });
      return;
    }

    try {
      const { data: tellerData, error: tellerError } = await supabase
        .from("tellers")
        .select("id, email, passKey")
        .eq("email", email)
        .single();

      if (tellerError) {
        console.error("Teller error:", tellerError);
        throw new Error("Invalid Credentials!");
      }

      if (tellerData && tellerData.passKey === passKey) {
        toast.success("Login successful!", {
          position: "top-right",
        });
        localStorage.setItem("tellerId", tellerData.id);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        throw new Error("Invalid email or passKey!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message, {
        position: "top-right",
      });
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
          >
            SUBMIT
          </button>
        </form>
        <ToastContainer />
      </div>
    </main>
  );
}
