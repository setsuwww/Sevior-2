"use client";

import {
    Building2,
    Globe,
    Hash,
    Mail,
    MapPin,
    Phone,
    SquarePen,
} from "lucide-react";

interface Agency {
    AgencyName: string;
    AgencySlug?: string | null;
    Description?: string | null;
    Contact?: string | null;
    Email?: string | null;
    Location?: string | null;
    Website?: string | null;
    ProfileImage?: string | null;
    Status?: string | null;
    SubscriptionPlan?: string | null;
    SubscriptionStatus?: string | null;
}

interface AgencySectionProps {
    agency: Agency;
    agencyImagePreview: string | null;
    onEditAgency: () => void;
    onEditAgencyPhoto: () => void;
}

export default function SectionAgency({
    agency,
    agencyImagePreview,
    onEditAgency,
    onEditAgencyPhoto,
}: AgencySectionProps) {
    return (
        <div className="mt-8 rounded-sm border border-olive-200 bg-olive-50 p-6">
            {/* Agency Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="h-16 w-16 overflow-hidden rounded-full border border-olive-900 bg-slate-800">
                            {agencyImagePreview ? (
                                <img
                                    src={agencyImagePreview}
                                    alt={agency.AgencyName || "Agency"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-slate-800">
                                    <Building2 className="h-7 w-7 text-white" />
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onEditAgencyPhoto}
                            className="absolute -bottom-1 -right-1 rounded-full border-2 border-olive-50 bg-teal-600 p-1.5 shadow-sm transition-colors hover:bg-teal-700"
                        >
                            <SquarePen className="h-3 w-3 text-white" />
                        </button>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-semibold text-olive-900">
                                {agency.AgencyName}
                            </h2>

                            {agency.Status && (
                                <span
                                    className={`rounded-sm px-2 py-1 text-xs font-semibold ${agency.Status === "ACTIVE"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-olive-100 text-olive-700"
                                        }`}
                                >
                                    {agency.Status}
                                </span>
                            )}
                        </div>

                        {agency.AgencySlug && (
                            <div className="mt-1 flex items-center gap-1 text-sm italic text-olive-500">
                                <Hash className="h-3 w-3" />
                                <span>{agency.AgencySlug}</span>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onEditAgency}
                    className="flex items-center gap-2 rounded-sm border border-olive-300 bg-white px-3 py-2 text-sm font-medium text-olive-700 transition-colors hover:bg-olive-100"
                >
                    <SquarePen className="h-4 w-4" />
                    Edit Agency
                </button>
            </div>

            {/* Description */}
            {agency.Description && (
                <p className="mt-5 max-w-xl text-md leading-relaxed text-olive-700">
                    {agency.Description}
                </p>
            )}

            {/* Agency Contact */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {agency.Contact && (
                    <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-olive-500" />

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-olive-400">
                                Agency Phone
                            </p>

                            <p className="mt-1 text-olive-700">
                                {agency.Contact}
                            </p>
                        </div>
                    </div>
                )}

                {agency.Email && (
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-olive-500" />

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-olive-400">
                                Agency Email
                            </p>

                            <p className="mt-1 text-olive-700">
                                {agency.Email}
                            </p>
                        </div>
                    </div>
                )}

                {agency.Location && (
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-olive-500" />

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-olive-400">
                                Location
                            </p>

                            <p className="mt-1 text-olive-700">
                                {agency.Location}
                            </p>
                        </div>
                    </div>
                )}

                {agency.Website && (
                    <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-olive-500" />

                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-wide text-olive-400">
                                Website
                            </p>

                            <a
                                href={agency.Website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block break-all text-teal-600 hover:underline"
                            >
                                {agency.Website}
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {/* Subscription */}
            <div className="mt-6 border-t border-olive-200 pt-5">
                <div className="flex flex-wrap gap-8">
                    <div>
                        <p className="text-xs uppercase tracking-wide text-olive-400">
                            Subscription Plan
                        </p>

                        <p className="mt-1 text-sm font-semibold capitalize text-olive-800">
                            {agency.SubscriptionPlan || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wide text-olive-400">
                            Subscription Status
                        </p>

                        <p className="mt-1 text-sm font-semibold text-olive-800">
                            {agency.SubscriptionStatus || "-"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
