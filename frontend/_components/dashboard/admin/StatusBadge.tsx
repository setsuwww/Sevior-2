import React from "react";

interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    let colorClass = "";
    
    switch (status.toLowerCase()) {
        case "completed":
        case "paid":
        case "active":
            colorClass = "bg-emerald-50 text-emerald-700 border-emerald-100";
            break;
        case "pending":
        case "in progress":
            colorClass = "bg-amber-50 text-amber-700 border-amber-100";
            break;
        case "failed":
        case "cancelled":
        case "overdue":
        case "inactive":
            colorClass = "bg-rose-50 text-rose-700 border-rose-100";
            break;
        default:
            colorClass = "bg-gray-50 text-gray-700 border-gray-200";
    }

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md text-[11px] font-semibold border uppercase tracking-wider ${colorClass}`}>
            {status}
        </span>
    );
}
