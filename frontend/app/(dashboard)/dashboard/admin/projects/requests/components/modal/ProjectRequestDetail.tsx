import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/_components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";

import { Badge } from "@/_components/ui/badge";

import { ProjectRequest } from "@/types/project";
import { Calendar, DollarSign, FolderArchive, Paperclip, TagIcon } from "lucide-react";
import { PROJECT_STATUS_COLORS } from "@/_constants/theme/project";

interface ProjectRequestDetailProps {
    request: ProjectRequest | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProjectRequestDetail({
    request,
    open,
    onOpenChange,
}: ProjectRequestDetailProps) {
    if (!request) {
        return null;
    }

    const clientInitial = request.clientName?.charAt(0)?.toUpperCase() || "C";

    const formatCurrency = (value: number | null) => {
        if (value == null) {
            return "-";
        }

        return `Rp ${value.toLocaleString("id-ID")}`;
    };

    const formatDateTime = (value: string | null) => {
        if (!value) {
            return "-";
        }

        return new Date(value).toLocaleString("id-ID", {
            dateStyle: "long",
            timeStyle: "short",
        });
    };

    const formatDateOnly = (value: string | null) => {
        if (!value) {
            return "-";
        }

        return new Date(value).toLocaleDateString("id-ID", {
            dateStyle: "long",
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent size="2xl" className="overflow-y-auto p-0">
                {/* HEADER */}
                <DialogHeader className="border-b px-6 py-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                            <DialogTitle className="text-xl font-semibold">
                                Project Request Details
                            </DialogTitle>

                            <DialogDescription className="mt-1">
                                Complete information about this project
                                request.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6 px-6 py-6">
                    {/* CLIENT */}
                    <section className="rounded-xl border bg-muted/30 p-5">
                        <div className="mb-4">
                            <h3 className="font-semibold">
                                Client Information
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Contact information of the client who
                                submitted this request.
                            </p>
                        </div>

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <Avatar className="h-16 w-16">
                                <AvatarImage
                                    src={
                                        request.clientImage ||
                                        undefined
                                    }
                                    alt={request.clientName}
                                />

                                <AvatarFallback className="text-lg bg-teal-600 text-white">
                                    {clientInitial}
                                </AvatarFallback>
                            </Avatar>

                            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <p className="mt-1 font-medium text-primary">
                                        {request.clientName || "-"}
                                    </p>
                                    <p className="mt-1 break-all text-sm text-foreground">
                                        {request.clientEmail || "-"}
                                    </p>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {request.clientPhone || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PROJECT */}
                    <section>
                        <div className="mb-4">
                            <h3 className="font-semibold">
                                Project Information
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Details provided by the client for the
                                requested project.
                            </p>

                            <Badge variant={request.status === "APPROVED"
                                ? "default" : request.status === "REJECTED" ? "destructive"
                                    : "secondary"
                            } className={`rounded-sm mt-3 ${PROJECT_STATUS_COLORS[request.status]}`}
                            >
                                {request.status}
                            </Badge>
                        </div>

                        <div className="space-y-5 rounded-sm border p-5">
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-teal-700 shadow-sm">
                                    <FolderArchive className="h-4 w-4 text-white" />
                                </div>

                                <h2 className="text-lg font-semibold flex items-center">
                                    {request.title || "-"}
                                </h2>
                            </div>

                            <div>
                                <p className="text-[10px] font-medium uppercase tracking-wide text-foreground">
                                    Description
                                </p>

                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 max-w-md text-muted-foreground">
                                    {request.description || "-"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-sky-600 bg-sky-50">
                                        <TagIcon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Category
                                        </p>

                                        <p className="mt-1 text-sm text-sky-600 font-medium">
                                            {request.category || "-"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-lime-600 bg-lime-50">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Budget Minimum
                                        </p>

                                        <p className="mt-1 text-sm text-lime-600 font-medium">
                                            {formatCurrency(
                                                request.budgetMin
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-lime-600 bg-lime-50">
                                        <DollarSign className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Budget Maximal
                                        </p>

                                        <p className="mt-1 text-sm text-lime-600 font-medium">
                                            {formatCurrency(
                                                request.budgetMax
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-5 border-t pt-5 sm:grid-cols-3">
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-red-600 bg-red-50">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Deadline
                                        </p>

                                        <p className="mt-1 text-sm text-red-600 font-medium">
                                            {formatDateOnly(
                                                request.deadline
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-olive-600 bg-olive-50">
                                        <Paperclip className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                            Attachment
                                        </p>

                                        <p className="mt-1 text-sm text-olive-600 font-medium">
                                            {request.attachmentUrl ? (
                                                <a
                                                    href={
                                                        request.attachmentUrl
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 inline-flex text-sm font-medium text-primary hover:underline"
                                                >
                                                    View Attachment
                                                </a>
                                            ) : (
                                                <span className="mt-1 text-sm text-muted-foreground">
                                                    No attachment
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REQUEST INFORMATION */}
                    <section>
                        <div className="mb-4">
                            <h3 className="font-semibold">
                                Request Information
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Metadata and current state of this
                                project request.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 rounded-xl border p-5 sm:grid-cols-3">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Request ID
                                </p>

                                <p className="mt-1 font-mono text-sm">
                                    #{request.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Created At
                                </p>

                                <p className="mt-1 text-sm">
                                    {formatDateTime(
                                        request.createdAt
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Last Updated
                                </p>

                                <p className="mt-1 text-sm">
                                    {formatDateTime(
                                        request.updatedAt
                                    )}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
}
