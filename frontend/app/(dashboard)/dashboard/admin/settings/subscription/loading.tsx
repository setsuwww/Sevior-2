import { SectionHeaderSkeleton } from "@/_components/ui/common/SectionHeaderSkeleton";
import { Skeleton } from "@/_components/ui/skeleton";
import { CalendarHeart } from "lucide-react";

export default function Loading() {
    return (
        <div className="p-6">
            <div className="animate-pulse space-y-6">
                <div className="mb-6 flex items-center justify-between">
                    <SectionHeaderSkeleton icon={CalendarHeart} />

                    {/* ADD BUTTON */}
                    <Skeleton className="h-10 w-36 rounded-sm" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="h-32 rounded-sm bg-gray-200" />
                    <div className="h-32 rounded-sm bg-gray-200" />
                    <div className="h-32 rounded-sm bg-gray-200" />
                </div>

                <div className="h-72 rounded-sm bg-gray-200" />
                <div className="h-80 rounded-sm bg-gray-200" />
            </div>
        </div>
    )
}
