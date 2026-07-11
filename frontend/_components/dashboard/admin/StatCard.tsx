import React from "react";
import { LucideIcon } from "lucide-react";
import { TrendBadge } from "./TrendBadge";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: number;
    metrics?: { label: string; value: string | number; colorClass?: string }[];
}

export function StatCard({ title, value, icon: Icon, trend, metrics }: StatCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gray-600" />
                </div>
                {trend !== undefined && <TrendBadge value={trend} />}
            </div>

            <div className="mb-6">
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</h3>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-100">
                {metrics?.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                            {metric.colorClass && (
                                <span className={`w-2 h-2 rounded-full mr-2 ${metric.colorClass}`}></span>
                            )}
                            {metric.label}
                        </span>
                        <span className="font-semibold text-gray-900">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
