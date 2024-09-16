// AuthContext.js
"use client";
import React, { createContext, useState, useEffect, useCallback } from "react";
import { Supabase } from "/utils/supabase/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    try {
      const tellerId = getCookie("tellerId");
      if (tellerId) {
        const { data, error } = await Supabase.from("tellers")
          .select("id")
          .eq("id", tellerId)
          .single();

        if (data) {
          setIsAuthenticated(true);
        } else {
          document.cookie =
            "tellerId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const getCookie = (name) => {
    if (typeof document === "undefined") return null; // Check if document is available
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
