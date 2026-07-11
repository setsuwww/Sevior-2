import React from "react";
import { Developer } from "../types";

interface DeveloperStackProps {
    developers: Developer[];
    max?: number;
}

export function DeveloperStack({ developers, max = 4 }: DeveloperStackProps) {
    if (!developers || developers.length === 0) {
        return <span className="text-xs text-gray-400 italic">Unassigned</span>;
    }

    const displayDevs = developers.slice(0, max);
    const extraCount = developers.length - max;

    return (
        <div className="flex items-center group relative">
            <div className="flex items-center -space-x-2">
                {displayDevs.map((dev, idx) => (
                    <div
                        key={dev.id}
                        className="w-9 h-9 rounded-full bg-white border-2 border-white shadow-xs flex items-center justify-center shrink-0 relative z-10 hover:z-20 transition-transform hover:scale-110"
                        style={{ zIndex: 10 - idx }}
                        title={`${dev.name} - ${dev.role}`}
                    >
                        <div className="w-full h-full rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                            {dev.avatar}
                        </div>
                    </div>
                ))}
                {extraCount > 0 && (
                    <div
                        className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white shadow-sm flex items-center justify-center shrink-0 relative z-0 text-[10px] font-bold text-gray-500"
                        title={developers.slice(max).map(d => d.name).join(", ")}
                    >
                        +{extraCount}
                    </div>
                )}
            </div>
        </div>
    );
}
