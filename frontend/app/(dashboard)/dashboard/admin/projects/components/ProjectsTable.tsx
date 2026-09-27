import { Table } from "@/_components/ui/table";

import { ProjectsTableHeader } from "./ProjectsTableHeader";
import { ProjectsTableBody } from "./ProjectsTableBody";

import type { Project } from "@/_lib/services/admin/project.service";

interface ProjectsTableProps {
    projects: Project[];

    handleOpenDetail: (project: Project) => void;
    handleOpenEdit: (project: Project) => void;
    handleOpenAssignDevelopers: (project: Project) => void;
    handleOpenDelete: (project: Project) => void;
}

export function ProjectsTable({
    projects,
    handleOpenDetail,
    handleOpenEdit,
    handleOpenAssignDevelopers,
    handleOpenDelete,
}: ProjectsTableProps) {
    return (
        <Table>
            <ProjectsTableHeader />

            <ProjectsTableBody
                projects={projects}
                handleOpenDetail={handleOpenDetail}
                handleOpenEdit={handleOpenEdit}
                handleOpenAssignDevelopers={handleOpenAssignDevelopers}
                handleOpenDelete={handleOpenDelete}
            />
        </Table>
    );
}
