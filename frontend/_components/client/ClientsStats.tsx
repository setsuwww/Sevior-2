import { Building2, Building, FolderKanban, DollarSign } from "lucide-react";
import { ClientStats } from "../../types/client";

export function ClientsStats({ stats }: { stats: ClientStats | null }) {
    if (!stats) return null;

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    const cards = [
        {
            title: "Total Clients",
            value: stats.totalClients,
            icon: Building2,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-900/20"
        },
        {
            title: "Active Clients",
            value: stats.activeClients,
            icon: Building,
            color: "text-teal-600 dark:text-teal-400",
            bg: "bg-teal-50 dark:bg-teal-900/20"
        },
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: FolderKanban,
            color: "text-indigo-600 dark:text-indigo-400",
            bg: "bg-indigo-50 dark:bg-indigo-900/20"
        },
        {
            title: "Total Revenue",
            value: formatCurrency(stats.totalRevenueGenerated),
            icon: DollarSign,
            color: "text-green-600 dark:text-green-400",
            bg: "bg-green-50 dark:bg-green-900/20"
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
