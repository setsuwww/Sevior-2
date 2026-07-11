import {
    LayoutDashboard,
    Users,
    Folders,
    Settings,
    UsersRound,
    User,
    DollarSign,
    CodeXml,
    Contact,
} from "lucide-react";

export const adminLinks = [
    {
        section: "WORKSPACE",
        items: [
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard/admin"
            },
            {
                title: "Projects",
                icon: Folders,
                href: "/dashboard/admin/projects"
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
                        icon: CodeXml,
                        title: "Developers",
                        href: "/dashboard/admin/users/developers"
                    },
                    {
                        icon: Contact,
                        title: "Clients",
                        href: "/dashboard/admin/users/clients"
                    }
                ]
            }
        ]
    },
    {
        section: "SETTINGS",
        items: [
            {
                title: "Settings",
                icon: Settings,
                children: [
                    {
                        icon: User,
                        title: "Profile",
                        href: "/dashboard/admin/profile"
                    },
                    {
                        icon: DollarSign,
                        title: "Subscription",
                        href: "/dashboard/admin/subscription"
                    }
                ]
            }
        ]
    },
];
