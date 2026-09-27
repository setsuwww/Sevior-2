// SSR Component, fetch data only

import { getProjectRequests } from "@/_lib/services/admin-service/project_request.server";
import ProjectRequestView from "./page-client";

export default async function ProjectsPage() {
    const requests = await getProjectRequests();

    return <ProjectRequestView requests={requests} />;
}
