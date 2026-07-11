"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/_stores/sidebar";
import { SidebarTooltip } from "./SidebarTooltip";
import { NavItemType } from "./types";

interface SidebarItemProps extends NavItemType {
    isCollapsed: boolean;
}

export function SidebarItem({ title, href, icon: Icon, isCollapsed }: SidebarItemProps) {
    const pathname = usePathname();
    const setIsOpen = useSidebarStore((state) => state.setIsOpen);

    const isActive = href ? pathname === href || (href !== "/" && pathname.startsWith(href + "/")) : false;

    return (
        <SidebarTooltip label={title} isCollapsed={isCollapsed}>
            <Link
                href={href || "#"}
                onClick={() => {
                    if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={`flex items-center rounded-md transition-colors relative group h-10 ${isCollapsed ? "justify-center w-10 mx-auto" : "px-3"
                    } ${isActive
                        ? "bg-teal-50/50 text-teal-700 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 font-normal"
                    }`}
            >
                {Icon && (
                    <Icon
                        className={`w-5 h-5 shrink-0 ${isCollapsed ? "" : "mr-3"} ${isActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"
                            }`}
                    />
                )}

                {!isCollapsed && (
                    <span className="text-sm truncate font-medium">
                        {title}
                    </span>
                )}
            </Link>
        </SidebarTooltip>
    );
}
