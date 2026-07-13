import React from "react";
import Image from "next/image";

interface SidebarHeaderProps {
    isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
    return (
        <div className="h-16 flex items-center px-6 shrink-0 mt-2">
            <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "space-x-3"} transition-all overflow-hidden`}>
                <div className="relative w-8 h-8 rounded-lg flex items-center justify-center shadow-sm shrink-0 overflow-hidden">
                    <Image src="/1.png" alt="Sevior Logo" fill className="object-cover" />
                </div>
                {!isCollapsed && (
                    <div className="animate-in fade-in zoom-in duration-300">
                        <h1 className="text-lg font-bold text-gray-900 tracking-tight">Sevior</h1>
                    </div>
                )}
            </div>
        </div>
    );
}
