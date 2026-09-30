import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";

import { Button } from "@/_components/ui/button";
import { ButtonGroup } from "@/_components/ui/button-group";

import { CircleCheck, CircleX, Eye, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/_components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/_components/ui/table";

import { formatDate } from "@/_lib/helpers/date-formatter";

import { ProjectRequest } from "@/types/project";
import { PROJECT_STATUS_COLORS } from "@/_constants/theme/project";

interface ProjectRequestsTableBodyProps {
    requests: ProjectRequest[];

    handleOpenDetail: (
        request: ProjectRequest
    ) => void;

    handleStatusChange: (
        request: ProjectRequest,
        status: "APPROVED" | "REJECTED"
    ) => void;
}

export function ProjectRequestTableBody({
    requests,
    handleOpenDetail,
    handleStatusChange,
}: ProjectRequestsTableBodyProps) {

    if (requests.length === 0) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell
                        colSpan={6}
                        className="px-4 py-12 text-center"
                    >
                        <p className="text-sm text-muted-foreground">
                            No project requests found.
                        </p>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {requests.map((request) => {
                const clientInitial =
                    request.clientName
                        ?.charAt(0)
                        ?.toUpperCase() || "C";

                return (
                    <TableRow key={request.id}>
                        {/* CLIENT */}
                        <TableCell className="px-4 py-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 shrink-0">
                                    <AvatarImage
                                        src={
                                            request.clientImage ||
                                            undefined
                                        }
                                        alt={request.clientName}
                                    />

                                    <AvatarFallback>
                                        {clientInitial}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="min-w-0 space-y-0.5">
                                    <p className="truncate font-medium">
                                        {request.clientName || "-"}
                                    </p>

                                    <p className="truncate text-xs text-muted-foreground">
                                        {request.clientEmail || "-"}
                                    </p>
                                </div>
                            </div>
                        </TableCell>

                        {/* PROJECT */}
                        <TableCell className="px-4 py-4">
                            <div className="min-w-0 max-w-sm space-y-1">
                                <p className="font-medium">
                                    {request.title || "-"}
                                </p>
                            </div>
                        </TableCell>

                        {/* BUDGET */}
                        <TableCell className="px-4 py-4">
                            <div className="text-sm">
                                {request.budgetMin != null ||
                                    request.budgetMax != null ? (
                                    <>
                                        <p className="font-medium">
                                            {request.budgetMin != null
                                                ? `Rp ${request.budgetMin.toLocaleString(
                                                    "id-ID"
                                                )}`
                                                : "-"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            to{" "}
                                            {request.budgetMax != null
                                                ? `Rp ${request.budgetMax.toLocaleString(
                                                    "id-ID"
                                                )}`
                                                : "-"}
                                        </p>
                                    </>
                                ) : (
                                    <span className="text-muted-foreground">
                                        -
                                    </span>
                                )}
                            </div>
                        </TableCell>

                        {/* DEADLINE */}
                        <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                            {formatDate(request.deadline)}
                        </TableCell>

                        {/* STATUS */}
                        <TableCell className="px-4 py-4">
                            <span
                                className={`inline-flex items-center rounded-sm px-2.5 py-1 text-xs font-medium ${PROJECT_STATUS_COLORS[request.status]}`}
                            >
                                {request.status}
                            </span>
                        </TableCell>

                        {/* ACTIONS */}
                        <TableCell className="px-4 py-4">
                            <div className="flex items-center justify-end gap-2">
                                {/* DETAIL */}
                                <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                        handleOpenDetail(request)
                                    }
                                    className="gap-1.5 text-xs font-semibold"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    Detail
                                </Button>

                                {/* STATUS ACTION */}
                                {request.status === "PENDING" ? (
                                    <ButtonGroup>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    type="button"
                                                    size="sm"
                                                    variant="outline"
                                                    className="px-2 !rounded-l-sm"
                                                    aria-label="Change project request status"
                                                >
                                                    <ChevronDown className="h-3.5 w-3.5" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent align="start" className="w-40">
                                                <DropdownMenuItem onClick={() => handleStatusChange(request, "APPROVED")}>
                                                    <CircleCheck className="h-4 w-4 text-emerald-600" />
                                                    Approved
                                                </DropdownMenuItem>

                                                <DropdownMenuItem onClick={() => handleStatusChange(request, "REJECTED")}>
                                                    <CircleX className="h-4 w-4 text-red-600" />
                                                    Rejected
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            className="text-xs font-semibold"
                                        >
                                            PENDING
                                        </Button>
                                    </ButtonGroup>
                                ) : (
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        disabled
                                        className="text-xs font-semibold"
                                    >
                                        {request.status}
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}
