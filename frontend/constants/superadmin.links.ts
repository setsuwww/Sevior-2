import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CreditCard,
    Settings,
} from "lucide-react";

export const superAdminLinks = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/superadmin/dashboard"
    },
    {
        title: "Users",
        icon: Users,
        children: [
            {
                title: "Admins",
                href: "/superadmin/users/admins"
            },
            {
                title: "Developers",
                href: "/superadmin/users/developers"
            },
            {
                title: "Clients",
                href: "/superadmin/users/clients"
            }
        ]
    },
    {
        title: "Agencies",
        icon: FolderKanban,
        href: "/superadmin/agencies"
    },
    {
        title: "Projects",
        icon: FolderKanban,
        href: "/superadmin/projects"
    },
    {
        title: "Payments",
        icon: CreditCard,
        href: "/superadmin/payments"
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/superadmin/settings"
    }
];
