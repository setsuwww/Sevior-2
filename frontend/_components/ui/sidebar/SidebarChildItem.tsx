"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/_stores/sidebar";
import { NavItemType } from "./types";

export function SidebarChildItem({ title, href, icon: Icon }: NavItemType) {
    const pathname = usePathname();
    const setIsOpen = useSidebarStore((state) => state.setIsOpen);

    const isActive = href ? pathname === href : false;

    return (
        <Link
            href={href || "#"}
            onClick={() => {
                if (window.innerWidth < 1024) setIsOpen(false);
            }}
            className={`flex items-center rounded-md transition-colors relative group h-9 px-3 pl-3 ${isActive
                ? "bg-teal-50/40 text-teal-700 font-medium"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-normal"
                }`}
        >
            {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-teal-500 rounded-r-full"></div>
            )}

            {Icon ? (
                <Icon
                    className={`w-4.5 h-4.5 mr-2.5 shrink-0 ${isActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-500"
                        }`}
                />
            ) : (
                <div className={`w-1.5 h-1.5 rounded-full mr-3 shrink-0 ${isActive ? "bg-teal-500" : "bg-gray-300 group-hover:bg-gray-400"}`} />
            )}

            <span className="text-sm truncate">
                {title}
            </span>
        </Link>
    );
}
