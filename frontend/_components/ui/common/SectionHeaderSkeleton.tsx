import type { LucideIcon } from "lucide-react";

import { Skeleton } from "@/_components/ui/skeleton";

interface SectionHeaderSkeletonProps {
    icon: LucideIcon;
}

export function SectionHeaderSkeleton({
    icon: Icon,
}: SectionHeaderSkeletonProps) {
    return (
        <div className="flex items-center gap-4">
            {/* ICON */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-teal-700/10">
                <Icon className="h-6 w-6 animate-pulse text-teal-700/40" />
            </div>

            {/* TITLE */}
            <div className="space-y-2">
                <Skeleton className="h-7 w-32 rounded-sm" />
                <Skeleton className="h-4 w-52 rounded-sm" />
            </div>
        </div>
    );
}
