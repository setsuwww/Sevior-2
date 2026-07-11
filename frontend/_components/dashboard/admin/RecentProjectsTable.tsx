import React from "react";
import { MOCK_RECENT_PROJECTS } from "@/_constants/dashboard.mock";
import { StatusBadge } from "./StatusBadge";
import { ProgressIndicator } from "./ProgressIndicator";
import { SectionHeader } from "./SectionHeader";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function RecentProjectsTable() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200/60 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
            <SectionHeader 
                title="Recent Projects" 
                action={
                    <Link href="/dashboard/admin/projects" className="text-sm font-medium text-teal-600 hover:text-teal-700 flex items-center">
                        View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                }
            />
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead>
                        <tr className="border-b border-gray-100 text-gray-500">
                            <th className="pb-3 font-medium">Project</th>
                            <th className="pb-3 font-medium">Client</th>
                            <th className="pb-3 font-medium">Developer</th>
                            <th className="pb-3 font-medium">Deadline</th>
                            <th className="pb-3 font-medium">Status</th>
                            <th className="pb-3 font-medium text-right">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {MOCK_RECENT_PROJECTS.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="py-4">
                                    <p className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{project.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{project.id}</p>
                                </td>
                                <td className="py-4 text-gray-600">{project.client}</td>
                                <td className="py-4 text-gray-600">{project.developer}</td>
                                <td className="py-4 text-gray-600">{project.deadline}</td>
                                <td className="py-4"><StatusBadge status={project.status} /></td>
                                <td className="py-4 flex justify-end"><ProgressIndicator progress={project.progress} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
