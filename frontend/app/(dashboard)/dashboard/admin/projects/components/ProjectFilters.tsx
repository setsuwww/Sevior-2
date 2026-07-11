import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { ProjectStatus } from "../types";

interface ProjectFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: ProjectStatus | "All";
    setStatusFilter: (status: ProjectStatus | "All") => void;
}

export function ProjectFilters({ searchQuery, setSearchQuery, statusFilter, setStatusFilter }: ProjectFiltersProps) {
    const statuses: (ProjectStatus | "All")[] = ["All", "Pending", "In Progress", "Completed", "Failed", "Cancelled"];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-3 w-full sm:w-auto">
            {/* Status Dropdown */}
            <div className="relative group min-w-[140px]">
                <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "All")}
                    className="w-full appearance-none bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-shadow cursor-pointer shadow-sm hover:bg-gray-50"
                >
                    {statuses.map(s => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 group-hover:text-gray-700">
                    <ChevronDown className="w-4 h-4" />
                </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Projects..." 
                    className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-shadow shadow-sm placeholder:text-gray-400"
                />
            </div>
        </div>
    );
}
