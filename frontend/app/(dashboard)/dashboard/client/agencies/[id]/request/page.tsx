import React from "react";
import Link from "next/link";
import { MARKETPLACE_AGENCIES } from "@/_constants/client-marketplace.mock";
import { Button } from "@/_components/ui/button";
import { ChevronLeft, Send, UploadCloud } from "lucide-react";

export default function ProjectRequest({ params }: { params: { id: string } }) {
    const agency = MARKETPLACE_AGENCIES.find(a => a.id === params.id) || MARKETPLACE_AGENCIES[0];

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8">
            <div className="max-w-[800px] mx-auto">
                <div className="mb-8 flex items-center">
                    <Link href={`/dashboard/client/agencies/${params.id}`} className="inline-flex items-center text-slate-500 hover:text-slate-900 font-medium text-sm transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Profile
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 px-8 py-6">
                        <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Request Project Proposal</h1>
                        <p className="text-slate-400 text-sm">Send your project requirements to <strong className="text-white">{agency.name}</strong>. They will review and get back to you with a proposal.</p>
                    </div>

                    <div className="p-8">
                        <form className="space-y-6">
                            {/* Title & Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Project Title</label>
                                    <input type="text" placeholder="e.g. E-commerce Mobile App" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Category</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer">
                                        <option value="">Select Category...</option>
                                        <option value="web">Web Application</option>
                                        <option value="mobile">Mobile Application</option>
                                        <option value="uiux">UI/UX Design</option>
                                        <option value="enterprise">Enterprise Software</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900">Project Description</label>
                                <textarea rows={5} placeholder="Describe your project requirements, goals, and any specific features you need..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"></textarea>
                            </div>

                            {/* Budget & Deadline */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Min Budget (USD)</label>
                                    <input type="number" placeholder="5,000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Max Budget (USD)</label>
                                    <input type="number" placeholder="15,000" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-900">Target Deadline</label>
                                    <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all cursor-pointer" />
                                </div>
                            </div>

                            {/* Attachments */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-900">Attachments (Optional)</label>
                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 text-slate-400">
                                        <UploadCloud className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                                    <p className="text-xs text-slate-500 mt-1">PDF, DOCX, or ZIP up to 10MB</p>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                                <Link href={`/dashboard/client/agencies/${params.id}`}>
                                    <Button type="button" variant="outline" className="h-12 px-6 border-slate-200 text-slate-700 bg-white">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit" className="h-12 px-8 bg-teal-600 hover:bg-teal-700 text-white shadow-sm font-semibold">
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Request
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
