import { Mail, Phone, Calendar, Star, Briefcase, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/_components/ui/avatar";
import { Badge } from "@/_components/ui/badge";
import { DeveloperActionMenu } from "./DeveloperActionMenu";
import { Developer } from "../../types/developer";

export function DeveloperCard({
    developer,
    onEdit,
    onDelete
}: {
    developer: Developer;
    onEdit: (dev: Developer) => void;
    onDelete: (dev: Developer) => void;
}) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            case "Available": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Busy": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    return (
        <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 relative">
            <div className="absolute top-4 right-4">
                <DeveloperActionMenu developer={developer} onEdit={onEdit} onDelete={onDelete} />
            </div>

            <div className="flex items-start gap-4 mb-5">
                <Avatar className="w-16 h-16 border-2 border-white dark:border-gray-800 shadow-sm">
                    <AvatarImage src={developer.avatarUrl} alt={developer.fullName} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 font-bold text-lg">
                        {developer.fullName.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight group-hover:text-teal-600 transition-colors">{developer.fullName}</h3>
                    <p className="text-sm font-medium text-teal-600 dark:text-teal-500 mb-2">{developer.role}</p>
                    <Badge variant="secondary" className={`font-medium ${getStatusColor(developer.status)} border-0`}>
                        {developer.status}
                    </Badge>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 line-clamp-2 min-h-[40px]">
                {developer.bio}
            </p>

            <div className="space-y-2 mb-5">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2.5 shrink-0" />
                    <span className="truncate">{developer.email}</span>
                </div>
                {developer.phone && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4 mr-2.5 shrink-0" />
                        <span>{developer.phone}</span>
                    </div>
                )}
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2.5 shrink-0" />
                    <span>Joined {new Date(developer.joinedDate).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
                {developer.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 font-normal">
                        {skill}
                    </Badge>
                ))}
                {developer.skills.length > 3 && (
                    <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 font-normal">
                        +{developer.skills.length - 3}
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto">
                <div className="text-center">
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <Star className="w-3.5 h-3.5 mr-1 text-yellow-500" />
                        <span className="text-xs font-medium">Rating</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{developer.performanceRating.toFixed(1)}</p>
                </div>
                <div className="text-center border-l border-r border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-blue-500" />
                        <span className="text-xs font-medium">Active</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{developer.currentProjects}</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center text-gray-500 dark:text-gray-400 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-500" />
                        <span className="text-xs font-medium">Done</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">{developer.completedProjects}</p>
                </div>
            </div>
        </div>
    );
}
