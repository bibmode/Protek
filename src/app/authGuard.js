"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthContext } from "./authContext";

const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading, checkAuthStatus } =
    useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (isClient && !isLoading && !isAuthenticated && pathname !== "/login") {
      router.push("/login");
    }
  }, [isClient, isAuthenticated, isLoading, router, pathname]);

  if (isLoading || !isClient) {
    return (
      <div className="flex gap-2 w-screen h-screen m-auto justify-center items-center bg-amber-400/70">
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
        <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-800"></div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
