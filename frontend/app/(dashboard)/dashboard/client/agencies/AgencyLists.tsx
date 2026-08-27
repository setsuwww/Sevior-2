"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/_components/ui/button";
import { AgencyCard } from "./AgencyCard";
import { api } from "@/_lib/axiosInstance";

interface Agency {
    ID: number;
    AgencyName: string;
    OwnerName: string;
    Contact: string;
    Email: string;
    Description: string;
    Website: string;
    Location: string;
    ProfileImage: string;
    Status: string;
    SubscriptionPlan: string;
    SubscriptionStatus: string;
}

export default function AgencyLists() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                setLoading(true);

                const response = await api.get("/api/v1/client/agencies");

                setAgencies(response.data.agencies ?? []);
            } catch (error) {
                console.error("Failed to fetch agencies:", error);
                setError("Failed to load agencies.");
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, []);

    return (
        <div className="min-h-screen bg-olive-50/50">
            <div className="bg-white border-b border-olive-200">
                <div className="max-w-[1600px] mx-auto p-6 lg:px-8 lg:py-10">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-black text-olive-900 tracking-tight mb-3">
                            Browse Agencies
                        </h1>

                        <p className="text-lg text-olive-500">
                            Discover and hire top-tier software development
                            agencies for your next big project.
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1 max-w-xl">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-olive-400" />
                            </div>

                            <input
                                type="text"
                                placeholder="Search by agency name, specialty, or keywords..."
                                className="w-full bg-olive-50 border border-olive-200 text-olive-900 text-base rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-shadow shadow-sm placeholder:text-olive-400"
                            />
                        </div>

                        <Button
                            variant="outline"
                            className="h-12 px-6 border-olive-200 text-olive-700 bg-white hover:bg-olive-50 shadow-sm rounded-xl"
                        >
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto p-6 lg:p-8">

                {loading ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto w-8 h-8 border-4 border-olive-200 border-t-teal-500 rounded-full animate-spin" />

                        <p className="mt-4 text-olive-500">
                            Loading agencies...
                        </p>
                    </div>
                ) : error ? (
                    <div className="bg-white border border-red-200 rounded-2xl p-12 text-center">
                        <h3 className="text-xl font-bold text-red-600">
                            Failed to load agencies
                        </h3>

                        <p className="mt-2 text-olive-500">
                            {error}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-between items-center">
                            <h2 className="text-sm font-bold text-olive-500 uppercase tracking-widest">
                                {agencies.length} Agencies Found
                            </h2>

                            <select className="bg-transparent text-sm font-semibold text-olive-700 focus:outline-none cursor-pointer">
                                <option>Sort by: Recommended</option>
                                <option>Sort by: Highest Rated</option>
                                <option>Sort by: Most Projects</option>
                            </select>
                        </div>

                        {agencies.length === 0 ? (
                            <div className="bg-white border border-olive-200 rounded-2xl p-12 text-center">
                                <h3 className="text-xl font-bold text-olive-900">
                                    No agencies found
                                </h3>

                                <p className="mt-2 text-olive-500">
                                    There are currently no active agencies available.
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {agencies.map((agency) => (
                                    <AgencyCard
                                        key={agency.ID}
                                        agency={agency}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
