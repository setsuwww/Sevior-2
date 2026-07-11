import React from "react";
import { NavSectionType, NavItemType } from "./types";
import { SidebarSection } from "./SidebarSection";
import { SidebarItem } from "./SidebarItem";
import { SidebarParentItem } from "./SidebarParentItem";

interface NavigationMenuProps {
    links: (NavSectionType | NavItemType)[];
    isCollapsed: boolean;
}

export function NavigationMenu({ links, isCollapsed }: NavigationMenuProps) {
    return (
        <nav className="flex-1 overflow-y-auto scrollbar-hide py-4 px-3 space-y-1">
            {links.map((item, index) => {
                // Determine if it's a Section (has 'items')
                if ('items' in item) {
                    return (
                        <SidebarSection 
                            key={`section-${index}`} 
                            data={item} 
                            isCollapsed={isCollapsed} 
                        />
                    );
                }

                // Or just a regular top-level item (e.g. standard format without sections)
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
        </nav>
    );
}
