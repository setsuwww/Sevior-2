import { Project } from "@/_lib/services/admin/project.service";

export function ProjectsGrid({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="rounded-xl border bg-card p-5"
                >
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold">
                                {project.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {project.description}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Progress
                                </span>

                                <span className="font-medium">
                                    {project.progress ?? 0}%
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: `${project.progress ?? 0}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Phase
                            </span>

                            <span>
                                {project.currentPhase}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Status
                            </span>

                            <span>
                                {project.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between border-t pt-4">
                            <span className="text-sm text-muted-foreground">
                                {formatDate(project.startDate)}
                            </span>

                            <button
                                type="button"
                                className="text-sm font-medium hover:underline"
                            >
                                View
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
