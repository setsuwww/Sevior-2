import React from "react";
import { NavSectionType } from "./types";
import { SidebarItem } from "./SidebarItem";
import { SidebarParentItem } from "./SidebarParentItem";

interface SidebarSectionProps {
    data: NavSectionType;
    isCollapsed: boolean;
}

export function SidebarSection({ data, isCollapsed }: SidebarSectionProps) {
    return (
        <div className="mb-6 last:mb-0">
            {!isCollapsed && data.section && (
                <div className="px-4 mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {data.section}
                    </span>
                </div>
            )}
            
            {isCollapsed && data.section && (
                <div className="w-6 border-b border-gray-200 mx-auto my-3" />
            )}

            <div className="space-y-1">
                {data.items.map((item) => {
                    if (item.children && item.children.length > 0) {
                        return (
                            <SidebarParentItem
                                key={item.title}
                                {...item}
                                isCollapsed={isCollapsed}
                            />
                        );
                    }
                    return (
                        <SidebarItem
                            key={item.title}
                            {...item}
                            isCollapsed={isCollapsed}
                        />
                    );
                })}
            </div>
        </div>
    );
}
