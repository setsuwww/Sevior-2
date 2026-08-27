import { getImageUrl } from "@/_lib/helpers/url-image";
import { Agency } from "@/types/agency";

interface AgencyCardProps {
    agency: Agency;
}

export function AgencyCard({ agency }: AgencyCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-olive-200 overflow-hidden">
            <div className="h-40 bg-olive-100">
                {agency.ProfileImage ? (
                    <img
                        src={getImageUrl(agency.ProfileImage) ?? "/default-profile.png"}
                        alt={agency.AgencyName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-olive-400">
                        No Image
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-olive-900">
                    {agency.AgencyName}
                </h3>

                <p className="text-sm text-olive-500 mt-1">
                    {agency.OwnerName}
                </p>

                <p className="text-sm text-olive-500 mt-4">
                    {agency.Description || "No description available."}
                </p>

                <p className="text-sm text-olive-400 mt-4">
                    {agency.Location || "Location not specified"}
                </p>
            </div>
        </div>
    );
}
