"use client";

import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <div className="hidden sm:flex items-center space-x-2 text-sm font-medium text-olive-500 ml-4 pl-8 border-l border-olive-200">
            {segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                // Capitalize and format the segment
                const formattedSegment = segment
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                return (
                    <div key={index} className="flex items-center space-x-2">
                        {index > 0 && <ChevronRight className="w-4 h-4 text-olive-400" />}
                        <span className={`${isLast ? "text-olive-900 font-semibold" : "text-olive-500"}`}>
                            {formattedSegment}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
