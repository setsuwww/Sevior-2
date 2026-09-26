// SSR Component, fetch data only

import { fetchProjects } from "@/_lib/services/admin/project.service";
import ProjectsView from "./page-client";

export default async function ProjectsPage() {
    const projects = await fetchProjects();

    return <ProjectsView projects={projects} />;
}
