import {
    LayoutDashboard,
    FolderKanban,
    CheckSquare,
    Settings,
} from "lucide-react";

export const developerLinks = [
    {
        section: "WORKSPACE",
        items: [
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/developer"
            },
            {
                title: "Projects",
                icon: FolderKanban,
                href: "/developer/projects"
            },
            {
                title: "Tasks",
                icon: CheckSquare,
                href: "/developer/tasks"
            }
        ]
    },
    {
        section: "SYSTEM",
        items: [
            {
                title: "Settings",
                icon: Settings,
                href: "/developer/settings"
            }
        ]
    }
];
