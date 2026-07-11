import React from "react";
import { MOCK_TOP_DEVELOPERS } from "@/_constants/dashboard.mock";
import { SectionHeader } from "./SectionHeader";
import { Star } from "lucide-react";

export function DeveloperLeaderboard() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm col-span-1 lg:col-span-2 flex flex-col">
            <SectionHeader title="Top Performing Developers" />
            
            <div className="space-y-4">
                {MOCK_TOP_DEVELOPERS.map((dev, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center shrink-0 border border-teal-200">
                                {dev.avatar}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{dev.name}</p>
                                <p className="text-xs text-gray-500">{dev.completed} projects completed</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <div className="flex items-center text-sm font-bold text-gray-900">
                                <Star className="w-4 h-4 text-amber-400 mr-1 fill-amber-400" />
                                {dev.rating}
                            </div>
                            <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                dev.workload === 'High' ? 'bg-rose-50 text-rose-600' :
                                dev.workload === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                'bg-emerald-50 text-emerald-600'
                            }`}>
                                {dev.workload} Workload
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
