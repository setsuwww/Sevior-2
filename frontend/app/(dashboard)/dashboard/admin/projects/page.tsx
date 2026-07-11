"use client";

import React from "react";
import { Header } from "./components/Header";
import { ProjectCard } from "./components/ProjectCard";
import { EmptyState } from "./components/EmptyState";
import { useProjects } from "./hooks/useProjects";
import { MOCK_PROJECTS } from "../../../../../_constants/admin-project.mock";

export default function AdminProjectsPage() {
    const {
        projects,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        stats
    } = useProjects(MOCK_PROJECTS);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
                <Header
                    stats={stats}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}

                <div className="pb-10"></div>
            </div>
        </div>
    );
}
