import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { MarketplaceDeveloper } from "@/_constants/client-marketplace.mock";

interface TopDeveloperBadgeProps {
    developer: MarketplaceDeveloper;
    rank: number;
}

export function TopDeveloperBadge({ developer, rank }: TopDeveloperBadgeProps) {
    return (
        <div className="flex flex-col items-center p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group relative">
            <div className="absolute top-0 right-0 m-3 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 border border-slate-200">
                #{rank}
            </div>
            
            <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-black text-slate-600 border-4 border-white shadow-sm mb-3">
                {developer.avatar}
            </div>
            
            <h4 className="text-base font-bold text-slate-900 text-center">{developer.name}</h4>
            <p className="text-xs font-medium text-teal-600 mb-3 text-center">{developer.role}</p>
            
            <div className="w-full flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="flex items-center text-xs font-semibold text-slate-700">
                    <Star className="w-3.5 h-3.5 text-amber-400 mr-1 fill-amber-400" />
                    {developer.rating.toFixed(1)}
                </div>
                <div className="flex items-center text-xs font-medium text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
                    {developer.completedProjects} Jobs
                </div>
            </div>
        </div>
    );
}
