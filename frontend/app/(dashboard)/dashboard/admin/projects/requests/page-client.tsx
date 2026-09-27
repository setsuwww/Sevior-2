"use client";

import { useState } from "react";
import { Folders} from "lucide-react";

import { SectionHeader } from "@/_components/ui/common/SectionHeader";

import type { ProjectRequest } from "@/types/project";
import { ProjectRequestTable } from "./components/ProjectRequestTable";
import { ProjectsRequestGrid } from "./components/ProjectRequestGrid";
import { ProjectRequestDetail } from "./components/modal/ProjectRequestDetail";

interface ProjectRequestViewProps {
    requests : ProjectRequest[];
}

export default function ProjectRequestView({ requests }: ProjectRequestViewProps) {
    const [view, setView] = useState<"table" | "grid">("table")
    const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);

    const [detailOpen, setDetailOpen] = useState(false);

    const handleOpenDetail = (request: ProjectRequest) => {
        setSelectedRequest(request);
        setDetailOpen(true);
    };

    const handleStatusChange = (request: ProjectRequest, status: "APPROVED" | "REJECTED") => {
        console.log("Status:", status, request);
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <SectionHeader
                    icon={Folders}
                    title="Project Request"
                    description="Manage agency Project request, and assigns task for Developers."
                />
            </div>

            {/* Content */}
            {view === "table" ? (
                <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                    <ProjectRequestTable
                        requests={requests}
                        handleOpenDetail={handleOpenDetail}
                        handleStatusChange={handleStatusChange}
                    />
                </div>
            ) : (
                <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                    <ProjectsRequestGrid requests={requests} />
                </div>
            )}
            {selectedRequest && (
                <ProjectRequestDetail
                    request={selectedRequest}
                    open={detailOpen}
                    onOpenChange={setDetailOpen}
                />
            )}
        </div>
    );
}
