import React from "react";
import { Project } from "../types";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { ProjectProgress } from "./ProjectProgress";
import { DeveloperStack } from "./DeveloperStack";
import { Calendar, Clock, MoreHorizontal } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);
    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getDaysRemaining = (endDateStr: string) => {
        const today = new Date();
        const end = new Date(endDateStr);
        const diffTime = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const daysRemaining = getDaysRemaining(project.endDate);
    const isOverdue = daysRemaining < 0 && project.status !== "Success" && project.status !== "Cancelled" && project.status !== "Failed";

    return (
        <div className="bg-white rounded-sm p-5 border border-gray-400 shadow-xs hover:shadow-sm transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            {/* Top Row: Badges & Budget */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2 items-center">
                        <ProjectStatusBadge status={project.status} />
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-50 border border-gray-100 text-gray-600 uppercase tracking-wider">{project.id}</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Budget</span>
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(project.budget)}</span>
                </div>
            </div>

            {/* Title & Description */}
            <div className="mb-6 flex-1">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-teal-600 transition-colors">{project.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                <div className="mt-3 inline-flex items-center rounded-md text-xs font-semibold text-gray-800">
                    Client : {project.client.name}
                </div>
            </div>

            {/* Progress */}
            <div className="mb-6">
                <ProjectProgress progress={project.progress} />
            </div>

            {/* Dates */}
            <div className="mb-2 pt-4 border-t border-gray-50">
                <div className={`p-3 border rounded-lg flex justify-between items-center ${isOverdue
                        ? 'bg-rose-50 border-rose-200'
                        : daysRemaining <= 7
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-emerald-50 border-emerald-200'
                    }`}>
                    <div className="flex flex-col">
                        <span className={`text-xs font-bold uppercase tracking-widest flex items-center mb-1 ${isOverdue ? 'text-rose-500' : daysRemaining <= 7 ? 'text-amber-600' : 'text-emerald-600'
                            }`}>
                            <Clock className="w-3.5 h-3.5 mr-1.5" /> Deadline
                        </span>
                        <span className={`text-sm font-semibold ${isOverdue ? 'text-rose-700' : daysRemaining <= 7 ? 'text-amber-700' : 'text-emerald-700'
                            }`}>
                            {formatDate(project.startDate)} - {formatDate(project.endDate)}
                        </span>
                    </div>
                    <div className="text-right">
                        <span className={`text-sm font-extrabold ${isOverdue ? 'text-rose-600' : daysRemaining <= 7 ? 'text-amber-600' : 'text-emerald-600'
                            }`}>
                            {isOverdue ? `Overdue ${Math.abs(daysRemaining)} Days` : `${daysRemaining} Days Left`}
                        </span>
                    </div>
                </div>
            </div>

            {/* Footer: Devs & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <DeveloperStack developers={project.developers} max={3} />

                <div className="flex space-x-2">
                    <button className="text-xs font-semibold text-gray-600 hover:text-teal-600 px-3 py-1.5 rounded-md hover:bg-teal-50 transition-colors">
                        View Details
                    </button>
                    <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
