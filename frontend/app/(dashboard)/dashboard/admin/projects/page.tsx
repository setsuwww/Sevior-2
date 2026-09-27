// SSR Component, fetch data only

import { fetchProjects } from "@/_lib/services/admin-service/project.server";
import { getPendingProjectRequestCount } from "@/_lib/services/admin-service/project_request.server";
import ProjectsView from "./page-client";

export default async function ProjectsPage() {
    const projects = await fetchProjects();
    const projectsCount = await getPendingProjectRequestCount()

    return <ProjectsView projects={projects} projectCount={projectsCount} />;
}
