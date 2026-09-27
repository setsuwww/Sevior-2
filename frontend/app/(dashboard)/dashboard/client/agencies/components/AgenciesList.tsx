"use client";

import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import { AgencyCard } from "./AgencyCard";
import { api } from "@/_lib/axiosInstance";
import { AgenciesFilterSearch } from "./AgenciesFilterSearch";

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

export default function AgenciesList() {
    const [agencies, setAgencies] = useState<Agency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                setLoading(true);

                const response = await api.get("/api/v1/client/agencies");

                setAgencies(response.data.agencies ?? []);
            }
            catch (error) { setError("Failed to load agencies.") }
            finally { setLoading(false) }
        };

        fetchAgencies();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <AgenciesFilterSearch />

            <div className="max-w-[1600px] mx-auto p-6 lg:p-8">
                {loading ? (
                    <div className="py-20 text-center">
                        <div className="mx-auto w-8 h-8 border-4 border-gray-200 border-t-teal-500 rounded-full animate-spin" />

                        <p className="mt-4 text-gray-500">
                            Loading agencies...
                        </p>
                    </div>
                ) : error ? (
                    <div className="bg-white border border-red-200 rounded-2xl p-12 text-center">
                        <h3 className="text-xl font-bold text-red-600">
                            Failed to load agencies
                        </h3>

                        <p className="mt-2 text-gray-500">
                            {error}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex justify-between items-center">
                                    <h3 className="flex items-center gap-2 text-sm text-gray-500">
                                        <Building2 className="h-4 w-4" />
                                        <span>:</span>
                                        <span>{agencies.length} Agencies Found</span>
                                    </h3>

                            <select className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer">
                                <option>Sort by: Recommended</option>
                                <option>Sort by: Highest Rated</option>
                                <option>Sort by: Most Projects</option>
                            </select>
                        </div>

                        {agencies.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                                <h3 className="text-xl font-bold text-gray-900">
                                    No agencies found
                                </h3>

                                <p className="mt-2 text-gray-500">
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
