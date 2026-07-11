import React from "react";

interface ProgressIndicatorProps {
    progress: number;
}

export function ProgressIndicator({ progress }: ProgressIndicatorProps) {
    let colorClass = "bg-teal-500";
    if (progress === 100) colorClass = "bg-emerald-500";
    else if (progress < 30) colorClass = "bg-rose-500";

    return (
        <div className="flex items-center space-x-3 w-full max-w-[120px]">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full ${colorClass} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                />
            </div>
            <span className="text-xs font-medium text-gray-500 w-8">{progress}%</span>
        </div>
    );
}
