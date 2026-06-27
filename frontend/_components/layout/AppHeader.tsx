"use client";

import { Menu, Bell } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebarStore } from "@/_stores/sidebar";
import Breadcrumb from "./Breadcrumb";
import UserDropdown from "./UserDropdown";

export default function AppHeader() {
    const setIsOpen = useSidebarStore((state) => state.setIsOpen);

    return (
        <header className="h-20 sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 z-30 transition-all duration-300">
            {/* Left side */}
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className="mr-4 lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </Button>
                
                <Breadcrumb />
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer group">
                    <Button variant="ghost" size="icon" className="relative w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:border-teal-300 transition-colors">
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        <Bell className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" />
                    </Button>
                </div>

                <div className="pl-6 border-l border-gray-200">
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}
