"use client";

import { useState } from "react";
import {
    LayoutGrid,
    List,
} from "lucide-react";

import type { Project } from "@/_lib/services/admin/project.service";
import { ProjectsTable } from "./components/ProjectsTable";
import { ProjectsGrid } from "./components/ProjectsGrid";

interface ProjectsViewProps {
    projects: Project[];
}

export default function ProjectsView({projects}: ProjectsViewProps) {
    const [view, setView] = useState<"table" | "grid">("table");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Projects
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Manage projects for your agency.
                    </p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center rounded-lg border p-1">
                    <button
                        type="button"
                        onClick={() => setView("table")}
                        className={`rounded-md p-2 ${view === "table"
                                ? "bg-muted"
                                : "text-muted-foreground"
                            }`}
                    >
                        <List className="size-4" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setView("grid")}
                        className={`rounded-md p-2 ${view === "grid"
                                ? "bg-muted"
                                : "text-muted-foreground"
                            }`}
                    >
                        <LayoutGrid className="size-4" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {view === "table" ? (
                <ProjectsTable projects={projects} />
            ) : (
                <ProjectsGrid projects={projects} />
            )}
        </div>
    );
}
