"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, X } from "lucide-react";
import { Button } from "../ui/button";
import SidebarMenu from "./SidebarMenu";
import { useSidebarStore } from "@/_stores/sidebar";
import { useAuthStore } from "@/_stores/auth";

import { superAdminLinks } from "../../constants/superadmin.links";
import { adminLinks } from "../../constants/admin.links";
import { developerLinks } from "../../constants/developer.links";
import { clientLinks } from "../../constants/client.links";

export default function AppSidebar() {
    const { isOpen, setIsOpen } = useSidebarStore();
    const { user } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Avoid hydration mismatch

    let links: any[] = [];
    if (user?.Role === "SUPER_ADMIN") {
        links = superAdminLinks;
    } else if (user?.Role === "ADMIN") {
        links = adminLinks;
    } else if (user?.Role === "DEVELOPER") {
        links = developerLinks;
    } else if (user?.Role === "CLIENT") {
        links = clientLinks;
    }

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm lg:hidden transition-all"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${
                    isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                } flex flex-col`}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-8 border-b border-gray-100 shrink-0">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm">
                            <ShieldAlert className="w-5 h-5 text-teal-600" />
                        </div>
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-900 tracking-tight">Sevior</h1>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto lg:hidden text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Navigation Menu */}
                <SidebarMenu links={links} />
            </aside>
        </>
    );
}
