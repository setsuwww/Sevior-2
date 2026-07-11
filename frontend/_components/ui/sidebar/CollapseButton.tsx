import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollapseButtonProps {
    isCollapsed: boolean;
    onClick: () => void;
}

export function CollapseButton({ isCollapsed, onClick }: CollapseButtonProps) {
    return (
        <button
            onClick={onClick}
            className="absolute -right-3 top-[27px] w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-300 shadow-sm transition-all z-50 focus:outline-none"
        >
            {isCollapsed ? (
                <ChevronRight className="w-3 h-3" />
            ) : (
                <ChevronLeft className="w-3 h-3" />
            )}
        </button>
    );
}
