import React from "react";
import { Folder, Plus } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectStatus } from "../types";

interface HeaderProps {
    stats: { active: number; pending: number; completed: number; overdue: number };
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: ProjectStatus | "All";
    setStatusFilter: (status: ProjectStatus | "All") => void;
}

export function Header({ stats, searchQuery, setSearchQuery, statusFilter, setStatusFilter }: HeaderProps) {
    return (
        <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6 mb-8">
            <div>
                <div className="flex items-center space-x-3 mb-1">
                    <div className="w-12 h-12 rounded-sm bg-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                        <Folder className="w-6 h-6 text-teal-50" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects</h1>
                        <p className="text-sm text-slate-500">Manage your agency projects.</p>
                    </div>
                </div>

                {/* Quick Stats Bonus */}
                <div className="flex flex-wrap items-center gap-4 mt-5 pl-1">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Active</span>
                        <span className="text-sm font-bold text-slate-900">{stats.active}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Pending</span>
                        <span className="text-sm font-bold text-slate-900">{stats.pending}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Completed</span>
                        <span className="text-sm font-bold text-slate-900">{stats.completed}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Overdue</span>
                        <span className="text-sm font-bold text-slate-600">{stats.overdue}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white shadow-sm flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                </Button>

                <ProjectFilters
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />
            </div>
        </div>
    );
}
