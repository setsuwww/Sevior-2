"use client";

import React from "react";
import { useAuthStore } from "@/_stores/auth";
import { Bell, Search } from "lucide-react";
import { Button } from "../../ui/button";

export function DashboardHeader() {
    const { user } = useAuthStore();

    // Format date nicely (e.g. "Monday, Oct 24")
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric"
    });

    const isPro = true; // In real app, check user.Plan

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Good Morning, {user?.AgencyName || user?.FullName || "Admin"}
                </h1>
                <p className="text-sm text-gray-500 mt-1">Here is what's happening with your agency today.</p>
            </div>

            <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg mr-2">
                    <Search className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-32 focus:w-48 transition-all duration-300 placeholder:text-gray-400 text-gray-900"
                    />
                </div>

                <div className="hidden sm:flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 shadow-sm">
                    {today}
                </div>

                <div className="flex items-center px-3 py-1.5 bg-gradient-to-tr from-teal-50 to-emerald-50 border border-teal-100 rounded-lg text-sm font-semibold text-teal-700 shadow-sm">
                    {isPro ? "Pro Plan" : "Free Plan"}
                </div>

                <Button variant="outline" size="icon-sm" className="relative bg-white text-gray-600 border-gray-200 hover:bg-gray-50 rounded-lg shadow-sm w-9 h-9">
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border-2 border-white"></span>
                </Button>
            </div>
        </div>
    );
}
