"use client"

import { CalendarDays, CircleDollarSign, FolderKanban} from "lucide-react";

import type { Project } from "@/types/project";

import { Badge } from "@/_components/ui/badge";
import { Card, CardContent, CardHeader } from "@/_components/ui/card";
import { Progress } from "@/_components/ui/progress";

interface ProjectsCardProps {
    project: Project;
}

function formatDate(date: string | null) {
    if (!date) return "-";

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(date));
}

function formatCurrency(value: number | null) {
    if (value === null) return "-";

    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

function getStatusVariant(status: string) {
    switch (status.toUpperCase()) {
        case "ONGOING":
            return "default";

        case "COMPLETED":
            return "secondary";

        case "CANCELLED":
            return "destructive";

        default:
            return "outline";
    }
}

export function ProjectsCard({
    project,
}: ProjectsCardProps) {
    const progress = project.progress ?? 0;

    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <FolderKanban className="size-5 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="truncate font-semibold">
                                {project.title}
                            </h3>

                            <p className="mt-1 text-xs text-muted-foreground">
                                {project.currentPhase || "Project"}
                            </p>
                        </div>
                    </div>

                    <Badge
                        variant={getStatusVariant(project.status)}
                        className="shrink-0"
                    >
                        {project.status}
                    </Badge>
                </div>

                {project.description && (
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                    </p>
                )}
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Progress */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            Progress
                        </span>

                        <span className="font-medium">
                            {progress}%
                        </span>
                    </div>

                    <Progress value={progress} />
                </div>

                {/* Project information */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <CircleDollarSign className="size-3.5" />
                            Budget
                        </div>

                        <p className="truncate text-sm font-medium">
                            {formatCurrency(project.budget)}
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-3">
                        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <CalendarDays className="size-3.5" />
                            Deadline
                        </div>

                        <p className="truncate text-sm font-medium">
                            {formatDate(project.endDate)}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center justify-between border-t pt-4 text-xs text-muted-foreground">
                    <span>
                        Started {formatDate(project.startDate)}
                    </span>

                    <span>
                        Updated {formatDate(project.updatedAt)}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}
