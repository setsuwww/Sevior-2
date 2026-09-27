"use client";

import type { Project, ProjectRequest } from "@/types/project";

import { ProjectsGrid } from "./components/ProjectsGrid";
import { ProjectsFilterSearch } from "./components/ProjectsFilterSearch";

interface ProjectsPageClientProps {
    requests: ProjectRequest[];
    history: ProjectRequest[];
    projects: Project[];
}

export default function ProjectsPageClient({
    requests,
    history,
    projects,
}: ProjectsPageClientProps) {
    return (
        <main className="space-y-8">
            <section>
                <ProjectsFilterSearch />

                <ProjectsGrid projects={projects} />
            </section>

            {/* Nanti bisa ditambah */}
            {/* <RequestsSection requests={requests} history={history} /> */}
        </main>
    );
}
