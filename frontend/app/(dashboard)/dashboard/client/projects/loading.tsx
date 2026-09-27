export default function LoadingProject() {
    return (
        <main className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <div className="h-7 w-40 animate-pulse rounded-md bg-muted" />
                <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-card p-6"
                    >
                        <div className="space-y-5">
                            {/* Title */}
                            <div className="flex items-center gap-3">
                                <div className="size-10 animate-pulse rounded-lg bg-muted" />

                                <div className="space-y-2">
                                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                                <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                                    <div className="h-3 w-8 animate-pulse rounded bg-muted" />
                                </div>

                                <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="h-16 animate-pulse rounded-lg bg-muted/60" />
                                <div className="h-16 animate-pulse rounded-lg bg-muted/60" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
