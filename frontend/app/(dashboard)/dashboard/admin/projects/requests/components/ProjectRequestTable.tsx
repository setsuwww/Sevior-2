import { Table } from "@/_components/ui/table";

import { ProjectRequestTableHeader } from "./ProjectRequestTableHeader";
import { ProjectRequestTableBody } from "./ProjectRequestTableBody";

import { ProjectRequest } from "@/types/project";

interface ProjectRequestTableProps {
    requests: ProjectRequest[];
    handleOpenDetail: (request: ProjectRequest) => void;

    handleStatusChange: (request: ProjectRequest, status: "APPROVED" | "REJECTED") => void;
}

export function ProjectRequestTable({
    requests,
    handleOpenDetail,
    handleStatusChange,
}: ProjectRequestTableProps) {
    return (
        <Table>
            <ProjectRequestTableHeader />

            <ProjectRequestTableBody
                requests={requests}
                handleOpenDetail={handleOpenDetail}
                handleStatusChange={handleStatusChange}
            />
        </Table>
    );
}
