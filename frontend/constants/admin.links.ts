import {
    LayoutDashboard,
    Users,
    FolderKanban,
    Settings,
} from "lucide-react";

export const adminLinks = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/admin/dashboard"
    },
    {
        title: "Users",
        icon: Users,
        children: [
            {
                title: "Developers",
                href: "/admin/users/developers"
            },
            {
                title: "Clients",
                href: "/admin/users/clients"
            }
        ]
    },
    {
        title: "Projects",
        icon: FolderKanban,
        href: "/admin/projects"
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/admin/settings"
    }
];
