import { Code2 } from "lucide-react";

import { Skeleton } from "@/_components/ui/skeleton";
import { SectionHeaderSkeleton } from "@/_components/ui/common/SectionHeaderSkeleton";

export default function Loading() {
    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <SectionHeaderSkeleton icon={Code2} />

                <Skeleton className="h-10 w-36 rounded-sm" />
            </div>

            <div className="mb-4 flex items-center justify-between gap-4">
                <Skeleton className="h-10 w-full max-w-md rounded-sm" />

                <Skeleton className="h-4 w-24 rounded-sm" />
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-sm border border-border bg-card">
                {/* TABLE HEADER */}
                <div className="border-b border-border px-6 py-4">
                    <div className="grid grid-cols-5 gap-4">
                        <Skeleton className="h-4 w-24 rounded-sm" />
                        <Skeleton className="h-4 w-28 rounded-sm" />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                        <Skeleton className="h-4 w-16 rounded-sm" />
                        <Skeleton className="ml-auto h-4 w-16 rounded-sm" />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center gap-4 px-6 py-4"
                        >
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28 rounded-sm" />
                                    <Skeleton className="h-3 w-36 rounded-sm" />
                                </div>
                            </div>

                            <Skeleton className="h-4 w-32 rounded-sm" />

                            <Skeleton className="h-4 w-28 rounded-sm" />

                            <Skeleton className="h-6 w-16 rounded-full" />

                            <div className="ml-auto flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-sm" />
                                <Skeleton className="h-8 w-8 rounded-sm" />
                                <Skeleton className="h-8 w-8 rounded-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
