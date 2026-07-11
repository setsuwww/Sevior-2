import React from "react";
import { ProjectStatus } from "../types";

interface ProjectStatusBadgeProps {
    status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
    let colorClass = "";
    
    switch (status) {
        case "Completed":
            colorClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
            break;
        case "In Progress":
            colorClass = "bg-blue-50 text-blue-700 border-blue-100";
            break;
        case "Pending":
            colorClass = "bg-amber-50 text-amber-700 border-amber-100";
            break;
        case "Failed":
            colorClass = "bg-rose-50 text-rose-700 border-rose-100";
            break;
        case "Cancelled":
            colorClass = "bg-gray-100 text-gray-700 border-gray-200";
            break;
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border tracking-wide uppercase ${colorClass}`}>
            {status}
        </span>
    );
}
