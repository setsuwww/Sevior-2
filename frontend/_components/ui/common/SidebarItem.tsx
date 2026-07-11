"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import { useSidebarStore } from "@/_stores/sidebar";

interface SidebarItemProps {
    title: string;
    href: string;
    icon?: LucideIcon;
    isNested?: boolean;
}

export default function SidebarItem({ title, href, icon: Icon, isNested }: SidebarItemProps) {
    const pathname = usePathname();
    const setIsOpen = useSidebarStore((state) => state.setIsOpen);

    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href + "/") && !isNested);

    return (
        <Link
            href={href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                isActive
                    ? "text-teal-700 bg-teal-50 font-semibold"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium"
            } ${isNested ? "text-sm py-2 px-3 my-1" : ""}`}
        >
            {isActive && !isNested && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-600 rounded-r-full shadow-sm"></div>
            )}
            {Icon && (
                <Icon
                    className={`w-5 h-5 transition-colors ${
                        isActive ? "text-teal-600" : "text-gray-400 group-hover:text-gray-600"
                    }`}
                />
            )}
            <span className={isNested ? "text-sm" : "text-sm"}>{title}</span>
        </Link>
    );
}
