import React from "react";
import Link from "next/link";
import { Star, ShieldCheck, Users, Briefcase } from "lucide-react";
import { MarketplaceAgency } from "@/_constants/client-marketplace.mock";
import { Button } from "@/_components/ui/button";

interface AgencyCardProps {
    agency: MarketplaceAgency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full group relative overflow-hidden">
            {/* Top Row: Logo & Name */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <span className="text-xl font-black text-slate-700">{agency.logo}</span>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-teal-600 transition-colors">{agency.name}</h3>
                            {agency.isExecutive && (
                                <div className="flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-700 tracking-wider">
                                    <ShieldCheck className="w-3 h-3 mr-1" />
                                    EXECUTIVE
                                </div>
                            )}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-slate-500">
                            <Star className="w-4 h-4 text-amber-400 mr-1 fill-amber-400" />
                            <span className="font-semibold text-slate-700 mr-1">{agency.averageRating}</span>
                            <span>({agency.reviews.length} reviews)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-6 flex-1">
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{agency.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Briefcase className="w-4 h-4 mr-2 text-teal-600" />
                    <span className="font-bold text-slate-900 mr-1">{agency.totalProjects}</span> Projects
                </div>
                <div className="flex items-center text-sm text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="font-bold text-slate-900 mr-1">{agency.totalDevelopers}</span> Devs
                </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Link href={`/dashboard/client/agencies/${agency.id}`}>
                    <Button variant="outline" className="text-teal-700 border-teal-200 hover:bg-teal-50 hover:text-teal-800">
                        View Profile
                    </Button>
                </Link>
            </div>
        </div>
    );
}
