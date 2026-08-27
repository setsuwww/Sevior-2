"use client";

import { Menu, Bell } from "lucide-react";
import { Button } from "../button";
import { useSidebarStore } from "@/_stores/sidebar";
import Breadcrumb from "../common/Breadcrumb";
import UserDropdown from "../common/UserDropdown";

export default function AppHeader() {
    const setIsOpen = useSidebarStore((state) => state.setIsOpen);

    return (
        <header className="h-20 sticky top-0 bg-white/80 backdrop-blur-xl border-b border-olive-300 flex items-center justify-between px-6 z-30 transition-all duration-300">
            {/* Left side */}
            <div className="flex items-center">
                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="mr-2 text-olive-500 hover:text-olive-900 hover:bg-olive-100"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="w-5 h-5" />
                </Button>

                <Breadcrumb />
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer group">
                    <Button variant="ghost" size="icon" className="relative w-10 h-10 rounded-full bg-olive-50 border border-olive-200 flex items-center justify-center group-hover:border-olive-300 transition-colors">
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                        <Bell className="w-5 h-5 text-olive-600 group-hover:text-teal-600 transition-colors" />
                    </Button>
                </div>

                <div className="pl-6 border-l border-olive-200">
                    <UserDropdown />
                </div>
            </div>
        </header>
    );
}
