"use client";

import { LucideIcon, PlusSquare } from "lucide-react";
import { Button } from "@/_components/ui/button";

interface PageHeaderProps {
    icon: LucideIcon;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export default function PageHeader({
    icon: Icon,
    title,
    description,
    action,
}: PageHeaderProps) {
    return (
        <div className="bg-white border border-gray-300 rounded-xl p-6 flex items-center justify-between">

            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center">
                    <Icon className="text-teal-600" size={22} />
                </div>

                <div>
                    <h1 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-gray-500 mt-1">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {action && (
                <Button
                    onClick={action.onClick}
                    className="bg-teal-600 hover:bg-teal-700 text-white"
                >
                    <PlusSquare />
                    {action.label}
                </Button>
            )}
        </div>
    );
}
