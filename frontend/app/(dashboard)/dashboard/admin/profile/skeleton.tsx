export default function ProfileSkeleton() {
    return (
        <div className="p-6">
            <div className="animate-pulse space-y-6">

                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-olive-200" />

                    <div className="flex-1 space-y-3">
                        <div className="h-7 w-48 rounded-sm bg-olive-200" />
                        <div className="h-4 w-64 rounded-sm bg-olive-200" />
                        <div className="h-4 w-40 rounded-sm bg-olive-200" />
                    </div>

                    <div className="h-10 w-32 rounded-sm bg-olive-200" />
                </div>

                <div className="h-40 rounded-sm bg-olive-200" />

                <div className="h-24 rounded-sm bg-olive-200" />

            </div>
        </div>
    );
}
