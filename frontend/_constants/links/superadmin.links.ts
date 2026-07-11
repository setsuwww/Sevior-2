import {
    LayoutDashboard,
    Users,
    FolderKanban,
    CreditCard,
    Settings,
    ShieldCheck,
    Code,
    UsersRound
} from "lucide-react";

export const superAdminLinks = [
    {
        section: "GENERAL",
        items: [
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/superadmin/dashboard"
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
            }
        ]
    },
    {
        section: "PEOPLE",
        items: [
            {
                title: "Users",
                icon: Users,
                children: [
                    {
                        title: "Admins",
                        icon: ShieldCheck,
                        href: "/superadmin/users/admins"
                    },
                    {
                        title: "Developers",
                        icon: Code,
                        href: "/superadmin/users/developers"
                    },
                    {
                        title: "Clients",
                        icon: UsersRound,
                        href: "/superadmin/users/clients"
                    }
                ]
            }
        ]
    },
    {
        section: "FINANCE",
        items: [
            {
                title: "Payments",
                icon: CreditCard,
                href: "/superadmin/payments"
            }
        ]
    },
    {
        section: "SYSTEM",
        items: [
            {
                title: "Settings",
                icon: Settings,
                href: "/superadmin/settings"
            }
        ]
    }
];
