"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/_stores/auth";
import { 
    LayoutDashboard, 
    Code, 
    Users, 
    Inbox, 
    Building2, 
    Menu, 
    X,
    LogOut
} from "lucide-react";
import { Button } from "./ui/button";

const SIDEBAR_ITEMS = [
    { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Developers", href: "/dashboard/admin/developers", icon: Code },
    { name: "Clients", href: "/dashboard/admin/clients", icon: Users },
    { name: "Requests", href: "/dashboard/admin/requests", icon: Inbox },
    { name: "Profile", href: "/dashboard/admin/profile", icon: Building2 },
];

export default function AdminSidebarLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const { user, resetAuth } = useAuthStore();

    // Dummy agency name (in real app, this should come from user.Agency.Name)
    const agencyName = "Acme Agency Inc.";

    const handleLogout = () => {
        resetAuth();
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } flex flex-col`}
            >
                {/* Sidebar Header (Logo) */}
                <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">Sevior</span>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-auto lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {SIDEBAR_ITEMS.map((item) => {
                        const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/dashboard/admin");
                        const Icon = item.icon;
                        
                        return (
                            <Link 
                                key={item.name} 
                                href={item.href}
                                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                                    isActive 
                                        ? "bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 font-medium" 
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                                }`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-teal-600 dark:text-teal-400" : "text-gray-400"}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer (Logout) */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10" onClick={handleLogout}>
                        <LogOut className="w-5 h-5 mr-3" />
                        Log out
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                
                {/* Top Header */}
                <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 z-30">
                    <div className="flex items-center">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="mr-2 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="w-5 h-5 text-gray-500" />
                        </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                                {user?.FullName || "Admin"}
                            </p>
                            <p className="text-xs text-teal-600 dark:text-teal-400">
                                {agencyName}
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center border border-teal-200 dark:border-teal-700">
                            <span className="text-teal-700 dark:text-teal-300 font-semibold text-sm">
                                {user?.FullName?.charAt(0) || "A"}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    );
}
