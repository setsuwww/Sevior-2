"use client";

import {
    Camera,
    FileText,
    Mail,
    Phone,
    SquarePen,
} from "lucide-react";

import { Badge } from "@/_components/ui/badge";
import { ROLE_COLORS } from "@/_constants/theme/user";
import { PROFILE_THEMES } from "@/_constants/theme/profile";

interface UserProfile {
    FullName: string;
    Role: string;
    Email: string;
    Phone?: string | null;
    Biography?: string | null;
}

interface UserSectionProps {
    profile: UserProfile;
    userImagePreview: string | null;
    onEditProfile: () => void;
    onEditPhoto: () => void;
}

const theme = PROFILE_THEMES[profile.ProfileTheme];

export default function SectionUser({
    profile,
    userImagePreview,
    onEditProfile,
    onEditPhoto,
}: UserSectionProps) {
    return (
        <>
            <div
                className={`relative h-48 bg-gradient-to-r ${theme.banner}`}
            >
                <div className="absolute -bottom-16 left-8">
                    <div className="relative">
                        <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                            {userImagePreview ? (
                                <img
                                    src={userImagePreview}
                                    alt={profile.FullName}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${theme.avatar}`}>
                                    <span className="text-4xl font-bold text-white">
                                        {profile.FullName?.charAt(0) || "A"}
                                    </span>
                                </div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={onEditPhoto}
                            className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-teal-600 p-2 shadow-md transition-colors hover:bg-teal-700"
                        >
                            <Camera className="h-4 w-4 text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* User Content */}
            <div className="px-8 pb-8 pt-20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="flex items-center">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {profile.FullName}
                            </h1>

                            <Badge
                                variant="outline"
                                className={`ml-2 text-xs ${ROLE_COLORS[profile.Role]}`}
                            >
                                {profile.Role}
                            </Badge>
                        </div>

                        <div className="mt-2 flex items-center gap-2 text-gray-600">
                            <Mail className="h-4 w-4" />
                            <span>{profile.Email}</span>
                        </div>

                        {profile.Phone && (
                            <div className="mt-1 flex items-center gap-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{profile.Phone}</span>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onEditProfile}
                        className="flex items-center justify-center gap-2 rounded-sm bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
                    >
                        <SquarePen className="h-4 w-4" />
                        Edit Profile
                    </button>
                </div>

                {profile.Biography && (
                    <div className="mt-6">
                        <div className="mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />

                            <h3 className="font-semibold text-gray-900">
                                Biography
                            </h3>
                        </div>

                        <p className="leading-relaxed text-gray-600">
                            {profile.Biography}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
