import { useState, useMemo } from "react";
import { Project, ProjectStatus } from "../types";

export function useProjects(initialData: Project[]) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<ProjectStatus | "All">("All");

    const filteredProjects = useMemo(() => {
        return initialData.filter((project) => {
            // Filter by status
            if (statusFilter !== "All" && project.status !== statusFilter) {
                return false;
            }

            // Filter by search query (title, client, or developer)
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const matchTitle = project.title.toLowerCase().includes(query);
                const matchClient = project.client.name.toLowerCase().includes(query);
                const matchDeveloper = project.developers.some((dev) => 
                    dev.name.toLowerCase().includes(query)
                );

                if (!matchTitle && !matchClient && !matchDeveloper) {
                    return false;
                }
            }

            return true;
        });
    }, [initialData, searchQuery, statusFilter]);

    // Calculate quick stats
    const stats = useMemo(() => {
        const active = initialData.filter(p => p.status === "In Progress").length;
        const pending = initialData.filter(p => p.status === "Pending").length;
        const completed = initialData.filter(p => p.status === "Completed").length;
        const overdue = initialData.filter(p => {
            if (p.status === "Completed" || p.status === "Cancelled" || p.status === "Failed") return false;
            return new Date(p.endDate).getTime() < new Date().getTime();
        }).length;

        return { active, pending, completed, overdue };
    }, [initialData]);

    return {
        projects: filteredProjects,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        stats
    };
}
