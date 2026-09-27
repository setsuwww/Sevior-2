"use client";

import { useState } from "react";
import { Folders, LayoutGrid, List } from "lucide-react";

import { ButtonGroup } from "@/_components/ui/button-group"

import { Button } from "@/_components/ui/button"

import { ProjectsGrid } from "./components/ProjectsGrid";
import { SectionHeader } from "@/_components/ui/common/SectionHeader";

import { ProjectsTable } from "./components/ProjectsTable";
import { useRouter } from "next/navigation";

import { Project } from "@/types/project";

interface ProjectsViewProps {
    projects: Project[];
    projectCount: number;
}

export default function ProjectsView({ projects, projectCount }: ProjectsViewProps) {
    const [view, setView] = useState<"table" | "grid">("table");
    const router = useRouter()

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <SectionHeader
                    icon={Folders}
                    title="Projects"
                    description="Manage agency Project, and assigns task for Developers."
                />

                {/* View Toggle */}
                <div className="flex items-center justify-between gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push("/dashboard/admin/projects/requests")}>
                        Requested Project
                        {projectCount !== 0 && (
                            <span className="ml-1 inline-flex min-w-4 items-center justify-center rounded-xs bg-red-500 px-1.5 py-0.5 text-xs font-semibold leading-none text-white">
                                {projectCount}
                            </span>
                        )}
                    </Button>

                    <ButtonGroup>
                        <Button
                            type="button"
                            onClick={() => setView("table")}
                            variant="outline"
                            className={`p-2 ${view === "table" ? "bg-muted text-accent-foreground" : "text-muted-foreground"}`}
                        >
                            <List className="size-4" />
                        </Button>

                        <Button
                            type="button"
                            onClick={() => setView("grid")}
                            variant="outline"
                            className={`p-2 ${view === "grid" ? "bg-muted text-accent-foreground" : "text-muted-foreground"}`}
                        >
                            <LayoutGrid className="size-4" />
                        </Button>
                    </ButtonGroup>
                </div>
            </div>

            {/* Content */}
            {view === "table" ? (
                <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                    <ProjectsTable
                        projects={projects}
                        handleOpenDetail={(project) => {
                            console.log("Detail:", project);
                        }}
                        handleOpenEdit={(project) => {
                            console.log("Edit:", project);
                        }}
                        handleOpenAssignDevelopers={(project) => {
                            console.log("Assign developers:", project);
                        }}
                        handleOpenDelete={(project) => {
                            console.log("Delete:", project);
                        }}
                    />
                </div>
            ) : (
                <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                    <ProjectsGrid projects={projects} />
                </div>
            )}
        </div>
    );
}
