import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function SectionHeader({
    icon: Icon,
    title,
    description,
}: PageHeaderProps) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-teal-700 shadow-sm">
                <Icon className="h-6 w-6 text-white" />
            </div>

            <div>
                <h1 className="text-2xl font-bold tracking-tight text-olive-600">
                    {title}
                </h1>

                <p className="mt-1 text-sm text-olive-500">
                    {description}
                </p>
            </div>
        </div>
    );
}
