"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { SidebarChildItem } from "./SidebarChildItem";
import { SidebarTooltip } from "./SidebarTooltip";
import { NavItemType } from "./types";

interface SidebarParentItemProps extends NavItemType {
    isCollapsed: boolean;
}

export function SidebarParentItem({ title, icon: Icon, children, isCollapsed }: SidebarParentItemProps) {
    const pathname = usePathname();

    const hasActiveChild = children?.some(
        (child) => child.href && (pathname === child.href || pathname.startsWith(child.href + "/"))
    );

    const [isOpen, setIsOpen] = useState(hasActiveChild || false);

    // Auto close when sidebar collapses
    useEffect(() => {
        if (isCollapsed) {
            setIsOpen(false);
        } else if (hasActiveChild) {
            setIsOpen(true);
        }
    }, [isCollapsed, hasActiveChild]);

    if (isCollapsed) {
        return (
            <div className="relative group/parent">
                <SidebarTooltip label={title} isCollapsed={true}>
                    <button className="w-10 h-10 mx-auto flex items-center justify-center rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                        {Icon && <Icon className={`w-5 h-5 ${hasActiveChild ? "text-teal-600" : "text-gray-400 group-hover/parent:text-gray-600"}`} />}
                    </button>
                </SidebarTooltip>

                {/* Popover menu when collapsed */}
                <div className="absolute left-full top-0 ml-2 hidden group-hover/parent:block z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-xl py-1">
                    <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 mb-1">
                        {title}
                    </div>
                    {children?.map((child) => (
                        <div key={child.title} className="px-1">
                            <SidebarChildItem {...child} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-0.5">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-3 h-10 rounded-md transition-all duration-200 group ${
                    hasActiveChild || isOpen
                        ? "text-gray-900"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
                <div className="flex items-center">
                    {Icon && (
                        <Icon
                            className={`w-5 h-5 mr-3 transition-colors ${
                                hasActiveChild
                                    ? "text-teal-600"
                                    : "text-gray-400 group-hover:text-gray-600"
                            }`}
                        />
                    )}
                    <span className="text-sm font-medium">{title}</span>
                </div>
                <ChevronRight 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} 
                />
            </button>

            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                }`}
            >
                <div className="pl-4 ml-3 border-l border-gray-100 space-y-0.5 py-0.5">
                    {children?.map((child) => (
                        <SidebarChildItem key={child.title} {...child} />
                    ))}
                </div>
            </div>
        </div>
    );
}
