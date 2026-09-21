import {
    Folder,
    MailIcon,
    MapPin,
    Phone,
    User,
} from "lucide-react";

import {
    PROFILE_THEMES,
    type ProfileTheme,
} from "@/_constants/theme/profile";
import { getImageUrl } from "@/_lib/helpers/url-image";
import { Agency } from "@/types/agency";
import { Button } from "@/_components/ui/button";
import { getPhoneFormat } from "../../admin/users/developers/logic/adminDeveloperHelpers";

interface AgencyCardProps {
    agency: Agency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
    const profileTheme: ProfileTheme = "slate-teal";
    const theme = PROFILE_THEMES[profileTheme];

    const projectsCompleted = 0;

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
            {/* Banner */}
            <div
                className={`relative h-20 bg-gradient-to-r ${theme.banner}`}
            >
                {/* Avatar */}
                <div className="absolute -bottom-10 left-6">
                    <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-card bg-card shadow-sm">
                        {agency.ProfileImage ? (
                            <img
                                src={
                                    getImageUrl(agency.ProfileImage) ??
                                    "/default-profile.png"
                                }
                                alt={agency.AgencyName}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div
                                className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${theme.avatar}`}
                            >
                                <span className="text-3xl font-bold text-white">
                                    {agency.AgencyName?.charAt(0) || "A"}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-6 pt-14">
                {/* Agency Name */}
                <h3 className="text-xl font-bold text-gray-600">
                    {agency.AgencyName}
                </h3>

                <div className="mt-2 flex flex-col gap-1">
                    <p className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="h-4 w-4" />
                        {getPhoneFormat(agency.Contact)}
                    </p>

                    <p className="flex items-center gap-2 text-sm text-gray-500">
                        <MailIcon className="h-4 w-4" />
                        {agency.Email}
                    </p>
                </div>

                {/* Owner + Location */}
                <div className="mt-2 flex items-center gap-2">
                    <p className="flex items-center gap-1 text-sm text-blue-700">
                        <User className="h-4 w-4" />
                        {agency.OwnerName}
                    </p>

                    <div className="h-1 w-1 rounded-full bg-gray-500" />

                    <div className="flex items-center gap-1 text-sm text-red-700">
                        <MapPin className="h-4 w-4" />
                        <span>
                            {agency.Location || "Location not specified"}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm line-clamp-3 leading-relaxed text-gray-500">
                    {agency.Description || "No description available."}
                </p>

                {/* Stats */}
                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        <Folder className="h-4 w-4 text-gray-600" />

                        <p className="text-xs font-medium text-gray-700">
                            {projectsCompleted} Projects Completed
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                    <Button
                        type="button"
                        variant="outline"
                    >
                        View Agency
                    </Button>

                    <Button
                        type="button"
                    >
                        Request a Project
                    </Button>
                </div>
            </div>
        </div>
    );
}
