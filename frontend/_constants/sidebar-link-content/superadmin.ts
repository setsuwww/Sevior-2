import { Home, SquarePen, User, Mail, Settings, StickyNote, File } from "lucide-react";

export const superadminLink = [
    {
        link: "/dashboard/superadmin",
        label: "Dashboard",
        icon: Home
    },
    {
        link: "/dashboard/superadmin/projects",
        label: "Projects",
        icon: SquarePen
    },
    {
        link: "/dashboard/superadmin/tasks",
        label: "Tasks",
        icon: StickyNote
    },
    {
        label: "Users",
        collapsible: "Users",
        child: [
            {
                link: "/dashboard/superadmin/users/clients",
                label: "Clients",
            },
            {
                link: "/dashboard/superadmin/users/developers",
                label: "Developers",
            },
            {
                link: "/dashboard/superadmin/users/agencies",
                label: "Agencies",
            },
            {
                link: "/dashboard/superadmin/users/superadmins",
                label: "Superadmins",
            }
        ],
        icon: User
    },
    {
        link: "/dashboard/superadmin/notifications",
        label: "Notifications",
        icon: Mail
    },
    {
        link: "/dashboard/superadmin/reports",
        label: "Reports",
        icon: File
    },
    {
        label: "Settings",
        collapsible: "Settings",
        child: [
            {
                link: "/dashboard/superadmin/settings/general",
                label: "General",
            },
            {
                link: "/dashboard/superadmin/settings/profile",
                label: "Profile",
            },
            {
                link: "/dashboard/superadmin/settings/security",
                label: "Security",
            },
            {
                link: "/dashboard/superadmin/settings/subscription",
                label: "Subscription",
            }
        ],
        icon: Settings
    }
]
