import React from "react";
import { ShieldAlert } from "lucide-react";

interface SidebarHeaderProps {
    isCollapsed: boolean;
}

export function SidebarHeader({ isCollapsed }: SidebarHeaderProps) {
    return (
        <div className="h-16 flex items-center px-6 shrink-0 mt-2">
            <div className={`flex items-center ${isCollapsed ? "justify-center w-full" : "space-x-3"} transition-all overflow-hidden`}>
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100 shadow-sm shrink-0">
                    <ShieldAlert className="w-4 h-4 text-teal-600" />
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
