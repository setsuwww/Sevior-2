import {
    getMyProjectRequests,
    getMyProjects,
} from "@/_lib/services/client-service/project.server";

import ProjectsPageClient from "./page-client";

export default async function ProjectsPage() {
    const [requests, history, projects] = await Promise.all([
        getMyProjectRequests("pending"),
        getMyProjectRequests("history"),
        getMyProjects(),
    ]);

    return (
        <ProjectsPageClient
            requests={requests}
            history={history}
            projects={projects}
        />
    );
}
