import { Skeleton } from "@/_components/ui/skeleton";
import { Code2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="p-6">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* ICON */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-teal-700/10">
                        <Code2 className="h-6 w-6 animate-pulse text-teal-700/40" />
                    </div>

                    {/* TITLE */}
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-32 rounded-sm" />
                        <Skeleton className="h-4 w-52 rounded-sm" />
                    </div>
                </div>

                {/* ADD BUTTON */}
                <Skeleton className="h-10 w-36 rounded-sm" />
            </div>

            {/* SEARCH */}
            <div className="mb-4 flex items-center justify-between gap-4">
                <Skeleton className="h-10 w-full max-w-md rounded-sm" />

                <Skeleton className="h-4 w-24 rounded-sm" />
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-sm border border-gray-200 bg-white">
                {/* TABLE HEADER */}
                <div className="border-b border-gray-200 px-6 py-4">
                    <div className="grid grid-cols-5 gap-4">
                        <Skeleton className="h-4 w-24 rounded-sm" />
                        <Skeleton className="h-4 w-28 rounded-sm" />
                        <Skeleton className="h-4 w-20 rounded-sm" />
                        <Skeleton className="h-4 w-16 rounded-sm" />
                        <Skeleton className="ml-auto h-4 w-16 rounded-sm" />
                    </div>
                </div>

                {/* TABLE ROWS */}
                <div className="divide-y divide-gray-100">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 items-center gap-4 px-6 py-4"
                        >
                            {/* DEVELOPER */}
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-9 w-9 shrink-0 rounded-full" />

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-28 rounded-sm" />
                                    <Skeleton className="h-3 w-36 rounded-sm" />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <Skeleton className="h-4 w-40 rounded-sm" />

                            {/* PHONE */}
                            <Skeleton className="h-4 w-28 rounded-sm" />

                            {/* STATUS */}
                            <Skeleton className="h-6 w-16 rounded-full" />

                            {/* ACTIONS */}
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
