import {
    LayoutDashboard,
    FolderKanban,
    Receipt,
    Settings,
    Store,
    Send,
    Star
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
                title: "Agencies",
                icon: Store,
                href: "/dashboard/client/agencies"
            },
            {
                title: "Projects",
                icon: FolderKanban,
                href: "/dashboard/client/projects"
            }
        ]
    },
    {
        section: "COMMUNICATION",
        items: [
            {
                title: "My Requests",
                icon: Send,
                href: "/dashboard/client/requests"
            },
            {
                title: "Reviews",
                icon: Star,
                href: "/dashboard/client/reviews"
            }
        ]
    },
    {
        section: "BILLING",
        items: [
            {
                title: "Invoices",
                icon: Receipt,
                href: "/dashboard/client/invoices"
            }
        ]
    },
    {
        section: "SYSTEM",
        items: [
            {
                title: "Settings",
                icon: Settings,
                href: "/dashboard/client/settings"
            }
        ]
    }
];
