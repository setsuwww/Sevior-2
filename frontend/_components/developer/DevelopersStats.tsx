import { Users, UserCheck, UserMinus, Star } from "lucide-react";
import { DeveloperStats } from "../../types/developer";

export function DevelopersStats({ stats }: { stats: DeveloperStats | null }) {
    if (!stats) return null;

    const cards = [
        {
            title: "Total Developers",
            value: stats.totalDevelopers,
            icon: Users,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            title: "Active Developers",
            value: stats.activeDevelopers,
            icon: UserCheck,
            color: "text-teal-600 dark:text-teal-400",
            bg: "bg-teal-50 dark:bg-teal-900/20"
        },
        {
            title: "Inactive Developers",
            value: stats.inactiveDevelopers,
            icon: UserMinus,
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-900/20"
        },
        {
            title: "Average Rating",
            value: stats.averagePerformanceRating.toFixed(1),
            icon: Star,
            color: "text-yellow-600 dark:text-yellow-400",
            bg: "bg-yellow-50 dark:bg-yellow-900/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                    <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${card.bg}`}>
                                <Icon className={`w-6 h-6 ${card.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{card.value}</h3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
