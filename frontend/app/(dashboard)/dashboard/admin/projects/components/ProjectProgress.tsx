interface ProjectProgressProps {
    progress: number;
}

export function ProjectProgress({ progress }: ProjectProgressProps) {
    let colorClass = "bg-amber-500";
    if (progress === 100) colorClass = "bg-emerald-500";
    else if (progress < 30) colorClass = "bg-red-500";

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-gray-500">Current Progress</span>
                <span className="text-xs font-bold text-gray-900">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
