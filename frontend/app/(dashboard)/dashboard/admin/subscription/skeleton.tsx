export default function SubscriptionSkeleton() {
    return (
        <div className="p-6">
            <div className="animate-pulse space-y-6">
                <div className="h-8 w-48 rounded-sm bg-olive-200" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="h-32 rounded-sm bg-olive-200" />
                    <div className="h-32 rounded-sm bg-olive-200" />
                    <div className="h-32 rounded-sm bg-olive-200" />
                </div>

                <div className="h-72 rounded-sm bg-olive-200" />
                <div className="h-80 rounded-sm bg-olive-200" />
            </div>
        </div>
    )
}
