import { LucideIcon } from "lucide-react";

export interface NavItemType {
    title: string;
    href?: string;
    icon?: LucideIcon;
    children?: NavItemType[];
}

export interface NavSectionType {
    section?: string;
    items: NavItemType[];
}

export interface SidebarState {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}
