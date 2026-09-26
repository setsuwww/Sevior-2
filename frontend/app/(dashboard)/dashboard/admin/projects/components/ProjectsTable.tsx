import { formatDate } from "@/_lib/helpers/date-formatter";
import { Project } from "@/_lib/services/admin/project.service";

export function ProjectsTable({projects}: {projects: Project[]}) {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="w-full">
                <thead className="border-b bg-muted/40">
                    <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">
                            Project
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-medium">
                            Phase
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-medium">
                            Progress
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-medium">
                            Status
                        </th>

                        <th className="px-4 py-3 text-left text-sm font-medium">
                            Start Date
                        </th>

                        <th className="px-4 py-3 text-right text-sm font-medium">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) => (
                        <tr
                            key={project.id}
                            className="border-b last:border-0"
                        >
                            <td className="px-4 py-4">
                                <div>
                                    <p className="font-medium">
                                        {project.title}
                                    </p>

                                    <p className="line-clamp-1 text-sm text-muted-foreground">
                                        {project.description}
                                    </p>
                                </div>
                            </td>

                            <td className="px-4 py-4 text-sm">
                                {project.currentPhase}
                            </td>

                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{
                                                width: `${project.progress ?? 0}%`,
                                            }}
                                        />
                                    </div>

                                    <span className="text-sm text-muted-foreground">
                                        {project.progress ?? 0}%
                                    </span>
                                </div>
                            </td>

                            <td className="px-4 py-4">
                                {project.status}
                            </td>

                            <td className="px-4 py-4 text-sm text-muted-foreground">
                                {formatDate(project.startDate)}
                            </td>

                            <td className="px-4 py-4 text-right">
                                {/* TODO: project detail */}
                                <button
                                    type="button"
                                    className="text-sm font-medium hover:underline"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
