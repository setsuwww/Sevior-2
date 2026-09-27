import { Eye, Pencil, Trash2, Users } from "lucide-react";
import { TableBody, TableCell, TableRow } from "@/_components/ui/table";

import { Button } from "@/_components/ui/button";

import { formatDate } from "@/_lib/helpers/date-formatter";

import { Project } from "@/types/project";

interface ProjectsTableBodyProps {
    projects: Project[];

    handleOpenDetail: (project: Project) => void;
    handleOpenEdit: (project: Project) => void;
    handleOpenAssignDevelopers: (project: Project) => void;
    handleOpenDelete: (project: Project) => void;
}

export function ProjectsTableBody({
    projects,
    handleOpenDetail,
    handleOpenEdit,
    handleOpenAssignDevelopers,
    handleOpenDelete,
}: ProjectsTableBodyProps) {

    if (projects.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="px-4 py-12 text-center"
                    >
                        <p className="text-sm text-muted-foreground">
                            No projects found.
                        </p>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {projects.map((project) => (
                <TableRow key={project.id}>

                    {/* PROJECT */}
                    <TableCell className="px-4 py-4">
                        <div className="min-w-0">
                            <p className="font-medium">
                                {project.title}
                            </p>

                            <p className="max-w-md truncate text-sm text-muted-foreground">
                                {project.description || "-"}
                            </p>
                        </div>
                    </TableCell>

                    {/* PHASE */}
                    <TableCell className="px-4 py-4 text-sm">
                        {project.currentPhase || "-"}
                    </TableCell>

                    {/* PROGRESS */}
                    <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary transition-all"
                                    style={{
                                        width: `${Math.min(
                                            Math.max(project.progress ?? 0, 0),
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>

                            <span className="text-sm text-muted-foreground">
                                {project.progress ?? 0}%
                            </span>
                        </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="px-4 py-4">
                        <span className="text-sm">
                            {project.status || "-"}
                        </span>
                    </TableCell>

                    {/* START DATE */}
                    <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                        {formatDate(project.startDate)}
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell className="px-4 py-4">
                        <div className="flex justify-end gap-2">

                            {/* DETAIL */}
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    handleOpenDetail(project)
                                }
                                className="gap-1.5 text-xs font-semibold"
                            >
                                <Eye className="h-3.5 w-3.5" />
                                Detail
                            </Button>

                            {/* EDIT */}
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    handleOpenEdit(project)
                                }
                                className="gap-1.5 text-xs font-semibold"
                            >
                                <Pencil className="h-3.5 w-3.5" />
                                Edit
                            </Button>

                            {/* ASSIGN DEVELOPERS */}
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                    handleOpenAssignDevelopers(project)
                                }
                                className="gap-1.5 text-xs font-semibold"
                            >
                                <Users className="h-3.5 w-3.5" />
                                Developers
                            </Button>

                            {/* DELETE */}
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    handleOpenDelete(project)
                                }
                                className="gap-1.5 text-xs font-semibold"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete
                            </Button>

                        </div>
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}
