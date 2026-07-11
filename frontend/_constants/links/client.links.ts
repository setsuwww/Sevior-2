import {
    LayoutDashboard,
    FolderKanban,
    Receipt,
    Settings,
} from "lucide-react";

export const clientLinks = [
    {
        section: "WORKSPACE",
        items: [
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/client"
            },
            {
                title: "Projects",
                icon: FolderKanban,
                href: "/client/projects"
            }
        ]
    },
    {
        section: "BILLING",
        items: [
            {
                title: "Invoices",
                icon: Receipt,
                href: "/client/invoices"
            }
        ]
    },
    {
        section: "SYSTEM",
        items: [
            {
                title: "Settings",
                icon: Settings,
                href: "/client/settings"
            }
        ]
    }
];
