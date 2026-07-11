import React from "react";
import Link from "next/link";
import { MARKETPLACE_AGENCIES } from "@/_constants/client-marketplace.mock";
import { TopDeveloperBadge } from "../../_components/TopDeveloperBadge";
import { Button } from "@/_components/ui/button";
import { ShieldCheck, MapPin, Globe, Star, Users, Briefcase, Calendar, ChevronLeft, ExternalLink } from "lucide-react";

export default function AgencyProfile({ params }: { params: { id: string } }) {
    // In a real app, this would be a fetch using the ID. Using mock data here.
    const agency = MARKETPLACE_AGENCIES.find(a => a.id === params.id) || MARKETPLACE_AGENCIES[0];

    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* Banner & Header */}
            <div className="w-full h-48 lg:h-64 bg-gradient-to-tr from-slate-900 via-teal-900 to-slate-800 relative">
                <div className="absolute top-4 left-4 lg:top-8 lg:left-8">
                    <Link href="/dashboard/client/agencies" className="inline-flex items-center text-white/80 hover:text-white font-medium text-sm bg-black/20 hover:bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md transition-all">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Agencies
                    </Link>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 lg:-mt-24 relative z-10">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 lg:p-10">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border-4 border-white shadow-md text-4xl lg:text-5xl font-black text-slate-700">
                                {agency.logo}
                            </div>
                            <div className="pt-2 lg:pt-4">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">{agency.name}</h1>
                                    {agency.isExecutive && (
                                        <div className="flex items-center bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 px-2 py-1 rounded-md text-xs font-bold text-amber-700 tracking-wider shadow-sm">
                                            <ShieldCheck className="w-4 h-4 mr-1.5" />
                                            EXECUTIVE AGENCY
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center text-sm text-slate-500 gap-4 mb-4 font-medium">
                                    <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> San Francisco, CA</span>
                                    <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> {agency.name.toLowerCase().replace(' ', '')}.com</span>
                                </div>
                                <p className="text-slate-600 max-w-2xl leading-relaxed">{agency.description}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-w-[200px]">
                            <Link href={`/dashboard/client/agencies/${agency.id}/request`} className="w-full">
                                <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-base font-semibold shadow-sm">
                                    Hire Agency
                                </Button>
                            </Link>
                            <Button variant="outline" className="w-full bg-white border-slate-200 text-slate-700 h-12">
                                <ExternalLink className="w-4 h-4 mr-2" /> Visit Website
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-10 border-t border-slate-100">
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center text-slate-500 mb-1 text-sm font-semibold"><Star className="w-4 h-4 text-amber-400 mr-2" /> Avg Rating</div>
                            <div className="text-2xl font-black text-slate-900">{agency.averageRating}<span className="text-base text-slate-500 font-medium ml-1">/ 5.0</span></div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center text-slate-500 mb-1 text-sm font-semibold"><Briefcase className="w-4 h-4 text-teal-600 mr-2" /> Total Projects</div>
                            <div className="text-2xl font-black text-slate-900">{agency.totalProjects}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center text-slate-500 mb-1 text-sm font-semibold"><Users className="w-4 h-4 text-blue-600 mr-2" /> Developers</div>
                            <div className="text-2xl font-black text-slate-900">{agency.totalDevelopers}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center text-slate-500 mb-1 text-sm font-semibold"><Calendar className="w-4 h-4 text-purple-600 mr-2" /> Since</div>
                            <div className="text-2xl font-black text-slate-900">{agency.since}</div>
                        </div>
                    </div>
                </div>

                {/* Top Developers Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Top Developers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {agency.topDevelopers.map((dev, idx) => (
                            <TopDeveloperBadge key={dev.id} developer={dev} rank={idx + 1} />
                        ))}
                    </div>
                </div>

                {/* Client Reviews Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">Client Reviews</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {agency.reviews.map(review => (
                            <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-bold text-teal-700 mr-3">
                                            {review.clientAvatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 text-sm">{review.clientName}</div>
                                            <div className="text-xs text-slate-500">{review.clientCompany}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-700 leading-relaxed italic">"{review.text}"</p>
                                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                                    Reviewed on {review.date}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
