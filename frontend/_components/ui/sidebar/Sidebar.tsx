"use client";

import React, { useState, useEffect } from "react";
import { useSidebarStore } from "@/_stores/sidebar";
import { SidebarHeader } from "./SidebarHeader";
import { NavigationMenu } from "./NavigationMenu";
import { CollapseButton } from "./CollapseButton";
import { NavSectionType, NavItemType } from "./types";

interface SidebarProps {
    links: (NavSectionType | NavItemType)[];
}

export function Sidebar({ links }: SidebarProps) {
    const { isOpen, setIsOpen } = useSidebarStore();

    // We'll manage collapsed state locally for desktop.
    // By default, it's not collapsed.
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Handle responsive logic if needed
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(false); // Mobile sidebar is never "collapsed", it's either open or hidden
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!mounted) return null;

    // Mobile Overlay
    const mobileOverlay = isOpen && (
        <div
            className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
        />
    );

    return (
        <>
            {mobileOverlay}

            <aside
                className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:inset-auto
                    ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
                    ${isCollapsed ? "w-[72px]" : "w-64"}
                `}
            >
                {/* Desktop Collapse Toggle */}
                <div className="hidden lg:block">
                    <CollapseButton
                        isCollapsed={isCollapsed}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    />
                </div>

                <SidebarHeader isCollapsed={isCollapsed} />
                <NavigationMenu links={links} isCollapsed={isCollapsed} />
            </aside>
        </>
    );
}
