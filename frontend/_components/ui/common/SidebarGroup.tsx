"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarGroupProps {
    title: string;
    icon?: LucideIcon;
    childrenItems: { title: string; href: string }[];
}

export default function SidebarGroup({ title, icon: Icon, childrenItems }: SidebarGroupProps) {
    const pathname = usePathname();
    
    // Check if any child is active
    const hasActiveChild = childrenItems.some(
        (child) => pathname === child.href || pathname.startsWith(child.href + "/")
    );

    const [isOpen, setIsOpen] = useState(hasActiveChild);

    return (
        <div className="space-y-1">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    hasActiveChild || isOpen
                        ? "bg-gray-50 text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
            >
                <div className="flex items-center space-x-3">
                    {Icon && (
                        <Icon
                            className={`w-5 h-5 ${
                                hasActiveChild || isOpen
                                    ? "text-teal-600"
                                    : "text-gray-400 group-hover:text-gray-600"
                            }`}
                        />
                    )}
                    <span className="text-sm">{title}</span>
                </div>
                {isOpen ? (
                    <ChevronDown className={`w-4 h-4 ${hasActiveChild ? "text-teal-600" : "text-gray-400"}`} />
                ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                )}
            </button>

            {isOpen && (
                <div className="border-l-2 border-transparent pl-2 ml-10 pr-4 py-1 space-y-1">
                    {childrenItems.map((child) => (
                        <SidebarItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                            isNested={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
