import React from "react";
import { MARKETPLACE_AGENCIES } from "@/_constants/client-marketplace.mock";
import { AgencyCard } from "../_components/AgencyCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/_components/ui/button";

export default function BrowseAgencies() {
    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-[1600px] mx-auto p-6 lg:px-8 lg:py-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Browse Agencies</h1>
                        <p className="text-lg text-slate-500">Discover and hire top-tier software development agencies for your next big project.</p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-slate-400" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search by agency name, specialty, or keywords..." 
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-base rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-shadow shadow-sm placeholder:text-slate-400"
                            />
                        </div>
                        <Button variant="outline" className="h-12 px-6 border-slate-200 text-slate-700 bg-white hover:bg-slate-50 shadow-sm rounded-xl">
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
                <div className="mb-6 flex justify-between items-center">
                    <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">{MARKETPLACE_AGENCIES.length} Agencies Found</h2>
                    <select className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer">
                        <option>Sort by: Recommended</option>
                        <option>Sort by: Highest Rated</option>
                        <option>Sort by: Most Projects</option>
                    </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {MARKETPLACE_AGENCIES.map(agency => (
                        <AgencyCard key={agency.id} agency={agency} />
                    ))}
                </div>
                
                <div className="mt-12 flex justify-center pb-12">
                    <Button variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-full px-8">
                        Load More Agencies
                    </Button>
                </div>
            </div>
        </div>
    );
}
