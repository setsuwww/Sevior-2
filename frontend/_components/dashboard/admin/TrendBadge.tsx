import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface TrendBadgeProps {
    value: number;
    showLabel?: boolean;
}

export function TrendBadge({ value, showLabel = false }: TrendBadgeProps) {
    const isPositive = value >= 0;
    
    return (
        <div className={`inline-flex items-center space-x-1 text-xs font-medium px-2 py-0.5 rounded-md ${
            isPositive 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                : "bg-rose-50 text-rose-700 border border-rose-100"
        }`}>
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            <span>{Math.abs(value)}%</span>
            {showLabel && <span className="ml-1 opacity-70">vs last month</span>}
        </div>
    );
}
