"use client";

import { LucideIcon } from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";

export interface NavLink {
    title: string;
    href?: string;
    icon?: LucideIcon;
    children?: { title: string; href: string }[];
}

interface SidebarMenuProps {
    links: NavLink[];
}

export default function SidebarMenu({ links }: SidebarMenuProps) {
    return (
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto scrollbar-hide">
            {links.map((link) => {
                if (link.children && link.children.length > 0) {
                    return (
                        <SidebarGroup
                            key={link.title}
                            title={link.title}
                            icon={link.icon}
                            childrenItems={link.children}
                        />
                    );
                }

                return (
                    <SidebarItem
                        key={link.title}
                        title={link.title}
                        href={link.href!}
                        icon={link.icon}
                    />
                );
            })}
        </nav>
    );
}
