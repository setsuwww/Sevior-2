"use client";

import { LogOut, User as UserIcon, Settings } from "lucide-react";
import { useAuthStore } from "@/_stores/auth";

export default function UserDropdown() {
    const { user, resetAuth } = useAuthStore();

    const handleLogout = () => {
        resetAuth();
        window.location.href = "/login";
    };

    return (
        <div className="group relative">
            {/* Trigger Button */}
            <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 focus:outline-none">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-teal-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-sm">
                    {user?.FullName?.charAt(0) || "U"}
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">{user?.FullName || "User"}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.Role?.replace("_", " ").toLowerCase() || "Role"}</p>
                </div>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right">
                <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.FullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.Email}</p>
                </div>
                <div className="p-2 space-y-1">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-lg transition-colors">
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 rounded-lg transition-colors">
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                    </button>
                </div>
                <div className="p-2 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
