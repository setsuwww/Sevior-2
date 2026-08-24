"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

import { superAdminLinks } from "@/_constants/links/superadmin.links";
import { adminLinks } from "@/_constants/links/admin.links";
import { developerLinks } from "@/_constants/links/developer.links";
import { clientLinks } from "@/_constants/links/client.links";
import { Sidebar } from "../sidebar/Sidebar";

export default function AppSidebar() {
    const { user, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isLoading) return null;

    let links = [];

    if (user?.Role === "SUPER_ADMIN") {
        links = superAdminLinks;
    } else if (user?.Role === "ADMIN") {
        links = adminLinks;
    } else if (user?.Role === "DEVELOPER") {
        links = developerLinks;
    } else if (user?.Role === "CLIENT") {
        links = clientLinks;
    }

    return <Sidebar links={links} />;
}
