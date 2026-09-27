"use client";

import type { Project } from "@/types/project";

import { ProjectsCard } from "./ProjectsCard";
import EmptyProject from "../empty";

interface ProjectsGridProps {
    projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (projects.length === 0) {
        return <EmptyProject />;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <ProjectsCard
                    key={project.id}
                    project={project}
                />
            ))}
        </div>
    );
}
