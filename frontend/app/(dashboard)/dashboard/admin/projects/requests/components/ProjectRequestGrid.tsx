import { formatDate } from "@/_lib/helpers/date-formatter";

import { ProjectRequest } from "@/types/project";

export function ProjectsRequestGrid({
    requests,
}: {
    requests: ProjectRequest[];
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {requests.map((request) => (
                <div
                    key={request.id}
                    className="rounded-xl border bg-card p-5"
                >
                    <div className="space-y-4">
                        {/* PROJECT */}
                        <div>
                            <h3 className="font-semibold">
                                {request.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {request.description || "-"}
                            </p>
                        </div>

                        {/* CLIENT */}
                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                {request.clientName || "-"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {request.clientEmail || "-"}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {request.clientPhone || "-"}
                            </p>
                        </div>

                        {/* CATEGORY */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Category
                            </span>

                            <span>
                                {request.category || "-"}
                            </span>
                        </div>

                        {/* BUDGET */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Budget
                            </span>

                            <span className="font-medium">
                                {request.budgetMin != null
                                    ? `Rp ${request.budgetMin.toLocaleString(
                                        "id-ID"
                                    )}`
                                    : "-"}
                                {" - "}
                                {request.budgetMax != null
                                    ? `Rp ${request.budgetMax.toLocaleString(
                                        "id-ID"
                                    )}`
                                    : "-"}
                            </span>
                        </div>

                        {/* DEADLINE */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Deadline
                            </span>

                            <span>
                                {formatDate(request.deadline)}
                            </span>
                        </div>

                        {/* STATUS */}
                        <div className="flex items-center justify-between border-t pt-4 text-sm">
                            <span className="text-muted-foreground">
                                Status
                            </span>

                            <span className="font-medium">
                                {request.status}
                            </span>
                        </div>

                        {/* CREATED */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Requested
                            </span>

                            <span>
                                {formatDate(request.createdAt)}
                            </span>
                        </div>

                        <div className="flex justify-end">
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
