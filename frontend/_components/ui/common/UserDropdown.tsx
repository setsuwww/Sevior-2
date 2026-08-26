"use client";

import {
    LogOut,
    User as UserIcon,
    Settings,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";
import { API_URL } from "@/_lib/axiosInstance";

export default function UserDropdown() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    const userImage = user?.ProfileImage ? `${API_URL}${user.ProfileImage}` : null;
    const userInitial = user?.FullName?.charAt(0).toUpperCase() || "U";

    return (
        <div className="group relative">
            {/* Trigger Button */}
            <button
                type="button"
                className="flex items-center space-x-3"
            >
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden bg-teal-500 text-white flex items-center justify-center font-bold shadow-xs">
                    {userImage ? (
                        <img
                            src={userImage}
                            alt={user?.FullName || "User"}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span>
                            {userInitial}
                        </span>
                    )}
                </div>

                {/* User Info */}
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                        {user?.FullName || "User"}
                    </p>

                    <p className="text-xs text-gray-500 capitalize">
                        {user?.Role
                            ?.replace("_", " ")
                            .toLowerCase() || "Role"}
                    </p>
                </div>
            </button>

            {/* Dropdown */}
            <div className="absolute -right-1 mt-5 w-58 bg-white border border-gray-200 rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right">

                {/* User Header */}
                <div className="p-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">

                        {/* Bigger Avatar */}
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-teal-500 text-white flex items-center justify-center font-bold shrink-0">
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={user?.FullName || "User"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span>
                                    {userInitial}
                                </span>
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {user?.FullName || "User"}
                            </p>

                            <p className="text-xs text-gray-500 truncate">
                                {user?.Email || ""}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Menu */}
                <div className="p-1">

                    <button
                        type="button"
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-sm transition-colors"
                    >
                        <UserIcon className="w-4 h-4" />
                        <span>Profile</span>
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-lg transition-colors"
                    >
                        <Settings className="w-4 h-4" />
                        <span>Account Settings</span>
                    </button>

                </div>

                {/* Logout */}
                <div className="p-1 border-t border-gray-100">

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm transition-colors font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
