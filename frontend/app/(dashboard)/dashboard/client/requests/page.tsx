import React from "react";
import { MOCK_PROJECT_REQUESTS } from "@/_constants/client-marketplace.mock";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/_components/ui/button";
import Link from "next/link";

export default function MyRequests() {
    const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(val);

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Requests</h1>
                        <p className="text-slate-500">Track and manage your project requests and proposals.</p>
                    </div>
                    <Link href="/dashboard/client/agencies">
                        <Button className="bg-slate-900 hover:bg-slate-800 text-white h-11 px-6 shadow-sm">
                            Browse Agencies <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>

                <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search requests..." className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500" />
                        </div>
                        <Button variant="outline" className="h-9 px-4 border-slate-200 text-slate-600 shrink-0">
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                    </div>
                    
                    <div className="divide-y divide-slate-100">
                        {MOCK_PROJECT_REQUESTS.map(req => (
                            <div key={req.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition-colors group">
                                <div className="mb-4 sm:mb-0">
                                    <div className="flex items-center space-x-3 mb-1">
                                        <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">{req.title}</h3>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            req.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            req.status === 'Accepted' ? 'bg-emerald-100 text-emerald-700' :
                                            'bg-rose-100 text-rose-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500">Sent to <span className="font-semibold text-slate-700">{req.agencyName}</span> on {req.date}</p>
                                </div>
                                
                                <div className="flex items-center space-x-6">
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 font-medium mb-0.5">Budget Range</p>
                                        <p className="text-sm font-bold text-slate-900">{formatCurrency(req.budgetMin)} - {formatCurrency(req.budgetMax)}</p>
                                    </div>
                                    <Button variant="outline" className="border-slate-200 text-slate-700 shadow-sm h-9">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
