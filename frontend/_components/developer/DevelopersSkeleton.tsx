import { Skeleton } from "@/_components/ui/skeleton";

export function DevelopersStatsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function DevelopersGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                    <div className="flex items-start gap-4 mb-5">
                        <Skeleton className="w-16 h-16 rounded-full" />
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                    </div>
                    <div className="space-y-2 mb-5">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </div>
                    <div className="space-y-3 mb-6">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                        <div className="flex flex-col items-center gap-1">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Skeleton className="h-3 w-12" />
                            <Skeleton className="h-5 w-8" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
