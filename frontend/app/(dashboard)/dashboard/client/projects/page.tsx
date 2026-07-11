import React from "react";
import { MOCK_RECENT_PROJECTS } from "@/_constants/dashboard.mock";
import { FolderKanban, ArrowRight } from "lucide-react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";

export default function ActiveProjects() {
    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Active Projects</h1>
                        <p className="text-slate-500">Track progress of your ongoing agency contracts.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {MOCK_RECENT_PROJECTS.map(project => (
                        <div key={project.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                                        <FolderKanban className="w-6 h-6 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">{project.name}</h3>
                                        <p className="text-sm text-slate-500">Agency: {project.client}</p>
                                    </div>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                                    {project.status}
                                </span>
                            </div>

                            <div className="mb-6 flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-semibold text-slate-700">Progress</span>
                                    <span className="text-sm font-bold text-slate-900">{project.progress}%</span>
                                </div>
                                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <Button variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50 hover:text-teal-800">
                                    View Workspace <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
