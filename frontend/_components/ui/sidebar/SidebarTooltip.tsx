import React from "react";

interface SidebarTooltipProps {
    children: React.ReactNode;
    label: string;
    isCollapsed: boolean;
}

export function SidebarTooltip({ children, label, isCollapsed }: SidebarTooltipProps) {
    if (!isCollapsed) return <>{children}</>;

    return (
        <div className="group/tooltip relative flex items-center justify-center">
            {children}
            <div className="absolute left-full ml-3 hidden group-hover/tooltip:block z-50">
                <div className="bg-gray-900 text-white text-xs font-medium px-2.5 py-1.5 rounded-md shadow-lg whitespace-nowrap">
                    {label}
                </div>
            </div>
        </div>
    );
}
