"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "@/types/Auth";
import { authService, setAccessToken } from "@/services/auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: UserAuth | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: UserAuth) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        console.log("[AUTH] Starting session restore...");

        console.log("[AUTH] Calling /auth/refresh...");
        const { accessToken } = await authService.refresh();

        console.log("[AUTH] Refresh success:", accessToken ? "TOKEN RECEIVED" : "NO TOKEN");

        setAccessToken(accessToken);

        console.log("[AUTH] Calling /auth/me...");
        const { user: userData } = await authService.getMe();

        console.log("[AUTH] /auth/me success:", userData);

        setUser(userData);
      } catch (error) {
        console.error("[AUTH] Session restore failed:", error);

        setAccessToken(null);
        setUser(null);
      } finally {
        console.log("[AUTH] Session restore finished");
        setIsLoading(false);
      }
    };

    restoreSession();

    const handleLogoutEvent = () => {
      setUser(null);
      setAccessToken(null);
      router.push("/login");
    };

    window.addEventListener("auth:logout", handleLogoutEvent);

    return () => {
      window.removeEventListener("auth:logout", handleLogoutEvent);
    };
  }, [router]);

  const login = (token: string, userData: UserAuth) => {
    setAccessToken(token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setAccessToken(null);
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium">Restoring session...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
