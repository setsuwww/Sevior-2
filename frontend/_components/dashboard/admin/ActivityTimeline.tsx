import React from "react";
import { MOCK_RECENT_ACTIVITY } from "@/_constants/dashboard.mock";
import { SectionHeader } from "./SectionHeader";
import { FolderKanban, Receipt, FileText, MessageSquare } from "lucide-react";

export function ActivityTimeline() {
    const getIcon = (type: string) => {
        switch (type) {
            case 'project': return <FolderKanban className="w-4 h-4 text-teal-600" />;
            case 'invoice': return <Receipt className="w-4 h-4 text-emerald-600" />;
            case 'requirement': return <FileText className="w-4 h-4 text-indigo-600" />;
            case 'comment': return <MessageSquare className="w-4 h-4 text-amber-600" />;
            default: return <div className="w-2 h-2 rounded-full bg-gray-400" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'project': return "bg-teal-50 border-teal-100";
            case 'invoice': return "bg-emerald-50 border-emerald-100";
            case 'requirement': return "bg-indigo-50 border-indigo-100";
            case 'comment': return "bg-amber-50 border-amber-100";
            default: return "bg-gray-50 border-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm col-span-1 lg:col-span-2 flex flex-col">
            <SectionHeader title="Recent Client Activity" />
            
            <div className="relative mt-2 pl-2">
                <div className="absolute left-6 top-2 bottom-0 w-px bg-gray-100"></div>
                
                <div className="space-y-6 relative z-10">
                    {MOCK_RECENT_ACTIVITY.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm mr-4 mt-0.5 ${getBgColor(activity.type)}`}>
                                {getIcon(activity.type)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
