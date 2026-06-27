import {
    LayoutDashboard,
    FolderKanban,
    Receipt,
    Settings,
} from "lucide-react";

export const clientLinks = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/client/dashboard"
    },
    {
        title: "Projects",
        icon: FolderKanban,
        href: "/client/projects"
    },
    {
        title: "Invoices",
        icon: Receipt,
        href: "/client/invoices"
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/client/settings"
    }
];
